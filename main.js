// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// ** EmailJS Integration **
emailjs.init("AXSu6_t_krnDZj4aF"); // Public Key

const form = document.getElementById("contact-form");
const submitButton = document.getElementById("submit-btn");

if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        submitButton.innerHTML = "Mengirim...";
        submitButton.disabled = true;
        
        emailjs.sendForm("service_x8tj2hp", "template_qk9tf1c", form)
            .then(() => {
                submitButton.innerHTML = "Pesan Terkirim!";
                form.reset();
                setTimeout(() => {
                    submitButton.innerHTML = "Kirim Pesan";
                    submitButton.disabled = false;
                }, 2000);
            }, (error) => {
                console.error("Error:", error);
                submitButton.innerHTML = "Gagal, Coba Lagi";
                setTimeout(() => {
                    submitButton.innerHTML = "Kirim Pesan";
                    submitButton.disabled = false;
                }, 2000);
            });
    });
}
