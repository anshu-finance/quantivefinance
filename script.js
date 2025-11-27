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

