/**
 * Welrent SSO — Local Test Server
 * Serves the login test page at http://localhost:3000/login
 * 
 * Run with: node sso-test-server.js
 */
const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT = 3000;
const ROOT = __dirname;

const MIME = {
    '.html': 'text/html; charset=utf-8',
    '.js':   'application/javascript',
    '.css':  'text/css',
    '.png':  'image/png',
    '.jpg':  'image/jpeg',
    '.svg':  'image/svg+xml',
};

const server = http.createServer((req, res) => {
    const urlPath = req.url.split('?')[0].split('#')[0];

    // Route /login → local-test-login.html
    let file = (urlPath === '/login' || urlPath === '/login/' || urlPath === '/')
        ? 'local-test-login.html'
        : urlPath.replace(/^\//, '');

    const filePath = path.join(ROOT, file);

    // Security: prevent directory traversal
    if (!filePath.startsWith(ROOT)) {
        res.writeHead(403); res.end('Forbidden'); return;
    }

    if (!fs.existsSync(filePath)) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found: ' + urlPath);
        return;
    }

    const ext      = path.extname(filePath).toLowerCase();
    const mimeType = MIME[ext] || 'text/plain';

    res.writeHead(200, {
        'Content-Type':                mimeType,
        'Access-Control-Allow-Origin': '*',
        'Cache-Control':               'no-cache',
    });

    fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, '0.0.0.0', () => {
    console.log('');
    console.log('  ╔═══════════════════════════════════════╗');
    console.log('  ║  Welrent SSO Test Server — Running    ║');
    console.log('  ╚═══════════════════════════════════════╝');
    console.log('');
    console.log('  Login page : http://localhost:' + PORT + '/login');
    console.log('');
    console.log('  Press Ctrl+C to stop.');
});
