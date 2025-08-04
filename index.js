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
const TWITCH_CHANNELS = process.env.TWITCH_CHANNELS 
    ? process.env.TWITCH_CHANNELS.split(',').map(ch => ch.trim())
    : ['brz_ren', 'vavo_tv', 'fuzzyrjtv'];

// Store WebSocket connections
const clients = new Set();

// WebSocket server for frontend connections
wss.on('connection', (ws) => {
    console.log('Frontend client connected');
    clients.add(ws);
    
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

// Twitch Chat Setup
const twitchClient = new tmi.Client({
    connection: {
        secure: true,
        reconnect: true
    },
    channels: TWITCH_CHANNELS
});

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
    console.log(`🚀 Sim Racing Chat Aggregator`);
    console.log(`📡 Server running on http://localhost:${PORT}`);
    console.log(`🌐 WebSocket server ready for frontend connections`);
    console.log(`📺 Monitoring Twitch channels: ${TWITCH_CHANNELS.join(', ')}`);
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
