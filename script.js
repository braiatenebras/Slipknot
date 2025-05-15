document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const dotsContainer = document.querySelector(".slider-dots");

  let currentSlide = 0;
  const slideCount = slides.length;

  // Criar dots de navegação
  slides.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("slider-dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".slider-dot");

  // Função para ir para um slide específico
  function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateSlider();
  }

  // Atualizar o slider
  function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Atualizar dots
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });
  }

  // Próximo slide
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slideCount;
    updateSlider();
  }

  // Slide anterior
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
    updateSlider();
  }

  // Event listeners
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  // Navegação por teclado
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextSlide();
    if (e.key === "ArrowLeft") prevSlide();
  });

  // Autoplay (opcional)
  let autoplay = setInterval(nextSlide, 5000);

  // Pausar autoplay quando o mouse estiver sobre o slider
  slider.addEventListener("mouseenter", () => {
    clearInterval(autoplay);
  });

  // Retomar autoplay quando o mouse sair do slider
  slider.addEventListener("mouseleave", () => {
    autoplay = setInterval(nextSlide, 5000);
  });

  // Swipe para dispositivos móveis
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  slider.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    },
    { passive: true }
  );

  function handleSwipe() {
    if (touchEndX < touchStartX - 50) nextSlide();
    if (touchEndX > touchStartX + 50) prevSlide();
  }
});
