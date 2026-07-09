/* =========================================================================
   SCRIPT.JS - Interactivity for Param Chotaliya's Portfolio
   ========================================================================= */

/* --- Theme Switcher --- */
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;
const themes = ['dark-theme', 'light-theme', 'blue-theme'];
let currentThemeIndex = 0; // Assume starting with dark-theme

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        // Remove current theme
        if (themes[currentThemeIndex] !== 'dark-theme') {
            body.classList.remove(themes[currentThemeIndex]);
        }
        
        // Cycle to next theme
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        
        // Add new theme
        if (themes[currentThemeIndex] !== 'dark-theme') {
            body.classList.add(themes[currentThemeIndex]);
        }
        
        // Ensure dark-theme is applied properly if it's the base active one
        if (themes[currentThemeIndex] === 'dark-theme') {
             body.className = "dark-theme"; 
        }
    });
}

/* --- Mobile Nav Toggle --- */
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show-menu');
        const icon = navToggle.querySelector('i');
        if (icon) {
            if (navMenu.classList.contains('show-menu')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
}

/* Remove Menu on Nav Link Click */
const navLinks = document.querySelectorAll('.nav-link');

function linkAction() {
    navMenu.classList.remove('show-menu');
    if (navToggle) {
        const icon = navToggle.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
}
navLinks.forEach(n => n.addEventListener('click', linkAction));


/* --- Change Background Header --- */
function scrollHeader() {
    const header = document.getElementById('header');
    const logo = document.getElementById('nav-logo');
    if (this.scrollY >= 50) {
        header.classList.add('scroll-header');
        if (logo) logo.classList.add('scrolled');
    } else {
        header.classList.remove('scroll-header');
        if (logo) logo.classList.remove('scrolled');
    }
}
window.addEventListener('scroll', scrollHeader);


/* --- Scroll Up Visibility --- */
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    if (this.scrollY >= 350) {
        scrollUp.classList.add('show-scroll');
    } else {
        scrollUp.classList.remove('show-scroll');
    }
}
window.addEventListener('scroll', scrollUp);


/* --- Active Link on Scroll Section --- */
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);


/* --- Typing Effect (Hero Section) --- */
const typingText = document.querySelector('.typing-text');
const words = ["Data Science", "AI-ML Engineer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 150;

function type() {
    if (!typingText) return;

    const currentWord = words[wordIndex];
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 50; // Faster when deleting
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 150; // Normal typing speed
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typingDelay = 1500; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingDelay = 500; // Pause before new word
    }

    setTimeout(type, typingDelay);
}

document.addEventListener("DOMContentLoaded", () => {
    if(words.length) setTimeout(type, 1000);
});





/* --- Contact Form AJAX Submission --- */
const contactForm = document.getElementById('contact-form');
const successModal = document.getElementById('success-modal');
const closeModalBtn = document.getElementById('close-modal');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Sending <i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        const formData = new FormData(contactForm);

        fetch(contactForm.action.replace('https://formsubmit.co/', 'https://formsubmit.co/ajax/'), {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Show success modal
                if (successModal) successModal.classList.add('active');
                contactForm.reset();
            } else {
                alert('Oops! There was a problem submitting your form');
            }
        })
        .catch(error => {
            alert('Oops! There was a problem submitting your form');
        })
        .finally(() => {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        });
    });
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        if (successModal) successModal.classList.remove('active');
    });
}

if (successModal) {
    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) {
            successModal.classList.remove('active');
        }
    });
}
