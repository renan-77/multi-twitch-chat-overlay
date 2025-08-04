# 📺 Multi Twitch Chat Overlay

A desktop overlay application for aggregating Twitch chat from multiple channels in real-time. Perfect for streamers, moderators, and viewers who want to monitor multiple streams simultaneously!

## ✨ Features

- **🖥️ Desktop Overlay**: Frameless window perfect for streaming overlays and VR racing
- **🎨 VR-Optimized**: Vibrant channel colors for easy identification in VR environments
- **⚙️ Dynamic Configuration**: Setup interface to add/remove Twitch channels (up to 5)
- **📌 Always On Top**: Pin the window to stay above other applications
- **📏 Resizable**: Adjust window size to fit your streaming setup
- **🔄 Auto-reconnection**: Automatic reconnection for dropped connections
- **⚡ Real-time Updates**: Instant chat message display via WebSocket
- **🏁 Popular Streamers**: Quick-add buttons for popular sim racing channels
- **🎮 Racing Theme**: Purple racing car icon and racing-focused design

## 🚀 Installation

### Option 1: Download Installer (Recommended)
1. Download the latest installer from [Releases](https://github.com/yourusername/sim-racing-chat-overlay/releases)
2. Run the installer and follow the setup wizard
3. Launch "Sim Racing Chat Overlay" from Start Menu or Desktop

### Option 2: Build from Source
1. Install Node.js (18+ recommended)
2. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/sim-racing-chat-overlay.git
   cd sim-racing-chat-overlay
   ```
3. Install dependencies and build:
   ```bash
   npm install
   npm run build-win
   ```
4. Find the installer in the `dist` folder

## Usage

### First Launch - Setup
1. The app opens with a configuration screen
2. Add Twitch channel names (without # symbol)
3. Use quick-add buttons for popular sim racing streamers
4. Click "Start Chat Overlay" when ready

### Overlay Controls
- **📌 Pin Button**: Toggle always-on-top mode
- **− Minimize**: Minimize to taskbar
- **× Close**: Exit application
- **Drag**: Click and drag the title bar to move window
- **Resize**: Drag corners/edges to resize

### Adding/Removing Channels
- Support for up to 5 Twitch channels simultaneously
- Channels are saved and restored on app restart
- Real-time connection status display

## Keyboard Shortcuts

- **Drag Title Bar**: Move window
- **Resize Handles**: Resize window dimensions

## Configuration

Channels are automatically saved to local storage and restored on app restart.

### Popular Sim Racing Streamers Included:
- brz_ren
- vavo_tv  
- fuzzyrjtv
- jarnooooo
- nickthew

## Development

### Running in Development Mode
```bash
npm run electron-dev
```

### Building for Production
```bash
npm run build-win
```

### File Structure
```
├── electron-main.js      # Main Electron process
├── preload.js           # Preload script for security
├── index.js             # Backend server
├── overlay-public/      # Frontend files
│   ├── index.html       # Main overlay interface
│   └── setup.html       # Configuration interface
└── assets/              # Application assets
```

## API Endpoints

- `GET /` - Serves the web version of the chat aggregator
- `GET /overlay` - Serves the overlay interface for Electron
- `GET /setup` - Serves the configuration interface
- `GET /health` - Returns connection status and statistics

## Technical Details

### Backend
- **Node.js** with Express server
- **tmi.js** for Twitch IRC connection  
- **WebSocket** for real-time frontend communication
- **Electron** for desktop application wrapper

### Frontend
- **Vanilla HTML/CSS/JavaScript** for maximum performance
- **WebSocket** client for real-time updates
- **LocalStorage** for configuration persistence
- **Responsive design** optimized for overlay use

## Troubleshooting

### Common Issues
1. **App won't start**: Ensure port 3002 is available
2. **No chat messages**: Check Twitch channel names are correct
3. **Window not staying on top**: Use the pin button (📌)
4. **Connection issues**: Check internet connection and restart app

### Support
- Check console output for error messages
- Restart the application if connections seem stuck
- Report issues on [GitHub Issues](https://github.com/yourusername/sim-racing-chat-overlay/issues)

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
git clone https://github.com/yourusername/sim-racing-chat-overlay.git
cd sim-racing-chat-overlay
npm install
npm run electron  # For development
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for the sim racing community
- Inspired by the need for better chat aggregation during VR racing
- Thanks to all streamers who make the sim racing community amazing!

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/yourusername/sim-racing-chat-overlay?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/sim-racing-chat-overlay?style=social)
![GitHub issues](https://img.shields.io/github/issues/yourusername/sim-racing-chat-overlay)
![GitHub license](https://img.shields.io/github/license/yourusername/sim-racing-chat-overlay)
- Verify channel names don't include the # symbol

## License

MIT
