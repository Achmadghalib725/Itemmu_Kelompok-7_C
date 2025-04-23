// Script untuk menangani form login
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.login-form');
    const loginBtn = document.querySelector('.login-btn');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        
        // Simulasi login - dalam implementasi nyata, ini akan mengirim ke server
        loginBtn.textContent = 'Memproses...';
        
        // Simulasi delay untuk menunjukkan proses login
        setTimeout(function() {
            alert(`Login berhasil dengan email: ${email}`);
            window.location.href = 'index.html'; // Redirect ke halaman utama
        }, 1500);
    });
    
    // Menangani klik pada tombol social login
    const socialBtns = document.querySelectorAll('.social-btn');
    socialBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const provider = this.querySelector('img').alt;
            alert(`Login dengan ${provider} akan diimplementasikan`);
        });
    });
});