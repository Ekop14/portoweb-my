// ===========================
// INISIALISASI LUCIDE ICONS
// ===========================
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  initNavigation();
  initMobileMenu();
  initParticles();
  initCountUp();
  initSkillBars();
  initContactForm();
  initHeroButtons();
});

// ===========================
// NAVIGASI HALAMAN
// ===========================
function initNavigation() {
  const navBtns = document.querySelectorAll('.nav-btn');
  const pages = document.querySelectorAll('.page');

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetPage = btn.getAttribute('data-page');

      // Hapus class active dari semua tombol & halaman
      navBtns.forEach(b => b.classList.remove('active'));
      pages.forEach(p => {
        p.classList.remove('active', 'visible');
      });

      // Aktifkan tombol yang diklik
      btn.classList.add('active');

      // Tampilkan halaman target dengan animasi
      const targetEl = document.getElementById(`page-${targetPage}`);
      if (targetEl) {
        targetEl.classList.add('active');
        // Trigger reflow agar transisi CSS berjalan
        void targetEl.offsetWidth;
        targetEl.classList.add('visible');
      }

      // Animasi skill bars jika halaman profile
      if (targetPage === 'profile') {
        setTimeout(initSkillBars, 150);
      }

      // Tutup sidebar mobile jika terbuka
      closeMobileMenu();
    });
  });
}

// ===========================
// MOBILE MENU
// ===========================
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger-btn');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');

  hamburger.addEventListener('click', () => {
    const isOpen = sidebar.classList.contains('open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      sidebar.classList.add('open');
      hamburger.classList.add('open');
      overlay.classList.add('active');
      // Trigger reflow untuk transisi opacity
      void overlay.offsetWidth;
      overlay.classList.add('show');
    }
  });

  overlay.addEventListener('click', closeMobileMenu);
}

function closeMobileMenu() {
  const hamburger = document.getElementById('hamburger-btn');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');

  sidebar.classList.remove('open');
  hamburger.classList.remove('open');
  overlay.classList.remove('show');
  setTimeout(() => overlay.classList.remove('active'), 300);
}

// ===========================
// PARTIKEL BACKGROUND
// ===========================
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  let mouseX = width / 2;
  let mouseY = height / 2;

  const PARTICLE_COUNT = 60;
  const particles = [];

  // Kelas partikel
  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.5 + 0.1;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Pengaruh mouse — partikel sedikit tertarik
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 200) {
        this.x += dx * 0.001;
        this.y += dy * 0.001;
      }

      // Bungkus posisi agar tetap di layar
      if (this.x < -10) this.x = width + 10;
      if (this.x > width + 10) this.x = -10;
      if (this.y < -10) this.y = height + 10;
      if (this.y > height + 10) this.y = -10;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, Math.max(0.1, this.size), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(232, 168, 36, ${this.opacity})`;
      ctx.fill();
    }
  }

  // Buat partikel
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }

  // Gambar garis penghubung antar partikel yang dekat
  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          const alpha = (1 - dist / 140) * 0.12;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(232, 168, 36, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  // Loop animasi
  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    drawConnections();
    requestAnimationFrame(animate);
  }

  animate();

  // Update ukuran canvas saat resize
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Track posisi mouse
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
}

// ===========================
// COUNT-UP ANIMASI (ANGKA STATISTIK)
// ===========================
function initCountUp() {
  const statNumbers = document.querySelectorAll('.stat-number');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'));
        animateCount(el, 0, target, 1500);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(num => observer.observe(num));
}

function animateCount(el, start, end, duration) {
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + (end - start) * eased);
    el.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// ===========================
// ANIMASI SKILL BARS
// ===========================
function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');

  fills.forEach(fill => {
    const targetWidth = fill.getAttribute('data-width');
    // Reset dulu agar animasi berulang setiap kali halaman dibuka
    fill.style.width = '0';
    // Trigger reflow
    void fill.offsetWidth;
    fill.style.width = targetWidth + '%';
  });
}

// ===========================
// FORM KONTAK — VALIDASI & SUBMIT
// ===========================
function initContactForm() {
  const form = document.getElementById('contact-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    const nama = form.querySelector('#nama');
    const email = form.querySelector('#email');
    const subjek = form.querySelector('#subjek');
    const pesan = form.querySelector('#pesan');

    let isValid = true;

    // Validasi nama
    if (nama.value.trim().length < 2) {
      showError('nama', 'Nama minimal 2 karakter');
      isValid = false;
    }

    // Validasi email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      showError('email', 'Masukkan alamat email yang valid');
      isValid = false;
    }

    // Validasi subjek
    if (subjek.value.trim().length < 3) {
      showError('subjek', 'Subjek minimal 3 karakter');
      isValid = false;
    }

    // Validasi pesan
    if (pesan.value.trim().length < 10) {
      showError('pesan', 'Pesan minimal 10 karakter');
      isValid = false;
    }

    if (isValid) {
      // Simulasi pengiriman
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Mengirim...</span>';

      setTimeout(() => {
        showToast('Pesan berhasil dikirim! Terima kasih.');
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Kirim Pesan</span><i data-lucide="send"></i>';
        lucide.createIcons();
      }, 1200);
    }
  });

  // Hapus error saat user mulai mengetik
  form.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('error');
      const errorEl = document.getElementById(`error-${input.id}`);
      if (errorEl) errorEl.textContent = '';
    });
  });
}

function showError(fieldId, message) {
  const input = document.getElementById(fieldId);
  const errorEl = document.getElementById(`error-${fieldId}`);
  input.classList.add('error');
  errorEl.textContent = message;
}

function clearErrors() {
  document.querySelectorAll('.form-error').forEach(el => el.textContent = '');
  document.querySelectorAll('.form-group input, .form-group textarea').forEach(el => el.classList.remove('error'));
}

// ===========================
// TOAST NOTIFICATION
// ===========================
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  toastMsg.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

// ===========================
// HERO BUTTONS — NAVIGASI CEPAT
// ===========================
function initHeroButtons() {
  // Tombol "Lihat Profil" -> navigasi ke Profile
  const btnProfile = document.getElementById('btn-see-profile');
  if (btnProfile) {
    btnProfile.addEventListener('click', () => {
      document.querySelector('[data-page="profile"]').click();
    });
  }

  // Tombol "Hubungi Saya" -> navigasi ke Kontak
  const btnContact = document.getElementById('btn-contact-me');
  if (btnContact) {
    btnContact.addEventListener('click', () => {
      document.querySelector('[data-page="kontak"]').click();
    });
  }
}
