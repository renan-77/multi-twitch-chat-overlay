# Contributing to Sim Racing Chat Overlay

Thank you for your interest in contributing to the Sim Racing Chat Overlay! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm (comes with Node.js)
- Git

### Development Setup
1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/sim-racing-chat-overlay.git
   cd sim-racing-chat-overlay
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development environment:
   ```bash
   npm run electron
   ```

## 🔄 Development Workflow

### Project Structure
```
sim-racing-chat-overlay/
├── index.js                 # Backend server (Express + WebSocket)
├── electron-main.js         # Electron main process
├── preload.js              # Electron preload script
├── package.json            # Main package configuration
├── package-electron.json   # Electron-specific build config
├── overlay-public/         # Overlay interface files
│   ├── index.html          # Main overlay UI
│   └── setup.html          # Configuration UI
└── public/                 # Web version (optional)
    └── index.html
```

### Making Changes

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the code style:
   - Use consistent indentation (2 spaces)
   - Add comments for complex logic
   - Follow existing naming conventions

3. **Test your changes**:
   ```bash
   npm run electron  # Test in development
   npm run build-win # Test full build (Windows)
   ```

4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add amazing new feature"
   ```

5. **Push and create a Pull Request**:
   ```bash
   git push origin feature/your-feature-name
   ```

## 🐛 Bug Reports

When reporting bugs, please include:
- **OS version** (Windows 10/11, etc.)
- **App version** 
- **Steps to reproduce** the issue
- **Expected behavior**
- **Actual behavior**
- **Screenshots** if applicable
- **Console output** (if available)

## 💡 Feature Requests

For new features, please:
- Check if it already exists in issues
- Describe the use case clearly
- Explain why it would be valuable
- Consider implementation complexity

## 🎨 UI/UX Guidelines

- **VR-Friendly**: Ensure high contrast and readable fonts for VR racing
- **Overlay-Optimized**: Keep UI minimal and non-intrusive
- **Racing Theme**: Maintain the racing car aesthetic
- **Performance**: Optimize for real-time chat display

## 🔧 Technical Guidelines

### Code Style
- Use modern JavaScript (ES6+)
- Prefer async/await over callbacks
- Add error handling for network operations
- Keep functions focused and small

### Architecture Decisions
- **Backend**: Express.js for simplicity and reliability
- **Real-time**: WebSocket for chat message delivery
- **Desktop**: Electron for cross-platform support
- **Frontend**: Vanilla JS for performance

### Testing
- Test with multiple Twitch channels
- Verify overlay behavior in different window sizes
- Check always-on-top functionality
- Ensure graceful handling of network issues

## 🎯 Areas for Contribution

### High Priority
- **Platform Support**: Add support for YouTube, Discord, etc.
- **Customization**: Theme options, font sizes, colors
- **Performance**: Optimize memory usage and message handling
- **Accessibility**: Screen reader support, keyboard navigation

### Medium Priority
- **Features**: Message filtering, user highlighting
- **UI/UX**: Better animations, improved setup flow
- **Documentation**: Video tutorials, troubleshooting guides

### Low Priority
- **Advanced Features**: Plugin system, custom commands
- **Integrations**: OBS integration, stream deck support

## 📝 Commit Message Format

Use conventional commits:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Example: `feat: add YouTube chat support`

## 🔍 Code Review Process

1. All changes require a Pull Request
2. Maintainers will review for:
   - Code quality and style
   - Performance impact
   - User experience
   - Documentation updates
3. Address review feedback promptly
4. Once approved, changes will be merged

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙋‍♀️ Questions?

Feel free to open an issue for questions or join discussions in existing issues. We're here to help!

## 🙏 Recognition

All contributors will be recognized in the project. Thank you for making the sim racing community better! 🏁
