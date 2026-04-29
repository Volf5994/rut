(function() {
  // Находим контейнер счётчика
  var container = document.getElementById('counter');
  
  // Считываем data-атрибуты с значениями по умолчанию
  var initial = container.dataset.initial !== undefined 
    ? parseInt(container.dataset.initial, 10) 
    : 0;
  var min = container.dataset.min !== undefined 
    ? parseInt(container.dataset.min, 10) 
    : -5;
  var max = container.dataset.max !== undefined 
    ? parseInt(container.dataset.max, 10) 
    : 10;
  
  // Текущее значение
  var currentValue = initial;
  
  // Создаём элементы интерфейса
  var span = document.createElement('span');
  span.textContent = currentValue;
  
  var decreaseBtn = document.createElement('button');
  decreaseBtn.className = 'decrease';
  decreaseBtn.textContent = 'Уменьшить';
  
  var resetBtn = document.createElement('button');
  resetBtn.className = 'reset';
  resetBtn.textContent = 'Сбросить';
  
  var increaseBtn = document.createElement('button');
  increaseBtn.className = 'increase';
  increaseBtn.textContent = 'Увеличить';
  
  // Функция обновления UI
  function updateUI() {
    span.textContent = currentValue;
    
    // Управляем состоянием кнопок
    decreaseBtn.disabled = (currentValue <= min);
    increaseBtn.disabled = (currentValue >= max);
  }
  
  // Обработчики событий
  function onDecrease() {
    if (currentValue > min) {
      currentValue--;
      updateUI();
    }
  }
  
  function onIncrease() {
    if (currentValue < max) {
      currentValue++;
      updateUI();
    }
  }
  
  function onReset() {
    currentValue = initial;
    updateUI();
  }
  
  // Добавляем обработчики
  decreaseBtn.addEventListener('click', onDecrease);
  increaseBtn.addEventListener('click', onIncrease);
  resetBtn.addEventListener('click', onReset);
  
  // Очищаем контейнер и добавляем новые элементы
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  
  container.appendChild(span);
  container.appendChild(decreaseBtn);
  container.appendChild(resetBtn);
  container.appendChild(increaseBtn);
  
  // Начальная установка состояния кнопок
  updateUI();
})();