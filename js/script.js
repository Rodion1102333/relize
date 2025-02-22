document.addEventListener("DOMContentLoaded", () => {
  const letters = document.querySelectorAll(".neon-text span");
  const preloader = document.getElementById("preloader");
  const mainContent = document.getElementById("main-content");
  const textElement = document.querySelector(".header-title h1");

  let delay = 0;

  // Анимация свечения букв
  letters.forEach((letter) => {
    setTimeout(() => {
      letter.classList.add("active");
    }, delay);
    delay += 300;
  });

  // Плавное исчезновение прелоадера
  setTimeout(() => {
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.style.display = "none";
      mainContent.style.opacity = "1";
      mainContent.style.visibility = "visible";
      document.body.style.overflow = "auto";
    }, 1000);
  }, delay + 1000);

  // Добавляем анимацию фона
  const bgAnimation = document.createElement('div');
  bgAnimation.classList.add('bg-animation');
  document.body.appendChild(bgAnimation);

  for (let i = 0; i < 5; i++) {
    const circle = document.createElement('div');
    circle.classList.add('circle');
    circle.style.width = `${Math.random() * 100 + 200}px`;
    circle.style.height = circle.style.width;
    circle.style.top = `${Math.random() * 100 + 20}%`;
    circle.style.left = `${Math.random() * 100 + 20}%`;
    bgAnimation.appendChild(circle);
  }

  // Начинаем с мерцания текста
  textElement.classList.add("flicker");

  // Функция для переключения между мерцанием и стабильным состоянием
  function toggleFlicker() {
    // Снимаем мерцание, если оно есть
    if (textElement.classList.contains("flicker")) {
      textElement.classList.remove("flicker");
      textElement.classList.add("steady"); // Включаем стабильность
    } else {
      textElement.classList.remove("steady");
      textElement.classList.add("flicker"); // Включаем мерцание
    }
  }

  // Получаем элементы
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  // Обработчик для кнопки с тремя точками
  menuToggle.addEventListener('click', (event) => {
    event.stopPropagation(); // Останавливаем всплытие события, чтобы клик по кнопке не закрывал меню
    navMenu.classList.toggle('show'); // Переключаем класс для показа/скрытия меню
  });

  // Обработчик для кликов по всему документу
  document.addEventListener('click', (event) => {
    // Проверяем, был ли клик за пределами меню и кнопки с тремя точками
    if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
      navMenu.classList.remove('show'); // Скрываем меню, если клик был вне
    }
  });

  // Мерцание будет происходить сразу после загрузки, затем становится стабильным на 10 секунд
  setTimeout(() => {
    toggleFlicker(); // Текст станет стабильным после первого мерцания
  }, 3000); // После 3 секунд

  // Переключаем состояние каждые 13 секунд (3 секунды мерцание + 10 секунд стабильность)
  setInterval(() => {
    toggleFlicker();
  }, 13000); // Каждые 13 секунд (3 секунды мерцание, 10 секунд стабильность)
});
