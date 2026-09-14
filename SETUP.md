# Quick Setup Guide

## Installation Steps

### 1. Prerequisites
Make sure you have Node.js installed:
```bash
node --version  # Should be v16+
npm --version
```

### 2. Install Dependencies
```bash
npm install
```

This will install:
- `express` - Web framework
- `cors` - CORS support
- `http-proxy` - HTTP proxying
- Other supporting libraries

### 3. Start the Server
```bash
npm start
```

You should see:
```
🚀 Scramjet Proxy Server is running!
📍 Local:     http://localhost:3000
📍 API:       http://localhost:3000/api/proxy

✨ Open http://localhost:3000 in your browser to start proxying!
```

### 4. Using the Proxy

**Via Web UI:**
- Go to `http://localhost:3000`
- Enter any URL (e.g., `https://google.com`)
- Click "Go"

**Via cURL:**
```bash
curl "http://localhost:3000/proxy?url=https://google.com"
```

**Via API (POST):**
```bash
curl -X POST http://localhost:3000/api/proxy -d "https://google.com"
```

## Development Mode

For auto-reload on file changes:
```bash
npm run dev
```

## Customization

### Change Port
```bash
PORT=8080 npm start
```

### Enable Debugging
```bash
DEBUG=1 npm start
```

## Troubleshooting

**Q: Port 3000 is already in use**
```bash
PORT=3001 npm start
```

**Q: Module not found errors**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Q: Connection refused**
- Make sure the server is running
- Check firewall settings
- Verify the correct port

## Next Steps

1. ✅ Customize the proxy for your needs
2. ✅ Add authentication if needed
3. ✅ Deploy to a cloud service
4. ✅ Configure for production use

## Example Deployments

### Heroku
```bash
heroku create your-proxy-app
git push heroku main
```

### Railway
```bash
railway up
```

### DigitalOcean App Platform
- Connect GitHub repository
- Deploy automatically

---

You're all set! Enjoy your Scramjet Proxy! 🚀
