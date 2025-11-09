// Petit serveur HTTPS statique pour le développement local
// 1) Générer un certificat auto-signé (voir generate-cert.sh)
// 2) node server-https.js

const https = require('https');
const fs = require('fs');
const path = require('path');

const options = {
  key: fs.readFileSync(path.join(__dirname, 'certs', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'certs', 'cert.pem'))
};

const root = path.resolve(__dirname, '..');

const mime = {
  '.html':'text/html', '.css':'text/css', '.js':'application/javascript', '.json':'application/json', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.ico':'image/x-icon'
};

const server = https.createServer(options, (req, res) => {
  const urlPath = req.url.split('?')[0];
  let filePath = path.join(root, urlPath);
  if(urlPath === '/' || urlPath === '') filePath = path.join(root, 'index.html');

  fs.stat(filePath, (err, stats) => {
    if(err){ res.writeHead(404); res.end('Not found'); return; }
    if(stats.isDirectory()) filePath = path.join(filePath, 'index.html');

    fs.readFile(filePath, (err, data) => {
      if(err){ res.writeHead(500); res.end('Server error'); return; }
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, {'Content-Type': mime[ext] || 'application/octet-stream'});
      res.end(data);
    });
  });
});

const PORT = process.env.PORT || 8443;
server.listen(PORT, () => console.log(`HTTPS server listening on https://localhost:${PORT}`));
