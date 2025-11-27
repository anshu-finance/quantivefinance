document.addEventListener('DOMContentLoaded', function() {
    /* --- 1. Navigation Highlighting Logic --- */
    const path = window.location.pathname;
    let fileName = path.substring(path.lastIndexOf('/') + 1);
    
    // Handle root url or index
    if(fileName === "" || fileName === "index.html") {
        activate('nav-home');
    } else if (['projects.html', 'equity-reports.html', 'mf-analysis.html', 'ipo-analysis.html'].includes(fileName)) {
        activate('nav-projects');
    } else if (fileName === 'resume.html') {
        activate('nav-resume');
    } else if (fileName === 'blog.html') {
        activate('nav-blog');
    } else if (fileName === 'contact.html') {
        activate('nav-contact');
    }

    function activate(id) {
        const el = document.getElementById(id);
        if(el) el.classList.add('active');
    }

    /* --- 2. Scroll Animation Logic --- */
    window.addEventListener('scroll', reveal);
    reveal(); // Trigger once on load
});

function reveal() {
    var reveals = document.querySelectorAll('.reveal');
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}

// --- 3. Profile Card 3D Tilt Effect ---
const profileCard = document.querySelector('.profile-card');
const contactButton = document.querySelector('.profile-contact');

if (profileCard) {
    profileCard.addEventListener('mousemove', handleMouseMove);
    profileCard.addEventListener('mouseleave', handleMouseLeave);
}

if (contactButton) {
    contactButton.addEventListener('click', handleContact);
}

function handleMouseMove(e) {
    const card = e.target.closest('.profile-card');
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
}

function handleMouseLeave(e) {
    const card = e.target.closest('.profile-card');
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
}

function handleContact() {
    alert('Thank you for your interest! Please reach out via email or social media.');
}

// --- GOOEY NAV EFFECT ---
const navItems = [
  { label: 'Home', id: 'nav-home' },
  { label: 'Projects', id: 'nav-projects' },
  { label: 'Resume', id: 'nav-resume' },
  { label: 'Blog', id: 'nav-blog' }
];

const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A'];
const navLinks = document.querySelectorAll('nav ul li');
const filterEffect = document.querySelector('.effect.filter');
const textEffect = document.querySelector('.effect.text');

function generateParticles(x, y, index) {
  const particleCount = 15;
  for (let i = 0; i < particleCount; i++) {
    const angle = (i / particleCount) * Math.PI * 2;
    const distance = 80 + Math.random() * 20;
    const startX = Math.cos(angle) * distance;
    const startY = Math.sin(angle) * distance;
    
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.setProperty('--start-x', `${startX}px`);
    particle.style.setProperty('--start-y', `${startY}px`);
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    
    const point = document.createElement('div');
    point.className = 'point';
    point.style.setProperty('--color', colors[i % colors.length]);
    point.style.setProperty('--scale', '1');
    particle.appendChild(point);
    
    filterEffect.appendChild(particle);
    
    setTimeout(() => particle.remove(), 5000);
  }
}

function handleGooeyNavClick(e, index) {
  const rect = navLinks[index].getBoundingClientRect();
  const navContainer = document.querySelector('.nav-container');
  const containerRect = navContainer.getBoundingClientRect();
  const x = rect.left - containerRect.left + rect.width / 2;
  const y = rect.top - containerRect.top + rect.height / 2;
  
  // Update active state
  navLinks.forEach(link => link.classList.remove('active'));
  navLinks[index].classList.add('active');
  textEffect.classList.remove('active');
  
  // Generate particles
  generateParticles(x, y, index);
  
  // Trigger animation
  setTimeout(() => {
    textEffect.classList.add('active');
  }, 50);
}

// Only add gooey nav if effect elements exist (avoid errors on other pages)
if (navLinks.length > 0 && filterEffect && textEffect) {
  navLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
      // Allow natural navigation, but show animation
      handleGooeyNavClick(e, index);
      // Don't prevent default - let the link navigate
    });
  });
}


