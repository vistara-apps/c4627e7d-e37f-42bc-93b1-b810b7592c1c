# LinkGuard - Base MiniApp

LinkGuard is a Base MiniApp that scans pasted links for phishing and scam patterns, providing real-time alerts and educational insights.

## Features

- **Real-time Link Scanner**: Instantly scan URLs against known threat databases
- **AI-Powered Threat Detection**: Advanced AI analysis for novel scam detection
- **In-Frame Alerts**: Clear, educational alerts with explanations
- **Scam Reporting**: Community-driven threat intelligence
- **Mobile-First Design**: Optimized for Base App experience

## Getting Started

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd linkguard-miniapp
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your API keys:
   - `NEXT_PUBLIC_MINIKIT_API_KEY`: Your MiniKit API key
   - `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Your OnchainKit API key
   - `OPENAI_API_KEY`: Your OpenAI API key (for AI threat detection)

3. **Development**
   ```bash
   npm run dev
   ```

4. **Build**
   ```bash
   npm run build
   npm start
   ```

## Farcaster Frames

LinkGuard includes full Farcaster Frame support for seamless integration within the Base ecosystem:

### Frame Endpoints
- **Main Frame**: `/api/frame` - Initial frame with scan options
- **Actions**: `/api/frame/actions` - Handle button interactions
- **Scan**: `/api/frame/scan` - Process link scanning
- **Report**: `/api/frame/report` - Handle scam reporting
- **Images**: `/api/frame/image/*` - Dynamic SVG images for frames

### Frame Features
- **Interactive Scanning**: Users can scan links directly within frames
- **Real-time Results**: Instant visual feedback with threat analysis
- **User Limits**: Free tier (5 scans/day) with premium upgrade options
- **Community Reporting**: Report suspicious links to improve threat intelligence

### Testing Frames
1. Visit `/frame` in your application for development testing
2. Use Farcaster Frame validator tools to test frame functionality
3. Deploy to production and test within Farcaster clients

## Architecture

### Core Components

- **AppShell**: Main application container and state management
- **LinkInput**: URL input form with paste functionality
- **ResultCard**: Displays scan results with threat analysis
- **ActionButton**: Reusable button component with variants

### API Integration

- **Phishing Database**: Checks URLs against known malicious domains
- **AI Threat Detection**: Analyzes URL patterns for sophisticated threats
- **MiniKit Integration**: Base App social features and wallet integration

### Data Models

- **User**: Tracks scan usage and premium status
- **ScannedLink**: Stores scan results and threat information
- **ThreatSignature**: Maintains threat pattern database

## Business Model

- **Free Tier**: 5 scans per day
- **Premium**: $0.01 per scan or $5/month unlimited
- **Features**: Advanced AI analysis, priority scanning, detailed reports

## Security Features

- Real-time threat detection
- Community reporting system
- Educational threat explanations
- Safe link verification
- Suspicious pattern recognition

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
