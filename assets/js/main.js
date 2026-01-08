document.getElementById("contactForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thank you! Your message was sent (placeholder).");
    this.reset();
});
function highlightElement() {
    const hash = window.location.hash;
    if (hash) {
        const target = document.querySelector(hash);
        if (target) {
            target.classList.add('highlight-flash');
            setTimeout(() => {
                target.classList.remove('highlight-flash');
            }, 2000);
        }
    }
}

const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const btn = this.querySelector('button');
        btn.innerText = "Sent!";
        btn.style.backgroundColor = "#27ae60";
        alert("Thank you, Malek will get back to you shortly.");
        this.reset();
    });
}

window.addEventListener('load', highlightElement);
window.addEventListener('hashchange', highlightElement);