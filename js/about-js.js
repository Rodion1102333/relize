document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".section");
  let currentSectionIndex = 0; // Начальная секция

  // Изначально отображаем первую секцию
  sections[currentSectionIndex].classList.add("show");

  let touchStartY = 0; // Координата начала касания
  let touchEndY = 0; // Координата окончания касания

  // Функция переключения секций
  const switchSection = (direction) => {
    const newSectionIndex = currentSectionIndex + direction;

    // Проверяем, чтобы индекс был в пределах массива
    if (newSectionIndex >= 0 && newSectionIndex < sections.length) {
      // Убираем активный класс с текущей секции
      sections[currentSectionIndex].classList.remove("show");
      sections[currentSectionIndex].classList.add("hide"); // Добавляем эффект исчезновения

      setTimeout(() => {
        // Скрываем текущую секцию после анимации
        sections[currentSectionIndex].style.display = "none";
        sections[currentSectionIndex].classList.remove("hide"); // Убираем класс после скрытия

        // Обновляем текущую секцию
        currentSectionIndex = newSectionIndex;

        // Показываем новую секцию
        sections[currentSectionIndex].style.display = "block";
        setTimeout(() => {
          sections[currentSectionIndex].classList.add("show"); // Плавное появление
        }, 50); // Небольшая задержка для срабатывания CSS анимации
      }, 800); // Длительность совпадает с временем перехода
    }
  };

  // Слушатель для колесика мыши
  window.addEventListener("wheel", (event) => {
    const direction = event.deltaY > 0 ? 1 : -1;
    switchSection(direction);
  });

  // Слушатели для свайпов
  window.addEventListener("touchstart", (event) => {
    touchStartY = event.touches[0].clientY; // Начальная координата касания
  });

  window.addEventListener("touchend", (event) => {
    touchEndY = event.changedTouches[0].clientY; // Конечная координата касания

    // Определяем направление свайпа
    const swipeThreshold = 50; // Минимальное расстояние для регистрации свайпа
    if (Math.abs(touchEndY - touchStartY) > swipeThreshold) {
      const direction = touchEndY < touchStartY ? 1 : -1; // 1 - вниз, -1 - вверх
      switchSection(direction);
    }
  });
});
