// --- HAMBURGER MENU LOGIC ---
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if(hamburger) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("active");
    });
}

// Close menu when a link is clicked
document.querySelectorAll(".nav-links a").forEach(n => n.addEventListener("click", () => {
    if(hamburger) {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
    }
}));


// --- UNIVERSAL SHARE FUNCTION ---
async function shareBlog(url, title) {
    // Check if the browser supports the native share menu (Phones mostly do)
    if (navigator.share) {
        try {
            await navigator.share({
                title: title,
                text: 'Check out this amazing financial insight by Anshumaan Verma!',
                url: url
            });
            console.log('Shared successfully');
        } catch (err) {
            console.log('Error sharing:', err);
        }
    } else {
        // Fallback for Desktops that don't support native share
        // It simply copies the link to clipboard
        navigator.clipboard.writeText(url).then(function() {
            alert("Link copied to clipboard! You can now paste it on WhatsApp, LinkedIn, or anywhere.");
        }, function(err) {
            console.error('Could not copy text: ', err);
        });
    }
}
