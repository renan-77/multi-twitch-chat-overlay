const express = require('express');
const WebSocket = require('ws');
const tmi = require('tmi.js');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve overlay version for Electron app
app.use('/overlay', express.static(path.join(__dirname, 'overlay-public')));

// Create HTTP server and WebSocket server
const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });

// Configuration
let TWITCH_CHANNELS = process.env.TWITCH_CHANNELS 
    ? process.env.TWITCH_CHANNELS.split(',').map(ch => ch.trim())
    : ['brz_ren', 'vavo_tv', 'fuzzyrjtv'];

// Store WebSocket connections
const clients = new Set();

// Twitch Chat Setup
let twitchClient = new tmi.Client({
    connection: {
        secure: true,
        reconnect: true
    },
    channels: TWITCH_CHANNELS
});

// Function to update channels dynamically
async function updateChannels(newChannels) {
    if (!newChannels || !Array.isArray(newChannels) || newChannels.length === 0) {
        console.log('Invalid channels provided, keeping current channels');
        return;
    }
    
    // Clean and validate channel names
    const cleanChannels = newChannels
        .map(ch => ch.trim().toLowerCase().replace(/[^a-z0-9_]/g, ''))
        .filter(ch => ch.length > 0)
        .slice(0, 5); // Limit to 5 channels
    
    if (cleanChannels.length === 0) {
        console.log('No valid channels provided');
        return;
    }
    
    console.log(`Updating channels from [${TWITCH_CHANNELS.join(', ')}] to [${cleanChannels.join(', ')}]`);
    
    try {
        // Disconnect from current channels
        if (twitchClient && twitchClient.readyState() === 'OPEN') {
            for (const channel of TWITCH_CHANNELS) {
                try {
                    await twitchClient.part(channel);
                    console.log(`Left channel: ${channel}`);
                } catch (error) {
                    console.log(`Failed to leave channel ${channel}:`, error.message);
                }
            }
        }
        
        // Update the channels list
        TWITCH_CHANNELS = cleanChannels;
        
        // Join new channels
        for (const channel of TWITCH_CHANNELS) {
            try {
                await twitchClient.join(channel);
                console.log(`Joined channel: ${channel}`);
            } catch (error) {
                console.log(`Failed to join channel ${channel}:`, error.message);
            }
        }
        
        console.log(`✅ Successfully updated to channels: ${TWITCH_CHANNELS.map(ch => `#${ch}`).join(', ')}`);
        
    } catch (error) {
        console.error('Error updating channels:', error);
    }
}

// WebSocket server for frontend connections
wss.on('connection', (ws) => {
    console.log('Frontend client connected');
    clients.add(ws);
    
    // Handle messages from frontend
    ws.on('message', async (data) => {
        try {
            const message = JSON.parse(data);
            if (message.type === 'updateChannels' && message.channels) {
                await updateChannels(message.channels);
            }
        } catch (error) {
            console.error('Error handling WebSocket message:', error);
        }
    });
    
    ws.on('close', () => {
        console.log('Frontend client disconnected');
        clients.delete(ws);
    });
});

// Broadcast message to all connected clients
function broadcastMessage(message) {
    const messageData = JSON.stringify(message);
    clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(messageData);
        }
    });
}

twitchClient.connect().then(() => {
    console.log('Connected to Twitch');
}).catch(console.error);

twitchClient.on('message', (channel, tags, message, self) => {
    if (self) return; // Ignore messages from the bot itself
    
    const chatMessage = {
        platform: 'Twitch',
        channel: channel.replace('#', ''),
        username: tags['display-name'] || tags.username,
        message: message,
        timestamp: Date.now()
    };
    
    console.log(`[Twitch] ${chatMessage.channel} - ${chatMessage.username}: ${chatMessage.message}`);
    broadcastMessage(chatMessage);
});

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/overlay', (req, res) => {
    res.sendFile(path.join(__dirname, 'overlay-public', 'index.html'));
});

app.get('/setup', (req, res) => {
    res.sendFile(path.join(__dirname, 'overlay-public', 'setup.html'));
});

// API endpoint to update channels
app.post('/api/channels', express.json(), async (req, res) => {
    try {
        const { channels } = req.body;
        await updateChannels(channels);
        res.json({ 
            success: true, 
            channels: TWITCH_CHANNELS,
            message: 'Channels updated successfully' 
        });
    } catch (error) {
        console.error('API Error updating channels:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        twitch: twitchClient.readyState(),
        channels: TWITCH_CHANNELS,
        clients: clients.size
    });
});

// Start server
server.listen(PORT, () => {
    console.log(`🚀 Multi Twitch Chat Overlay`);
    console.log(`📡 Server running on http://localhost:${PORT}`);
    console.log(`🌐 WebSocket server ready for frontend connections`);
    console.log(`📺 Monitoring Twitch channels: ${TWITCH_CHANNELS.map(ch => `#${ch}`).join(', ')}`);
    console.log(`🔗 Setup: http://localhost:${PORT}/setup`);
    console.log(`🔗 Overlay: http://localhost:${PORT}/overlay`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('Shutting down gracefully...');
    twitchClient.disconnect();
    server.close(() => {
        process.exit(0);
    });
});

// Expose updateChannels function globally for Electron integration
global.updateTwitchChannels = updateChannels;
