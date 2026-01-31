// script.js
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            
            // If the final celebration is visible, trigger a special effect
            if (entry.target.id === 'final-celebration') {
                triggerCelebration();
            }
        }
    });
}, observerOptions);

// Observe all moments and the final section
document.querySelectorAll('.moment').forEach(m => observer.observe(m));
observer.observe(document.getElementById('final-celebration'));

function triggerCelebration() {
    // This ensures confetti only fires once when you reach the end
    if (window.confettiFired) return;
    window.confettiFired = true;

    var duration = 5 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);
      // Since they fall down, start them a bit higher than random
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}