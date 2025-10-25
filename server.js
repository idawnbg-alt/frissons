import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function getLocalIPAddress() {
  const nets = os.networkInterfaces();
  
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return 'localhost';
}

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // Routing
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html';
  }
  if (filePath === './control') {
    filePath = './control.html';
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - Page non trouvée</h1>', 'utf-8');
      } else {
        res.writeHead(500);
        res.end('Erreur serveur: ' + error.code, 'utf-8');
      }
    } else {
      res.writeHead(200, { 'Content-Type': mimeType });
      res.end(content, 'utf-8');
    }
  });
});

const localIP = getLocalIPAddress();

server.listen(PORT, '0.0.0.0', () => {
  console.log('\n🚀 ========================================');
  console.log('   Serveur Générateur Coquin démarré !');
  console.log('========================================\n');
  console.log('📱 Sur cet appareil :');
  console.log(`   → http://localhost:${PORT}`);
  console.log(`   → http://localhost:${PORT}/control\n`);
  console.log('📱 Sur un autre appareil (même WiFi) :');
  console.log(`   → http://${localIP}:${PORT}`);
  console.log(`   → http://${localIP}:${PORT}/control\n`);
  console.log('🛑 Pour arrêter : Ctrl+C\n');
});
