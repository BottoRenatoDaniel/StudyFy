// Buborékok megjelenítése görgetéskor
function revealBubbles() {
    const bubbles = document.querySelectorAll('.bubble-section');

    bubbles.forEach((bubble) => {
        const windowHeight = window.innerHeight;
        const bubbleTop = bubble.getBoundingClientRect().top;
        const revealPoint = 150;

        if (bubbleTop < windowHeight - revealPoint) {
            bubble.classList.add('visible');
        } else {
            bubble.classList.remove('visible');
        }
    });
}

window.addEventListener('scroll', revealBubbles);

// Funkció a megjelenítés figyeléséhez
function animateOnScroll() {
    const ctaItems = document.querySelectorAll('.cta-item');

    ctaItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight && !item.classList.contains('visible')) {
            item.classList.add('visible');
            const text = item.querySelector('.cta-text');
            text.style.display = 'block';
        }
    });
}

// Görgetés eseményhez kapcsolódás
window.addEventListener('scroll', animateOnScroll);

// Az első megjelenítéskor ellenőrzés
animateOnScroll();

document.addEventListener("DOMContentLoaded", () => {
    const parallaxItems = document.querySelectorAll(".parallax-item, .parallax-image");

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Megjelenítési sebesség szerint változtatás
                    const speed = entry.boundingClientRect.top / window.innerHeight;
                    entry.target.style.transition = `transform ${Math.abs(speed)}s ease-out, opacity 0.5s ease`;
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = `translateY(${speed * -100}px)`;
                } else {
                    entry.target.style.opacity = 0;
                    entry.target.style.transform = `translateY(50px)`;
                }
            });
        },
        { threshold: 0.1 }
    );

    parallaxItems.forEach(item => observer.observe(item));
});

function goToRegister() {
    window.location.href = "register.html"; 
}