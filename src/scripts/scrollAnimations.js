export function initScrollAnimations() {
  const elements = document.querySelectorAll('[data-animate]');

  if (!elements.length) return;

  // Проверяем системные настройки пользователя.
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;

  // Проверяем поддержку IntersectionObserver.
  const supportsObserver = 'IntersectionObserver' in window;

  // Если анимации отключены или браузер
  // не поддерживает IntersectionObserver,
  // оставляем элементы видимыми.
  if (prefersReducedMotion || !supportsObserver) {
    elements.forEach((element) => {
      element.classList.add('is-visible');
    });

    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Элемент ещё не появился на экране.
        if (!entry.isIntersecting) return;

        entry.target.classList.add('is-visible');

        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    },
  );

  // Включаем систему анимаций.
  document.documentElement.classList.add('animations-ready');

  // Начинаем наблюдать за элементами.
  elements.forEach((element) => {
    observer.observe(element);
  });
}