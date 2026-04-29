const http = require('http');
const path = require('path');

// Фиксированный массив задач
const tasks = [
  { id: 1, title: 'Выучить JavaScript', completed: false },
  { id: 2, title: 'Создать Todo-приложение', completed: true },
  { id: 3, title: 'Настроить сервер', completed: false }
];

const PORT = 3000;

// Функция для рендеринга главной страницы со списком задач
function renderHomePage() {
  const listItems = tasks.map(task => {
    const completedClass = task.completed ? ' class="completed"' : '';
    return `<li${completedClass}>${escapeHtml(task.title)}</li>`;
  }).join('');

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Задачи</title>
  <style>
    .completed { text-decoration: line-through; color: #999; }
  </style>
</head>
<body>
  <h1>Мои задачи</h1>
  <ul>
    ${listItems}
  </ul>
  <script></script>
</body>
</html>`;
}

// Функция для рендеринга страницы конкретной задачи
function renderTaskPage(task) {
  const statusText = task.completed ? 'Выполнена' : 'Не выполнена';
  
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Задача #${task.id}</title>
</head>
<body>
  <h1>Задача #${task.id}</h1>
  <p><strong>Название:</strong> <span>${escapeHtml(task.title)}</span></p>
  <p><strong>Статус:</strong> <span>${statusText}</span></p>
  <p><a href="/">← Назад</a></p>
</body>
</html>`;
}

// Функция для рендеринга страницы 404
function render404Page(message = 'Страница не найдена') {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>404</title>
</head>
<body>
  <h1>404</h1>
  <p>${escapeHtml(message)}</p>
</body>
</html>`;
}

// Простейшая защита от XSS
function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const server = http.createServer((req, res) => {
  // Убираем query-параметры, если они есть
  const url = req.url.split('?')[0];
  
  // Обработка корневого маршрута
  if (req.method === 'GET' && url === '/') {
    const html = renderHomePage();
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
    return;
  }
  
  // Обработка динамического маршрута /task/:id
  if (req.method === 'GET' && url.startsWith('/task/')) {
    // Извлекаем часть после '/task/'
    const idPart = url.substring('/task/'.length);
    
    // Если idPart пустой (например, '/task/'), то это 404
    if (idPart === '') {
      const html = render404Page('Задача с таким ID не найдена.');
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(html);
      return;
    }
    
    // Пытаемся преобразовать в целое число
    const id = parseInt(idPart, 10);
    
    // Проверяем, является ли строка корректным числом и совпадает ли с исходной строкой без ведущих нулей (кроме 0)
    // Это гарантирует, что '/task/1abc' или '/task/01' не пройдут проверку
    if (isNaN(id) || id.toString() !== idPart) {
      const html = render404Page('Задача с таким ID не найдена.');
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(html);
      return;
    }
    
    // Ищем задачу в массиве
    const task = tasks.find(t => t.id === id);
    
    if (!task) {
      // Задача с таким ID не найдена
      const html = render404Page('Задача с таким ID не найдена.');
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(html);
      return;
    }
    
    // Отдаем страницу задачи
    const html = renderTaskPage(task);
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
    return;
  }
  
  // Все остальные пути — 404
  const html = render404Page('Страница не найдена');
  res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
});

server.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});