// Script khusus untuk halaman topup
document.addEventListener("DOMContentLoaded", () => {
  console.log("Topup page loaded")

  // Fix login button path untuk halaman di root folder
  const loginBtn = document.querySelector(".login-btn")
  if (loginBtn) {
    // Remove existing event listeners
    loginBtn.replaceWith(loginBtn.cloneNode(true))
    const newLoginBtn = document.querySelector(".login-btn")

    newLoginBtn.addEventListener("click", () => {
      window.location.href = "login/login.html" // Path dari root folder
    })
  }

  // Fungsi untuk tab kategori
  const tabButtons = document.querySelectorAll(".tab-btn")

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Hapus kelas active dari semua tombol
      tabButtons.forEach((btn) => btn.classList.remove("active"))

      // Tambahkan kelas active ke tombol yang diklik
      button.classList.add("active")

      // Di sini bisa ditambahkan logika untuk menampilkan konten sesuai tab
      const category = button.textContent.trim()
      console.log(`Tab ${category} clicked`)

      // Contoh implementasi filter game berdasarkan kategori
      // filterGamesByCategory(category);
    })
  })

  // Fungsi untuk menangani klik pada game
  const gameItems = document.querySelectorAll(".game-item")

  gameItems.forEach((game) => {
    game.addEventListener("click", () => {
      const gameName = game.querySelector("p").textContent
      console.log(`Game ${gameName} clicked`)

      // Redirect ke halaman detail game (bisa diimplementasikan nanti)
      // window.location.href = `game-detail.html?game=${encodeURIComponent(gameName)}`;

      // Untuk sementara, tampilkan alert
      alert(`Halaman top up untuk ${gameName} akan segera tersedia!`)
    })
  })
})

// Fungsi untuk filter game berdasarkan kategori (implementasi contoh)
function filterGamesByCategory(category) {
  // Implementasi filter game berdasarkan kategori
  // Ini hanya contoh dan bisa disesuaikan dengan kebutuhan
  console.log(`Filtering games by category: ${category}`)

  // Contoh implementasi:
  // 1. Ambil semua game
  // 2. Sembunyikan semua game
  // 3. Tampilkan game yang sesuai dengan kategori

  // Untuk demo, tidak ada implementasi nyata
}
