const { app, BrowserWindow, ipcMain, Menu, shell } = require('electron');
const path = require('path');

// Import server functionality directly
let serverApp;

async function startIntegratedServer() {
    try {
        // Set environment variables
        process.env.PORT = '3002';
        process.env.TWITCH_CHANNELS = configuredChannels.length > 0 ? configuredChannels.join(',') : 'brz_ren,vavo_tv,fuzzyrjtv';
        
        // Require and start the server in the same process
        const serverModule = require('./index.js');
        console.log('✅ Integrated server started successfully');
    } catch (error) {
        console.error('❌ Failed to start integrated server:', error);
    }
}

// Keep a global reference of the window object
let mainWindow;
let isAlwaysOnTop = false;
let configuredChannels = [];

function createWindow() {
    // Create the browser window with overlay-style properties
    mainWindow = new BrowserWindow({
        width: 450,
        height: 400, // Reduced default height
        minWidth: 350,
        minHeight: 250, // Much smaller minimum height for better vertical resizing
        maxHeight: 800, // Set reasonable maximum
        frame: false, // Remove window frame for overlay look
        transparent: false,
        resizable: true,
        alwaysOnTop: false,
        skipTaskbar: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        },
        icon: path.join(__dirname, 'assets', 'icon.png'), // Add icon if available
        titleBarStyle: 'hidden',
        show: false // Don't show until ready
    });

    // Start the integrated server
    startIntegratedServer().then(() => {
        // Load the setup page with retry logic
        let retryCount = 0;
        const maxRetries = 10;
        
        function tryLoadSetup() {
            mainWindow.loadURL('http://localhost:3002/setup').catch((error) => {
                console.log(`Failed to load setup page (attempt ${retryCount + 1}):`, error.message);
                retryCount++;
                if (retryCount < maxRetries) {
                    setTimeout(tryLoadSetup, 1000);
                } else {
                    console.error('Failed to start server after maximum retries');
                    // Load a local error page or show error dialog
                    mainWindow.loadFile(path.join(__dirname, 'overlay-public', 'setup.html'));
                }
            });
        }
        
        setTimeout(tryLoadSetup, 1000);
    });

    // Show window when ready
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        
        // Focus the window
        if (process.platform === 'darwin') {
            app.dock.show();
        }
        mainWindow.focus();
    });

    // Handle window closed
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // Handle window minimize/restore for overlay behavior
    mainWindow.on('minimize', () => {
        if (process.platform === 'darwin') {
            app.dock.hide();
        }
    });

    mainWindow.on('restore', () => {
        if (process.platform === 'darwin') {
            app.dock.show();
        }
    });
}

// IPC handlers for overlay controls
ipcMain.handle('toggle-always-on-top', () => {
    if (mainWindow) {
        isAlwaysOnTop = !isAlwaysOnTop;
        
        // Set always on top with explicit level parameter for Windows
        if (process.platform === 'win32') {
            mainWindow.setAlwaysOnTop(isAlwaysOnTop, 'screen-saver');
        } else {
            mainWindow.setAlwaysOnTop(isAlwaysOnTop);
        }
        
        // Ensure window is visible and focused when pinning
        if (isAlwaysOnTop) {
            if (mainWindow.isMinimized()) {
                mainWindow.restore();
            }
            mainWindow.show();
            mainWindow.focus();
        }
        
        console.log(`Always on top: ${isAlwaysOnTop} (level: ${isAlwaysOnTop ? 'floating' : 'normal'})`);
        return isAlwaysOnTop;
    }
    return false;
});

ipcMain.handle('minimize-window', () => {
    if (mainWindow) {
        mainWindow.minimize();
    }
});

ipcMain.handle('close-window', () => {
    if (mainWindow) {
        mainWindow.close();
    }
});

ipcMain.handle('restore-window', () => {
    if (mainWindow) {
        if (mainWindow.isMinimized()) {
            mainWindow.restore();
        }
        mainWindow.show();
        mainWindow.focus();
    }
});

ipcMain.handle('get-always-on-top-status', () => {
    return isAlwaysOnTop;
});

ipcMain.handle('start-with-channels', async (event, channels) => {
    if (channels && channels.length > 0) {
        configuredChannels = channels;
        
        // Update environment variables for new channels
        process.env.TWITCH_CHANNELS = channels.join(',');
        
        // Wait for server to start and then load the overlay
        setTimeout(() => {
            if (mainWindow) {
                // Resize window for overlay mode - more vertical-friendly
                mainWindow.setSize(400, 350);
                mainWindow.setMinimumSize(300, 200);
                mainWindow.loadURL('http://localhost:3002/overlay');
            }
        }, 2000);
        
        return true;
    }
    return false;
});

ipcMain.handle('get-channels', () => {
    return configuredChannels;
});

// App event handlers
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

app.on('before-quit', () => {
    // Server will be automatically closed when app quits
});

// Security: Prevent new window creation
app.on('web-contents-created', (event, contents) => {
    contents.on('new-window', (event, navigationUrl) => {
        event.preventDefault();
        shell.openExternal(navigationUrl);
    });
});

// Remove default menu in production
if (process.env.NODE_ENV === 'production') {
    Menu.setApplicationMenu(null);
}
