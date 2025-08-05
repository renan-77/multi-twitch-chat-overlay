# 📺 Multi Twitch Chat Overlay

A desktop overlay application for aggregating Twitch chat from multiple channels in real-time. Perfect for streamers, moderators, and viewers who want to monitor multiple streams simultaneously!

## ✨ Features

- **🖥️ Desktop Overlay**: Frameless window perfect for streaming overlays
- **🎨 Purple Twitch Theme**: Consistent purple (#9146ff) branding matching Twitch colors
- **⚙️ Dynamic Configuration**: Setup interface to add/remove Twitch channels (1-5 channels)
- **📌 Always On Top**: Pin the window to stay above other applications
- **📏 Resizable**: Adjust window size to fit your streaming setup
- **🔄 Auto-reconnection**: Automatic reconnection for dropped connections
- **⚡ Real-time Updates**: Instant chat message display via WebSocket
- **🔁 Dynamic Channel Switching**: Change channels without restarting the app
- **← Back Button**: Easy navigation between overlay and setup screens
- **🎮 Multi-platform**: Works on Windows, macOS, and Linux

## 🚀 Quick Installation

### 📥 Easy Install (Recommended)
1. **Download**: Go to the [Releases page](https://github.com/renan-77/multi-twitch-chat-overlay/releases)
2. **Get Latest**: Download the latest `.exe` installer file
3. **Install**: Run the downloaded `.exe` file and follow the installation wizard
4. **Launch**: Find "Multi Twitch Chat Overlay" in your Start Menu or Desktop shortcut

That's it! The app will be ready to use immediately.

---

## 🛠️ Advanced Installation

### Option 1: Download Installer
1. Download the latest installer from [Releases](https://github.com/renan-77/multi-twitch-chat-overlay/releases)
2. Run the installer and follow the setup wizard
3. Launch "Multi Twitch Chat Overlay" from Start Menu or Desktop

### Option 2: Build from Source
1. Install Node.js (18+ recommended)
2. Clone this repository:
   ```bash
   git clone https://github.com/renan-77/multi-twitch-chat-overlay.git
   cd multi-twitch-chat-overlay
   ```
3. Install dependencies and build:
   ```bash
   npm install
   npm run build-win
   ```
4. Find the installer in the `dist` folder

## 📖 Usage

### First Launch - Setup
1. The app opens with a configuration screen
2. Add Twitch channel names manually (without # symbol)
3. Or use quick-add buttons for popular streamers
4. Supports 1-5 channels simultaneously
5. Click "Start Chat Overlay" when ready

### Overlay Controls
- **📌 Pin Button**: Toggle always-on-top mode (uses screen-saver level on Windows)
- **← Back Button**: Return to setup screen to change channels
- **− Minimize**: Minimize to taskbar
- **× Close**: Exit application
- **Drag**: Click and drag the title bar to move window
- **Resize**: Drag corners/edges to resize

### Adding/Removing Channels
- Support for 1-5 Twitch channels simultaneously
- Enter any valid Twitch channel name (e.g., xqc, pokimane, shroud)
- Dynamic channel switching - no need to restart the app
- Channels are saved and restored on app restart
- Real-time connection updates

## ⌨️ Navigation

- **Setup Screen**: Configure channels and start overlay
- **Back Button**: Return from overlay to setup screen
- **Dynamic Updates**: Changes take effect immediately

## ⚙️ Configuration

- Channels automatically saved to localStorage
- App runs on port **3005** (changed from 3002)
- Purple theme (#9146ff) for consistent Twitch branding
- Cross-platform window management

### Default Channels:
- brz_ren
- vavo_tv  
- fuzzyrjtv

## 🛠️ Development

### Running in Development Mode
```bash
npm run electron
```

### Building for Production
```bash
npm run build-win
```

### Project Structure
```
├── electron-main.js      # Main Electron process with integrated server
├── preload.js           # Preload script for security
├── index.js             # Backend server with dynamic channel management
├── overlay-public/      # Frontend files
│   ├── index.html       # Main overlay interface (purple theme)
│   └── setup.html       # Configuration interface (purple theme)
└── assets/              # Application assets
    └── multi-twitch-chat-overlay.png
```

## 🌐 API Endpoints

- `GET /` - Serves the web version of the chat aggregator
- `GET /overlay` - Serves the overlay interface for Electron
- `GET /setup` - Serves the configuration interface
- `POST /api/channels` - Updates channels dynamically
- `GET /health` - Returns connection status and statistics

## 🔧 Technical Details

### Backend
- **Node.js** with Express server (port 3005)
- **tmi.js** for Twitch IRC connection with dynamic channel switching
- **WebSocket** for real-time frontend communication
- **Electron** for desktop application wrapper

### Frontend
- **Vanilla HTML/CSS/JavaScript** for maximum performance
- **Purple Twitch Theme** (#9146ff) consistent throughout
- **WebSocket** client for real-time updates
- **LocalStorage** for configuration persistence
- **Responsive design** optimized for overlay use

## 🐛 Troubleshooting

### Common Issues
1. **App won't start**: Ensure port 3005 is available (changed from 3002)
2. **No chat messages**: Check Twitch channel names are correct (without # symbol)
3. **Pin button not working**: Updated to use 'screen-saver' level on Windows
4. **Connection issues**: App now handles dynamic channel switching without restart

### Support
- Check console output for error messages
- Use the back button to return to setup and change channels
- Dynamic channel updates work without restarting
- Report issues on [GitHub Issues](https://github.com/renan-77/multi-twitch-chat-overlay/issues)

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **🐛 Bug Reports**: Open an issue with detailed steps to reproduce
2. **💡 Feature Requests**: Share your ideas for improvements
3. **🔧 Code Contributions**: 
   - Fork the repository
   - Create a feature branch: `git checkout -b feature/amazing-feature`
   - Commit your changes: `git commit -m 'Add amazing feature'`
   - Push to the branch: `git push origin feature/amazing-feature`
   - Open a Pull Request

### Development Setup
```bash
git clone https://github.com/renan-77/multi-twitch-chat-overlay.git
cd multi-twitch-chat-overlay
npm install
npm run electron  # For development
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for the streaming community
- Twitch purple theme for brand consistency
- Thanks to all streamers and the Twitch community!

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/renan-77/multi-twitch-chat-overlay?style=social)
![GitHub forks](https://img.shields.io/github/forks/renan-77/multi-twitch-chat-overlay?style=social)
![GitHub issues](https://img.shields.io/github/issues/renan-77/multi-twitch-chat-overlay)
![GitHub license](https://img.shields.io/github/license/renan-77/multi-twitch-chat-overlay)
