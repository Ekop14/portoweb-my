document.addEventListener('DOMContentLoaded', () => {

    console.log("🚀 PRO JS LOADED");

    // =====================
    // DOM ELEMENTS
    // =====================
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggleBtn');
    const mainContent = document.querySelector('.main-content');
    const navLinks = document.querySelectorAll('.nav-link');
    const cards = document.querySelectorAll('.card');
    const darkToggle = document.getElementById('darkModeToggle');

    // =====================
    // 🎨 GRADIENT BACKGROUND
    // =====================
    const gradients = [
        "linear-gradient(135deg, #667eea, #764ba2)",
        "linear-gradient(135deg, #ff9a9e, #fad0c4)",
        "linear-gradient(135deg, #a18cd1, #fbc2eb)",
        "linear-gradient(135deg, #fbc2eb, #a6c1ee)",
        "linear-gradient(135deg, #84fab0, #8fd3f4)"
    ];

    let i = 0;
    setInterval(() => {
        document.body.style.background = gradients[i];
        document.body.style.transition = "1s";
        i = (i + 1) % gradients.length;
    }, 5000);

    // =====================
    // 🌙 DARK MODE
    // =====================
    if (darkToggle) {
        darkToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
        });
    }

    // =====================
    // 📱 SIDEBAR TOGGLE
    // =====================
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            mainContent.classList.toggle('expanded');
        });
    }

    // =====================
    // ✨ SHOW CARD + ANIMATION
    // =====================
    function showCard(cardId) {
        cards.forEach(card => {
            card.classList.remove('active');
            card.style.opacity = 0;
        });

        const target = document.getElementById(cardId);

        if (target) {
            target.classList.add('active');

            setTimeout(() => {
                target.style.opacity = 1;
                target.style.transition = "0.5s";
            }, 100);
        }
    }

    // =====================
    // 🔗 NAVIGATION
    // =====================
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            const targetId = link.dataset.target;
            showCard(targetId);

            // Close mobile sidebar
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
        });
    });

    // =====================
    // 📦 SCROLL EFFECT
    // =====================
    window.addEventListener('scroll', () => {
        const cards = document.querySelectorAll('.card');

        cards.forEach(card => {
            const top = card.getBoundingClientRect().top;
            if (top < window.innerHeight - 100) {
                card.style.transform = "translateY(0)";
                card.style.opacity = 1;
                card.style.transition = "0.6s";
            }
        });
    });

    // =====================
    // 🎯 TYPING EFFECT
    // =====================
    const typingElement = document.querySelector('.typing');
    if (typingElement) {
        const text = "Welcome to My Portfolio 🚀";
        let index = 0;

        function type() {
            if (index < text.length) {
                typingElement.innerHTML += text.charAt(index);
                index++;
                setTimeout(type, 50);
            }
        }

        type();
    }

    // =====================
    // INIT
    // =====================
    showCard('home-card');

});
