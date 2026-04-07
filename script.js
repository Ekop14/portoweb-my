// ============================================
// SCRIPT.JS - EKO PRIYATNO PORTFOLIO
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== GLOBAL VARIABLES ====================
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggleBtn');
    const navLinks = document.querySelectorAll('.nav-link');
    const cards = document.querySelectorAll('.card');
    const scrollLinks = document.querySelectorAll('.scroll-link');
    const contactForm = document.querySelector('.contact-form');

    // ==================== SIDEBAR TOGGLE ====================
    function toggleSidebar() {
        sidebar.classList.toggle('active');
        toggleBtn.classList.toggle('active');
        document.body.classList.toggle('sidebar-open');
    }

    toggleBtn.addEventListener('click', toggleSidebar);

    // Tutup sidebar saat klik di luar
    document.addEventListener('click', function(e) {
        if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
            sidebar.classList.remove('active');
            toggleBtn.classList.remove('active');
            document.body.classList.remove('sidebar-open');
        }
    });

    // ==================== NAVIGATION & CARD SWITCHING ====================
    function switchCard(targetId) {
        // Remove active class dari semua card dan nav-link
        cards.forEach(card => card.classList.remove('active'));
        navLinks.forEach(link => link.classList.remove('active'));

        // Add active class ke target card dan nav-link
        document.getElementById(targetId).classList.add('active');
        
        // Update active nav-link
        const activeNav = document.querySelector(`[data-target="${targetId}"]`);
        if (activeNav) activeNav.classList.add('active');

        // Tutup sidebar setelah navigasi
        sidebar.classList.remove('active');
        toggleBtn.classList.remove('active');
        document.body.classList.remove('sidebar-open');
    }

    // Event listener untuk nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            switchCard(targetId);
        });
    });

    // Event listener untuk scroll links
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            switchCard(targetId);
        });
    });

    // ==================== ANIMATIONS & EFFECTS ====================
    
    // Typing effect untuk hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Inisialisasi typing effect
    window.addEventListener('load', function() {
        const heroTitle = document.querySelector('.hero-card h1');
        if (heroTitle) {
            const fullText = heroTitle.textContent;
            setTimeout(() => typeWriter(heroTitle, fullText, 80), 500);
        }
    });

    // Counter animation untuk stats
    function animateCounters() {
        const stats = document.querySelectorAll('.stat h3');
        
        stats.forEach(stat => {
            const target = parseInt(stat.textContent);
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 30);
        });
    }

    // Trigger counter saat home card active
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.id === 'home-card') {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    });

    observer.observe(document.getElementById('home-card'));

    // ==================== FORM HANDLING ====================
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Ambil data form
            const formData = new FormData(contactForm);
            const nama = formData.get('nama') || contactForm.querySelector('input[type="text"]').value;
            const email = formData.get('email') || contactForm.querySelector('input[type="email"]').value;
            const pesan = formData.get('pesan') || contactForm.querySelector('textarea').value;

            // Simulasi pengiriman
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Mengirim...';
            submitBtn.disabled = true;

            // Delay simulasi pengiriman
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                
                // Success message
                showNotification('Pesan berhasil dikirim! Terima kasih.', 'success');
                
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // ==================== NOTIFICATION SYSTEM ====================
    function showNotification(message, type = 'success') {
        // Buat notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: type === 'success' ? '#4CAF50' : '#f44336',
            color: 'white',
            padding: '15px 20px',
            borderRadius: '5px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: '10000',
            transform: 'translateX(400px)',
            transition: 'all 0.3s ease',
            fontWeight: '500'
        });

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    }

    // ==================== SMOOTH SCROLLING & MOBILE OPTIMIZATION ====================
    
    // Smooth scroll untuk internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                switchCard(targetId);
            }
        });
    });

    // ==================== SOCIAL LINKS HOVER EFFECTS ====================
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ==================== MOBILE RESPONSIVE ====================
    function handleResize() {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('active');
            toggleBtn.classList.remove('active');
            document.body.classList.remove('sidebar-open');
        }
    }

    window.addEventListener('resize', handleResize);

    // ==================== LOADING ANIMATION ====================
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Preload images
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                img.addEventListener('load', function() {
                    this.classList.add('loaded');
                });
            }
        });
    });

    console.log('🎉 Portfolio Eko Priyatno siap digunakan!');
});
