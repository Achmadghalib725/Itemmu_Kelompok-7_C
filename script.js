const track = document.getElementById('carouselTrack');
const slides = Array.from(track.children);
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const dotsContainer = document.getElementById('carouselDots');

let currentSlide = 0;

// Buat dot sesuai jumlah slide
slides.forEach((_, index) => {
  const dot = document.createElement('button');
  if (index === 0) dot.classList.add('active');
  dotsContainer.appendChild(dot);
});

const dots = Array.from(dotsContainer.children);

function updateCarousel() {
  const slideWidth = slides[0].getBoundingClientRect().width;
  track.style.transform = `translateX(-${slideWidth * currentSlide}px)`;

  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentSlide].classList.add('active');
}

function goToNextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  updateCarousel();
}

function goToPrevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateCarousel();
}

// Event listeners
nextBtn.addEventListener('click', () => {
  goToNextSlide();
  resetAutoSlide(); // reset timer kalau tombol diklik
});

prevBtn.addEventListener('click', () => {
  goToPrevSlide();
  resetAutoSlide();
});

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentSlide = index;
    updateCarousel();
    resetAutoSlide();
  });
});

window.addEventListener('resize', updateCarousel);

// Auto slide setiap 5 detik
let autoSlide = setInterval(goToNextSlide, 5000);

// Reset ulang timer ketika user berinteraksi
function resetAutoSlide() {
  clearInterval(autoSlide);
  autoSlide = setInterval(goToNextSlide, 5000);
}
// Geser dengan scroll mouse
const carouselContainer = document.querySelector('.carousel-container');

carouselContainer.addEventListener('wheel', (e) => {
  e.preventDefault();

  if (e.deltaY > 0) {
    goToNextSlide();
  } else {
    goToPrevSlide();
  }

  resetAutoSlide();
}, { passive: false });
