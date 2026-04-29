const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
  let filePath;
  let contentType;

  // Маршрутизация
  if (req.url === '/') {
    filePath = path.join(__dirname, 'index.html');
    contentType = 'text/html';
  } else if (req.url === '/app.js') {
    filePath = path.join(__dirname, 'app.js');
    contentType = 'text/javascript';
  } else if (req.url === '/style.css') {
    filePath = path.join(__dirname, 'style.css');
    contentType = 'text/css';
  } else {
    // 404 для всех остальных путей
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 Not Found</h1>');
    return;
  }

  // Чтение файла асинхронно
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end('<h1>500 Internal Server Error</h1>');
      return;
    }

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});