const http = require('node:http');
const { addItem, listItems, markFound } = require('./items');

const PORT = Number(process.env.PORT) || 3000;

function send(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(body));
}

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/health') return send(res, 200, { status: 'ok' });
  if (req.method === 'GET' && req.url === '/items') return send(res, 200, listItems());
  if (req.method === 'POST' && req.url === '/items') {
    let raw = '';
    req.on('data', (chunk) => { raw += chunk; });
    req.on('end', () => {
      try {
        send(res, 201, addItem(JSON.parse(raw || '{}')));
      } catch (err) {
        send(res, 400, { error: err.message });
      }
    });
    return;
  }
  const found = req.url.match(/^\/items\/(\d+)\/found$/);
  if (req.method === 'POST' && found) {
    const item = markFound(found[1]);
    return item ? send(res, 200, item) : send(res, 404, { error: 'item not found' });
  }
  send(res, 404, { error: 'not found' });
});

server.listen(PORT, () => console.log(`Lost and Found running on http://localhost:${PORT}`));
