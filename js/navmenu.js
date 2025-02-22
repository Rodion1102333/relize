const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu-container');  // Используем новый id для контейнера

menuToggle.addEventListener('click', function() {
  console.log('Меню переключается');
  navMenu.classList.toggle('show');  // Переключаем класс show на контейнере меню
  console.log('Текущее состояние:', navMenu.classList);  // Выводим текущее состояние
});
