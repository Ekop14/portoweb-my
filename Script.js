// DOM Elements
const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggleBtn');
const mainContent = document.querySelector('.main-content');
const navLinks = document.querySelectorAll('.nav-link');
const cards = document.querySelectorAll('.card');
const scrollLinks = document.querySelectorAll('.scroll-link');

// Toggle Sidebar
toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    mainContent.classList.toggle('expanded');
    
    // Change toggle button icon
    const icon = toggleBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Navbar Navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Update active nav link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Show target card
        const targetId = link.dataset.target;
        showCard(targetId);
        
        // Close sidebar on mobile
        if (window.innerWidth <= 1024) {
            sidebar.classList.remove('active');
            mainContent.classList.remove('expanded');
            toggleBtn.querySelector('i').classList.add('fa-bars');
            toggleBtn.querySelector('i').classList.remove('fa-times');
        }
    });
});

// Show specific card
function showCard(cardId) {
    cards.forEach(card => {
        card.classList.remove('active');
    });
    
    const targetCard = document.getElementById(cardId);
    if (targetCard) {
        targetCard.classList.add('active');
        
        // Scroll to top smoothly
        targetCard.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Scroll link navigation
scrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.dataset.target;
        
        // Update nav link
        navLinks.forEach(l => l.classList.remove('active'));
        document.querySelector(`[data-target="${targetId}"]`).classList.add('active');
        
        // Show card
        showCard(targetId);
    });
});

// Contact Form
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Mengirim...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Terima kasih! Pesan Anda telah terkirim. Saya akan balas secepatnya.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Window resize handler
window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
        sidebar.classList.remove('active');
        mainContent.classList.remove('expanded');
    }
});

// Initialize - show home card
document.addEventListener('DOMContentLoaded', () => {
    showCard('home-card');
});