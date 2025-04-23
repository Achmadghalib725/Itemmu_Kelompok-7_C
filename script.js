// Carousel functionality
const track = document.getElementById("carouselTrack")
const slides = Array.from(track.children)
const nextBtn = document.getElementById("nextBtn")
const prevBtn = document.getElementById("prevBtn")
const dotsContainer = document.getElementById("carouselDots")

let currentSlide = 0

// Buat dot sesuai jumlah slide
slides.forEach((_, index) => {
  const dot = document.createElement("button")
  if (index === 0) dot.classList.add("active")
  dotsContainer.appendChild(dot)
})

const dots = Array.from(dotsContainer.children)

function updateCarousel() {
  const slideWidth = slides[0].getBoundingClientRect().width
  track.style.transform = `translateX(-${slideWidth * currentSlide}px)`

  dots.forEach((dot) => dot.classList.remove("active"))
  dots[currentSlide].classList.add("active")
}

function goToNextSlide() {
  currentSlide = (currentSlide + 1) % slides.length
  updateCarousel()
}

function goToPrevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length
  updateCarousel()
}

// Event listeners
nextBtn.addEventListener("click", () => {
  goToNextSlide()
  resetAutoSlide() // reset timer kalau tombol diklik
})

prevBtn.addEventListener("click", () => {
  goToPrevSlide()
  resetAutoSlide()
})

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentSlide = index
    updateCarousel()
    resetAutoSlide()
  })
})

window.addEventListener("resize", updateCarousel)

// Auto slide setiap 5 detik
let autoSlide = setInterval(goToNextSlide, 5000)

// Reset ulang timer ketika user berinteraksi
function resetAutoSlide() {
  clearInterval(autoSlide)
  autoSlide = setInterval(goToNextSlide, 5000)
}

// Geser dengan scroll mouse
const carouselContainer = document.querySelector(".carousel-container")

carouselContainer.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault()

    if (e.deltaY > 0) {
      goToNextSlide()
    } else {
      goToPrevSlide()
    }

    resetAutoSlide()
  },
  { passive: false },
)

// Tombol "Lihat game lainnya"
document.getElementById("seeMoreBtn")?.addEventListener("click", () => {
  alert("Menampilkan lebih banyak game (fitur bisa dikembangkan)")
})

// Sticky Navbar functionality
window.addEventListener("scroll", () => {
  const navbarContainer = document.getElementById("navbar-container")
  const navbar = document.getElementById("navbar")

  if (window.scrollY > 10) {
    navbarContainer?.classList.add("navbar-scrolled")
    navbar?.classList.add("navbar-scrolled")
  } else {
    navbarContainer?.classList.remove("navbar-scrolled")
    navbar?.classList.remove("navbar-scrolled")
  }
})

// Fungsi untuk mengecek status login dan memperbarui navbar
function checkLoginStatus() {
  // Fetch status login dari server - update path
  fetch("check_login.php")
    .then((response) => response.json())
    .then((data) => {
      const loginBtnContainer = document.querySelector(".navbar-top .login-btn-container");

      if (data.loggedin) {
        // User sudah login, tampilkan profil user
        if (loginBtnContainer) {
          loginBtnContainer.innerHTML = `
            <div class="user-profile">
              <div class="user-avatar">
                <i class="fa-solid fa-user"></i>
              </div>
              <span class="username">${data.username}</span>
            </div>
          `;

          // Tambahkan dropdown menu untuk logout
          const userProfile = loginBtnContainer.querySelector(".user-profile");
          userProfile.addEventListener("click", () => {
            const dropdown = document.querySelector(".user-dropdown");
            if (dropdown) {
              dropdown.classList.toggle("show");
            } else {
              const newDropdown = document.createElement("div");
              newDropdown.className = "user-dropdown";
              newDropdown.innerHTML = `
                <ul>
                  <li><a href="#"><i class="fa-solid fa-user-circle"></i> Profil</a></li>
                  <li><a href="#"><i class="fa-solid fa-history"></i> Riwayat</a></li>
                  <li><a href="#" id="logoutBtn"><i class="fa-solid fa-sign-out-alt"></i> Keluar</a></li>
                </ul>
              `;
              loginBtnContainer.appendChild(newDropdown);

              // Tambahkan event listener untuk logout - update path
              document.getElementById("logoutBtn").addEventListener("click", (e) => {
                e.preventDefault();
                
                // Kirim request logout ke server
                fetch("login/logout.php") // Update path
                  .then(response => response.json())
                  .then(data => {
                    if (data.success) {
                      window.location.reload();
                    }
                  })
                  .catch(error => {
                    console.error("Error:", error);
                  });
              });

              newDropdown.classList.add("show");
            }
          });

          // Tutup dropdown ketika klik di luar
          document.addEventListener("click", (e) => {
            if (!loginBtnContainer.contains(e.target)) {
              const dropdown = document.querySelector(".user-dropdown");
              if (dropdown) {
                dropdown.classList.remove("show");
              }
            }
          });
        }
      }
    })
    .catch((error) => {
      console.error("Error checking login status:", error);
    });
}

// Tambahkan event listener untuk tombol Masuk
document.addEventListener("DOMContentLoaded", () => {
  // Ubah struktur tombol login untuk memudahkan penggantian dengan profil user
  const loginBtn = document.querySelector(".login-btn")

  if (loginBtn) {
    // Buat container untuk tombol login
    const loginBtnContainer = document.createElement("div")
    loginBtnContainer.className = "login-btn-container"
    loginBtnContainer.appendChild(loginBtn.cloneNode(true))

    // Ganti tombol login dengan container
    loginBtn.parentNode.replaceChild(loginBtnContainer, loginBtn)

    // Tambahkan event listener ke tombol login yang baru
    const newLoginBtn = loginBtnContainer.querySelector(".login-btn")
    newLoginBtn.addEventListener("click", () => {
      window.location.href = "login/login.html"
    })

    // Cek status login
    checkLoginStatus()
  }
})
