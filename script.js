/* script.js – Portfolio Interactivity */

// ========== EmailJS – Contact Form ==========
// STEP 1: Replace YOUR_PUBLIC_KEY below with your EmailJS Public Key
(function () {
  emailjs.init("YOUR_PUBLIC_KEY");
})();

async function handleFormSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('contactForm');
  const btn  = document.getElementById('submitBtn');
  const successBox = document.getElementById('formSuccess');

  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  btn.disabled = true;

  // STEP 2: Replace YOUR_SERVICE_ID and YOUR_TEMPLATE_ID below
  const serviceID  = 'YOUR_SERVICE_ID';
  const templateID = 'YOUR_TEMPLATE_ID';

  const templateParams = {
    from_name:  form.name.value,
    from_email: form.email.value,
    subject:    form.subject.value,
    message:    form.message.value,
    to_email:   'srisurya9951@gmail.com'
  };

  try {
    await emailjs.send(serviceID, templateID, templateParams);
    btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
    successBox.style.display = 'flex';
    form.reset();
  } catch (err) {
    console.error('EmailJS error:', err);
    btn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Failed – try again';
    btn.style.background = 'linear-gradient(135deg,#ef4444,#dc2626)';
  }

  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    btn.disabled = false;
    btn.style.background = '';
    successBox.style.display = 'none';
  }, 5000);
}

// ========== Resume Download (force correct filename) ==========
function downloadResume(e) {
  e.preventDefault();
  fetch('resume.pdf')
    .then(function(response) { return response.blob(); })
    .then(function(blob) {
      var url = window.URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'RSS_Seetha_Ramaraju_Resume.pdf';
      document.body.appendChild(a);
      a.click();
      setTimeout(function() {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }, 200);
    })
    .catch(function() {
      // Fallback: direct link
      window.open('resume.pdf', '_blank');
    });
}

// ========== Navbar Scroll Effect ==========
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  highlightActiveNav();
});

function highlightActiveNav() {
  let cur = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 150) {
      cur = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${cur}`) {
      link.classList.add('active');
    }
  });
}

// ========== Hamburger Menu ==========
const hamburger = document.getElementById('hamburger');
const navLinksUl = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksUl.classList.toggle('open');
});

navLinksUl.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksUl.classList.remove('open');
  });
});

// ========== Typing Effect ==========
const roles = [
  'CS Engineer',
  'Python Developer',
  'Cloud Enthusiast',
  'Problem Solver',
  'Web Developer'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingTarget = document.getElementById('typingText');

function type() {
  const current = roles[roleIndex];
  if (isDeleting) {
    typingTarget.textContent = current.slice(0, charIndex - 1);
    charIndex--;
  } else {
    typingTarget.textContent = current.slice(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === current.length) {
    setTimeout(() => { isDeleting = true; type(); }, 2000);
    return;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }

  setTimeout(type, isDeleting ? 60 : 100);
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(type, 800);
  initParticles();
  observeAnimations();
  animateSkillBars();
});

// ========== Scroll Animations ==========
function observeAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || 0);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
}

// ========== Animate Skill Bars ==========
function animateSkillBars() {
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll('.skill-fill');
        fills.forEach(fill => {
          const w = fill.style.getPropertyValue('--w');
          fill.style.width = '0%';
          setTimeout(() => {
            fill.style.width = w;
          }, 200);
        });
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.skill-category-card').forEach(card => barObserver.observe(card));
}

// ========== Hero Floating Particles ==========
function initParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;
  container.style.position = 'absolute';
  container.style.inset = '0';
  container.style.pointerEvents = 'none';
  container.style.overflow = 'hidden';
  container.style.zIndex = '0';

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 15 + 8;
    const delay = Math.random() * 5;
    const opacity = Math.random() * 0.4 + 0.05;

    particle.style.cssText = `
      position: absolute;
      left: ${x}%;
      top: ${y}%;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: ${Math.random() > 0.5 ? '#3b82f6' : '#22d3ee'};
      opacity: ${opacity};
      animation: floatParticle ${duration}s ${delay}s ease-in-out infinite alternate;
    `;
    container.appendChild(particle);
  }

  // Add keyframes dynamically
  if (!document.getElementById('particleStyle')) {
    const style = document.createElement('style');
    style.id = 'particleStyle';
    style.textContent = `
      @keyframes floatParticle {
        0% { transform: translateY(0px) translateX(0px); }
        100% { transform: translateY(-60px) translateX(${Math.random() > 0.5 ? '-' : ''}30px); }
      }
    `;
    document.head.appendChild(style);
  }
}

// ========== Contact Form ==========
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  const success = document.getElementById('formSuccess');

  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
    success.style.display = 'flex';
    document.getElementById('contactForm').reset();

    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      btn.disabled = false;
      success.style.display = 'none';
    }, 4000);
  }, 1500);
}

// ========== Smooth Reveal on Load ==========
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});
