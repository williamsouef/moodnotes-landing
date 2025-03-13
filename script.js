// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    // Animation de défilement fluide pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation d'apparition au défilement
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
            }
        });
    }, { threshold: 0.1 });

    // Sélectionner les éléments à animer
    const elementsToAnimate = document.querySelectorAll('.feature-card, .testimonial-card, .phone-mockup, .quote-card');
    elementsToAnimate.forEach(element => {
        element.classList.add('animate-hidden');
        observer.observe(element);
    });

    // Animation de la barre de navigation au défilement
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Défilement vers le bas
            header.style.transform = 'translateY(-100%)';
        } else {
            // Défilement vers le haut
            header.style.transform = 'translateY(0)';
        }
        
        // Ajouter la classe d'effet de fond lorsqu'on défile
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });

    // Simuler les caractéristiques de l'application
    const currentDate = new Date();
    const dateElements = document.querySelectorAll('.testimonial-date');
    
    dateElements.forEach((element, index) => {
        const date = new Date(currentDate);
        date.setDate(date.getDate() - index);
        
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        element.textContent = date.toLocaleDateString('fr-FR', options);
    });

    // Ajouter des interactions aux cartes
    const cards = document.querySelectorAll('.feature-card, .testimonial-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
        });
    });
});

// Ajouter des styles d'animation
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .animate-hidden {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .animate-visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        header {
            transition: transform 0.3s ease-out, background-color 0.3s ease;
        }
        
        header.scrolled {
            background-color: rgba(18, 18, 18, 0.95);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }
    </style>
`); 