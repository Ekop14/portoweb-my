document.addEventListener('DOMContentLoaded', () => {

    console.log("JS CONNECTED ✅");

    // =====================
    // DOM ELEMENTS
    // =====================
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggleBtn');
    const mainContent = document.querySelector('.main-content');
    const navLinks = document.querySelectorAll('.nav-link');
    const cards = document.querySelectorAll('.card');
    const scrollLinks = document.querySelectorAll('.scroll-link');
    const contactForm = document.querySelector('.contact-form');

    // =====================
    // TOGGLE SIDEBAR
    // =====================
    if (toggleBtn && sidebar && mainContent) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            mainContent.classList.toggle('expanded');

            const icon = toggleBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }

    // =====================
    // SHOW CARD FUNCTION
    // =====================
    function showCard(cardId) {
        cards.forEach(card => {
            card.classList.remove('active');
        });

        const targetCard = document.getElementById(cardId);

        if (targetCard) {
            targetCard.classList.add('active');

            targetCard.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // =====================
    // NAVIGATION MENU
    // =====================
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Active menu
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Show content
            const targetId = link.dataset.target;
            showCard(targetId);

            // Close sidebar (mobile)
            if (window.innerWidth <= 1024) {
                sidebar.classList.remove('active');
                mainContent.classList.remove('expanded');
            }
        });
    });

    // =====================
    // SCROLL LINKS
    // =====================
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const targetId = link.dataset.target;

            navLinks.forEach(l => l.classList.remove('active'));

            const targetNav = document.querySelector(`[data-target="${targetId}"]`);
            if (targetNav) targetNav.classList.add('active');

            showCard(targetId);
        });
    });

    // =====================
    // CONTACT FORM
    // =====================
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;

            btn.textContent = 'Mengirim...';
            btn.disabled = true;

            setTimeout(() => {
                alert('Terima kasih! Pesan Anda sudah terkirim.');
                contactForm.reset();

                btn.textContent = originalText;
                btn.disabled = false;
            }, 2000);
        });
    }

    // =====================
    // WINDOW RESIZE
    // =====================
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            sidebar.classList.remove('active');
            mainContent.classList.remove('expanded');
        }
    });

    // =====================
    // INITIAL LOAD
    // =====================
    showCard('home-card');

});
