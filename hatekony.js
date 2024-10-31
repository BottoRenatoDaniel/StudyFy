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