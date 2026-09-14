# Scramjet Proxy

A fully functioning web proxy powered by Scramjet, built with Node.js for bypassing censorship and accessing restricted content.

## Features

✨ **Core Features:**
- Full web proxy functionality
- CORS bypass capabilities
- Support for multiple protocols (HTTP/HTTPS)
- Beautiful web UI
- REST API for programmatic access
- Session management
- Cookie and header preservation

🌐 **Supported Sites:**
- Google
- YouTube
- Instagram
- ChatGPT
- Reddit
- Twitter/X
- Discord
- Spotify
- GeForce NOW
- now.gg
- And many more...

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup

1. **Clone the repository:**
```bash
git clone https://github.com/immortal9937-stack/scramjet-proxy.git
cd scramjet-proxy
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the proxy server:**
```bash
npm start
```

The proxy will now be running at `http://localhost:3000`

## Usage

### Web Interface

1. Open `http://localhost:3000` in your browser
2. Enter the URL you want to access
3. Click "Go" or press Enter
4. The website will be proxied through Scramjet

### API Usage

**GET Request (with URL parameter):**
```bash
curl "http://localhost:3000/proxy?url=https://example.com"
```

**POST Request (for content):**
```bash
curl -X POST http://localhost:3000/api/proxy -d "https://example.com"
```

**Health Check:**
```bash
curl http://localhost:3000/health
```

## Configuration

You can customize the proxy by setting environment variables:

```bash
PORT=3000 npm start              # Change the port
DEBUG=1 npm start                # Enable debug logging
```

## Development

For development with auto-reload:

```bash
npm run dev
```

This uses Node.js `--watch` flag for automatic restarts on file changes.

## Project Structure

```
scramjet-proxy/
├── server.js              # Main proxy server
├── package.json           # Dependencies and scripts
├── README.md              # This file
└── .gitignore             # Git ignore rules
```

## How It Works

The Scramjet Proxy works by:

1. **Intercepting Requests** - When you enter a URL, it captures the request
2. **Proxying Through** - The request is forwarded through our proxy server
3. **Rewriting Headers** - CORS and other restrictive headers are handled
4. **Streaming Response** - The response is streamed back to your browser
5. **Content Injection** - Scramjet controllers are injected to ensure compatibility

## Supported Features

- ✅ HTTP/HTTPS requests
- ✅ GET, POST, PUT, DELETE methods
- ✅ Form data submission
- ✅ File uploads
- ✅ Cookie preservation
- ✅ Session management
- ✅ WebSocket support (partial)
- ✅ CORS bypass
- ✅ Custom headers

## Security Considerations

⚠️ **Important:** This tool is for educational and authorized use only.

- Use this proxy responsibly and legally
- Respect website terms of service
- Do not use for unauthorized access
- Only access content you have permission to view

## Troubleshooting

### Port Already in Use
```bash
PORT=3001 npm start  # Use a different port
```

### Connection Timeout
- Check your internet connection
- Verify the target website is accessible
- Some sites may block proxy requests

### CORS Issues
- The proxy automatically handles most CORS issues
- For persistent issues, check browser console for specific errors

## Performance Tips

- Keep the server running locally for best performance
- Use HTTPS for secure connections
- Close unused tabs to reduce memory usage
- Clear browser cache periodically

## Dependencies

- **express** - Web framework
- **cors** - CORS middleware
- **http-proxy** - HTTP proxying utilities

## License

MIT License - See LICENSE file for details

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## Support

For issues, questions, or suggestions, please:
1. Check existing issues
2. Create a new issue with detailed information
3. Include error logs and reproduction steps

## Based On

This proxy is built using technologies from the [Scramjet](https://github.com/MercuryWorkshop/scramjet) project by Mercury Workshop.

---

**Happy proxying! 🚀**
