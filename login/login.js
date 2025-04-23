// Script untuk menangani form login
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector(".login-form");
  const loginBtn = document.querySelector(".login-btn");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Validasi sederhana
    if (!email || !password) {
      alert("Email dan password harus diisi");
      return;
    }

    // Ubah teks tombol
    loginBtn.textContent = "Memproses...";

    // Kirim data ke server PHP - path tetap sama karena kita berada di folder login
    fetch("login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert(`Login berhasil! Selamat datang, ${data.username}`);
          window.location.href = "../index.html"; // Update path ke halaman utama
        } else {
          alert(data.message || "Login gagal. Silakan coba lagi.");
          loginBtn.textContent = "Masuk";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Terjadi kesalahan. Silakan coba lagi nanti.");
        loginBtn.textContent = "Masuk";
      });
  });

  // Menangani klik pada tombol social login
  const socialBtns = document.querySelectorAll(".social-btn");
  socialBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const provider = this.querySelector("img").alt;
      alert(`Login dengan ${provider} akan diimplementasikan`);
    });
  });
});