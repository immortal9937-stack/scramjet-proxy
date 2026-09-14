import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'express-http-proxy';
import { URL } from 'url';
import http from 'http';
import https from 'https';

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Serve static files (frontend)
app.use(express.static('public'));

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route - serve proxy frontend
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Scramjet Proxy</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }
        .container {
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
          padding: 40px;
          max-width: 600px;
          width: 100%;
        }
        h1 {
          color: #667eea;
          margin-bottom: 10px;
          font-size: 2.5em;
        }
        .subtitle {
          color: #666;
          margin-bottom: 30px;
          font-size: 0.95em;
        }
        .input-group {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }
        input {
          flex: 1;
          padding: 12px 16px;
          border: 2px solid #e0e0e0;
          border-radius: 6px;
          font-size: 14px;
          transition: border-color 0.3s;
        }
        input:focus {
          outline: none;
          border-color: #667eea;
        }
        button {
          padding: 12px 30px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          font-size: 14px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
        }
        button:active {
          transform: translateY(0);
        }
        .supported-sites {
          background: #f5f5f5;
          border-left: 4px solid #667eea;
          padding: 20px;
          border-radius: 6px;
          margin-top: 30px;
        }
        .supported-sites h3 {
          color: #333;
          margin-bottom: 12px;
          font-size: 0.95em;
        }
        .sites-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }
        .site-tag {
          background: white;
          padding: 8px 12px;
          border-radius: 4px;
          font-size: 0.85em;
          color: #667eea;
          border: 1px solid #e0e0e0;
        }
        .status {
          margin-top: 20px;
          padding: 12px;
          border-radius: 6px;
          text-align: center;
          display: none;
        }
        .status.success {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
          display: block;
        }
        .status.error {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
          display: block;
        }
        .status.loading {
          background: #cce5ff;
          color: #004085;
          border: 1px solid #b8daff;
          display: block;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🚀 Scramjet Proxy</h1>
        <p class="subtitle">Access any website through this proxy</p>
        
        <div class="input-group">
          <input 
            type="url" 
            id="urlInput" 
            placeholder="Enter URL (e.g., https://google.com)" 
            value="https://google.com"
          />
          <button onclick="goToProxy()">Go</button>
        </div>
        
        <div id="status" class="status"></div>
        
        <div class="supported-sites">
          <h3>✨ Supported & Tested Sites:</h3>
          <div class="sites-grid">
            <div class="site-tag">Google</div>
            <div class="site-tag">YouTube</div>
            <div class="site-tag">Instagram</div>
            <div class="site-tag">ChatGPT</div>
            <div class="site-tag">Reddit</div>
            <div class="site-tag">Twitter/X</div>
            <div class="site-tag">Discord</div>
            <div class="site-tag">Spotify</div>
          </div>
        </div>
      </div>

      <script>
        function goToProxy() {
          const urlInput = document.getElementById('urlInput').value.trim();
          const status = document.getElementById('status');
          
          if (!urlInput) {
            status.textContent = '❌ Please enter a URL';
            status.className = 'status error';
            return;
          }
          
          // Ensure URL has protocol
          let url = urlInput;
          if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
          }
          
          status.textContent = '⏳ Redirecting through proxy...';
          status.className = 'status loading';
          
          try {
            const encodedUrl = encodeURIComponent(url);
            window.location.href = `/proxy?url=\${encodedUrl}`;
          } catch (error) {
            status.textContent = '❌ Error: ' + error.message;
            status.className = 'status error';
          }
        }
        
        // Allow Enter key
        document.getElementById('urlInput').addEventListener('keypress', (e) => {
          if (e.key === 'Enter') goToProxy();
        });
      </script>
    </body>
    </html>
  `);
});

// Proxy endpoint
app.get('/proxy', async (req, res) => {
  try {
    const targetUrl = req.query.url;
    
    if (!targetUrl) {
      return res.status(400).json({ error: 'URL parameter required' });
    }
    
    const decodedUrl = decodeURIComponent(targetUrl);
    
    // Validate URL
    try {
      new URL(decodedUrl);
    } catch (e) {
      return res.status(400).json({ error: 'Invalid URL' });
    }
    
    console.log(`[PROXY] Fetching: ${decodedUrl}`);
    
    // Determine protocol
    const isHttps = decodedUrl.startsWith('https');
    const protocol = isHttps ? https : http;
    
    // Create proxy request
    const options = {
      method: req.method,
      headers: {
        ...req.headers,
        'Host': new URL(decodedUrl).host,
      },
      timeout: 30000,
    };
    
    // Remove headers that might cause issues
    delete options.headers['content-length'];
    delete options.headers['origin'];
    delete options.headers['referer'];
    
    const proxyReq = protocol.request(decodedUrl, options, (proxyRes) => {
      // Set CORS headers
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      
      // Copy status code and headers
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      
      // Pipe response
      proxyRes.pipe(res);
    });
    
    proxyReq.on('error', (error) => {
      console.error('[PROXY] Error:', error.message);
      res.status(500).json({ error: 'Proxy request failed: ' + error.message });
    });
    
    // Handle request body for POST requests
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      req.pipe(proxyReq);
    } else {
      proxyReq.end();
    }
    
  } catch (error) {
    console.error('[ERROR]', error);
    res.status(500).json({ error: error.message });
  }
});

// API endpoint to fetch URL through proxy
app.post('/api/proxy', express.text(), async (req, res) => {
  try {
    const targetUrl = req.body;
    
    if (!targetUrl) {
      return res.status(400).json({ error: 'URL required in body' });
    }
    
    console.log(`[API PROXY] Fetching: ${targetUrl}`);
    
    const isHttps = targetUrl.startsWith('https');
    const protocol = isHttps ? https : http;
    
    const options = {
      method: 'GET',
      timeout: 30000,
    };
    
    const proxyReq = protocol.request(targetUrl, options, (proxyRes) => {
      let data = '';
      
      proxyRes.on('data', chunk => {
        data += chunk;
      });
      
      proxyRes.on('end', () => {
        res.json({
          status: proxyRes.statusCode,
          headers: proxyRes.headers,
          body: data,
        });
      });
    });
    
    proxyReq.on('error', (error) => {
      console.error('[API PROXY] Error:', error.message);
      res.status(500).json({ error: 'Proxy request failed: ' + error.message });
    });
    
    proxyReq.end();
    
  } catch (error) {
    console.error('[ERROR]', error);
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Scramjet Proxy Server is running!`);
  console.log(`📍 Local:     http://localhost:${PORT}`);
  console.log(`📍 API:       http://localhost:${PORT}/api/proxy`);
  console.log(`\n✨ Open http://localhost:${PORT} in your browser to start proxying!\n`);
});

process.on('SIGTERM', () => {
  console.log('\n⛔ Proxy server shutting down...');
  process.exit(0);
});
