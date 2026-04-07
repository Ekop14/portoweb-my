// ============================================
// SCRIPT.JS - EKO PRIYATNO PORTFOLIO v2.0
// FULLY OPTIMIZED untuk CSS kamu
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== ELEMENTS ====================
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggleBtn');
    const navLinks = document.querySelectorAll('.nav-link');
    const cards = document.querySelectorAll('.card');
    const scrollLinks = document.querySelectorAll('.scroll-link');
    const contactForm = document.querySelector('.contact-form');
    const body = document.body;

    // ==================== SIDEBAR MOBILE ====================
    function toggleSidebar() {
        sidebar.classList.toggle('active');
        toggleBtn.classList.toggle('active');
        body.classList.toggle('sidebar-open');
    }

    toggleBtn.addEventListener('click', toggleSidebar);

    // Tutup sidebar klik luar
    document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
            sidebar.classList.remove('active');
            toggleBtn.classList.remove('active');
            body.classList.remove('sidebar-open');
        }
    });

    // ==================== CARD NAVIGATION ====================
    function switchCard(targetId) {
        // Hide semua cards
        cards.forEach(card => {
            card.style.display = 'none';
            card.classList.remove('active');
        });
        
        navLinks.forEach(link => link.classList.remove('active'));

        // Show target card
        const targetCard = document.getElementById(targetId);
        targetCard.style.display = 'block';
        targetCard.classList.add('active');
        
        // Active nav
        const activeNav = document.querySelector(`[data-target="${targetId}"]`);
        if (activeNav) activeNav.classList.add('active');

        // Tutup sidebar
        sidebar.classList.remove('active');
        toggleBtn.classList.remove('active');
        body.classList.remove('sidebar-open');

        // Scroll ke top smooth
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            switchCard(targetId);
        });
    });

    // Scroll links
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            switchCard(targetId);
        });
    });

    // ==================== ANIMATIONS ====================
    
    // 1. Typing Effect (Hero Title)
    function typeWriter(element, text, speed = 80) {
        let i = 0;
        element.innerHTML = '';
        element.style.overflow = 'hidden';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                element.style.overflow = '';
            }
        }
        type();
    }

    // Start typing setelah load
    window.addEventListener('load', () => {
        const heroTitle = document.querySelector('.hero-card h1');
        if (heroTitle) {
            const fullText = heroTitle.textContent;
            setTimeout(() => typeWriter(heroTitle, fullText), 800);
        }
    });

    // 2. Card Slide In Animation (match CSS transform)
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => cardObserver.observe(card));

    // 3. Stats Counter
    function animateStats() {
        const stats = document.querySelectorAll('.hero-stats .stat h3');
        stats.forEach(stat => {
            const target = parseInt(stat.textContent);
            let current = 0;
            const increment = target > 100 ? target / 30 : target / 20;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.ceil(current);
                }
            }, 50);
        });
    }

    // Trigger stats saat home card visible
    const homeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateStats, 1000);
                homeObserver.unobserve(entry.target);
            }
        });
    });
    homeObserver.observe(document.getElementById('home-card'));

    // ==================== CONTACT FORM ====================
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Loading state
            submitBtn.textContent = '⏳ Mengirim...';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                showToast('✅ Pesan berhasil dikirim!', 'success');
            }, 2000);
        });
    }

    // ==================== TOAST NOTIFICATION ====================
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed; top: 20px; right: 20px; 
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white; padding: 12px 20px; border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 9999;
            transform: translateX(350px); transition: all 0.3s ease;
            font-weight: 500; font-size: 14px;
        `;
        
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => toast.style.transform = 'translateX(0)', 100);
        
        // Auto remove
        setTimeout(() => {
            toast.style.transform = 'translateX(350px)';
            setTimeout(() => document.body.removeChild(toast), 300);
        }, 3500);
    }

    // ==================== DARK MODE TOGGLE ====================
    // (Karena CSS kamu sudah support .dark-mode)
    function toggleDarkMode() {
        body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
    }

    // Check localStorage on load
    if (localStorage.getItem('darkMode') === 'true') {
        body.classList.add('dark-mode');
    }

    // Add dark mode button ke sidebar (optional)
    const sidebarFooter = document.querySelector('.sidebar-footer');
    const darkModeBtn = document.createElement('button');
    darkModeBtn.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeBtn.className = 'dark-mode-toggle';
    darkModeBtn.style.cssText = `
        background: none; border: none; color: white; 
        font-size: 18px; cursor: pointer; margin: 10px 0;
        padding: 8px; border-radius: 5px; width: 100%; text-align: left;
    `;
    darkModeBtn.title = 'Toggle Dark Mode';
    darkModeBtn.addEventListener('click', toggleDarkMode);
    sidebarFooter.parentNode.insertBefore(darkModeBtn, sidebarFooter);

    // ==================== RESPONSIVE ====================
    function handleResize() {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('active');
            toggleBtn.classList.remove('active');
            body.classList.remove('sidebar-open');
        }
    }
    window.addEventListener('resize', handleResize);

    // ==================== SMOOTH SCROLL ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) switchCard(targetId);
        });
    });

    // ==================== LOADING ====================
    window.addEventListener('load', () => {
        body.classList.add('loaded');
        document.querySelectorAll('img').forEach(img => {
            img.onload = () => img.classList.add('loaded');
        });
    });

    console.log('🚀 Portfolio EKO PRIYATNO - Fully Loaded & Optimized!');
});
