// Script untuk menangani form registrasi
document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");
    const registerBtn = document.querySelector(".register-btn");
    
    // Fungsi untuk validasi form
    function validateForm() {
        let isValid = true;
        
        // Reset pesan error
        document.querySelectorAll(".error-message").forEach(el => {
            el.textContent = "";
        });
        
        // Validasi email
        const email = document.getElementById("email").value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            document.getElementById("emailError").textContent = "Format email tidak valid";
            isValid = false;
        }
        
        // Validasi username
        const username = document.getElementById("username").value;
        if (username.length < 3) {
            document.getElementById("usernameError").textContent = "Username minimal 3 karakter";
            isValid = false;
        }
        
        // Validasi password
        const password = document.getElementById("password").value;
        if (password.length < 6) {
            document.getElementById("passwordError").textContent = "Password minimal 6 karakter";
            isValid = false;
        }
        
        // Validasi konfirmasi password
        const confirmPassword = document.getElementById("confirmPassword").value;
        if (password !== confirmPassword) {
            document.getElementById("confirmPasswordError").textContent = "Password tidak cocok";
            isValid = false;
        }
        
        // Validasi checkbox terms dan privacy
        const termsAgreement = document.getElementById("termsAgreement").checked;
        const privacyAgreement = document.getElementById("privacyAgreement").checked;
        
        if (!termsAgreement || !privacyAgreement) {
            isValid = false;
        }
        
        return isValid;
    }
    
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // Validasi form
        if (!validateForm()) {
            return;
        }
        
        // Ambil data form
        const email = document.getElementById("email").value;
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const newsletter = document.getElementById("newsletter").checked;
        
        // Ubah teks tombol
        registerBtn.textContent = "Memproses...";
        registerBtn.disabled = true;
        
        // Kirim data ke server PHP
        fetch("register.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                username,
                password,
                newsletter
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                alert("Pendaftaran berhasil! Silakan login.");
                window.location.href = "login.html";
            } else {
                alert(data.message || "Pendaftaran gagal. Silakan coba lagi.");
                registerBtn.textContent = "Daftar";
                registerBtn.disabled = false;
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("Terjadi kesalahan. Silakan coba lagi nanti.");
            registerBtn.textContent = "Daftar";
            registerBtn.disabled = false;
        });
    });
});