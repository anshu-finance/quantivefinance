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
