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

    // Gestion des appareils 3D
    const deviceBtns = document.querySelectorAll('.device-btn');
    const devices = document.querySelectorAll('.device');
    const wrapper = document.querySelector('.device-wrapper');
    
    // Configuration de la rotation 3D initiale
    const rotateY = window.innerWidth > 768 ? 15 : 5;
    const translateZ = window.innerWidth > 768 ? -400 : -200;
    
    // Fonction pour changer l'appareil actif
    function switchDevice(targetId) {
        devices.forEach(device => {
            if (device.id === targetId) {
                device.style.opacity = '1';
                device.style.visibility = 'visible';
                device.style.transform = `translate3d(-50%, 0, 0) rotateY(0deg)`;
                device.style.zIndex = '2';
            } else {
                device.style.opacity = '0.4';
                device.style.visibility = 'visible';
                device.style.transform = `translate3d(-50%, 0, ${translateZ}px) rotateY(${rotateY}deg)`;
                device.style.zIndex = '1';
            }
        });
    }
    
    // Écouteurs d'événements pour les boutons
    deviceBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            deviceBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const targetDevice = this.getAttribute('data-device');
            switchDevice(targetDevice);
        });
    });
    
    // Animation interactive au survol
    if (window.innerWidth > 768) {
        const deviceShowcase = document.querySelector('.device-showcase');
        
        deviceShowcase.addEventListener('mousemove', function(e) {
            const rect = deviceShowcase.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Calcul de la position relative de la souris
            const mouseX = (e.clientX - centerX) / (rect.width / 2);
            const mouseY = (e.clientY - centerY) / (rect.height / 2);
            
            // Limiter la rotation
            const rotateXMax = 5;
            const rotateYMax = 10;
            
            // Appliquer la rotation basée sur la position de la souris
            const activeDevice = document.querySelector('.device[style*="z-index: 2"]');
            if (activeDevice) {
                activeDevice.querySelector('.device-frame').style.transform = 
                    `rotateX(${-mouseY * rotateXMax}deg) rotateY(${mouseX * rotateYMax}deg)`;
            }
        });
        
        // Réinitialiser la rotation quand la souris quitte la zone
        deviceShowcase.addEventListener('mouseleave', function() {
            const activeDevice = document.querySelector('.device[style*="z-index: 2"]');
            if (activeDevice) {
                activeDevice.querySelector('.device-frame').style.transform = 
                    `rotateX(0deg) rotateY(0deg)`;
            }
        });
    }
    
    // Animation de défilement
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const deviceShowcase = document.querySelector('.device-showcase');
        const offsetTop = deviceShowcase.offsetTop;
        
        // Calculer la position relative au défilement
        const relativeScroll = scrollTop - offsetTop + window.innerHeight / 2;
        
        if (relativeScroll > 0 && relativeScroll < window.innerHeight) {
            // Appliquer un léger effet de parallaxe
            const parallaxValue = relativeScroll / 10;
            wrapper.style.transform = `translateY(${parallaxValue}px)`;
        }
    });
    
    // Animation d'entrée
    setTimeout(() => {
        const activeDevice = document.querySelector('.device-1');
        activeDevice.style.transition = 'all 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        activeDevice.style.opacity = '1';
        activeDevice.style.visibility = 'visible';
        activeDevice.style.transform = 'translate3d(-50%, 0, 0) rotateY(0deg)';
        
        setTimeout(() => {
            const inactiveDevice = document.querySelector('.device-2');
            inactiveDevice.style.transition = 'all 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            inactiveDevice.style.opacity = '0.4';
            inactiveDevice.style.visibility = 'visible';
            inactiveDevice.style.transform = `translate3d(-50%, 0, ${translateZ}px) rotateY(${rotateY}deg)`;
        }, 300);
    }, 500);

    // Interaction parallaxe avec les emojis flottants
    const emojiCloud = document.querySelector('.emoji-cloud');
    const emojis = document.querySelectorAll('.floating-emoji');
    
    if (emojiCloud && window.innerWidth > 768) {
        document.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            emojis.forEach(emoji => {
                const offsetX = (mouseX - 0.5) * 40;
                const offsetY = (mouseY - 0.5) * 40;
                const depth = parseFloat(getComputedStyle(emoji).getPropertyValue('--size')) / 70;
                
                emoji.style.transform = `translate(${offsetX * depth}px, ${offsetY * depth}px) 
                                        rotate(${offsetX * 0.2}deg)`;
            });
        });
    }
    
    // Interaction de la citation flottante
    const quoteElement = document.querySelector('.quote-bubble');
    
    if (quoteElement) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const heroSection = document.querySelector('.hero');
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
            
            if (scrollPosition < heroBottom) {
                const rotateValue = (scrollPosition / heroBottom) * 3;
                const scaleValue = 1 - (scrollPosition / heroBottom) * 0.2;
                
                quoteElement.style.transform = `translateY(${-scrollPosition * 0.2}px) 
                                              rotateX(${rotateValue}deg) 
                                              rotateY(${-rotateValue}deg) 
                                              scale(${scaleValue})`;
            }
        });
    }
    
    // Animation du scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollIndicator.style.opacity = '0';
                setTimeout(() => {
                    scrollIndicator.style.display = 'none';
                }, 300);
            } else {
                scrollIndicator.style.display = 'flex';
                scrollIndicator.style.opacity = '0.7';
            }
        });
    }
    
    // Effet parallaxe pour les séparateurs
    const dots = document.querySelectorAll('.dot');
    
    window.addEventListener('scroll', function() {
        dots.forEach(dot => {
            const scrollPosition = window.scrollY;
            const parentOffset = dot.parentElement.offsetTop;
            const distance = parentOffset - scrollPosition;
            
            if (distance < window.innerHeight && distance > -dot.parentElement.offsetHeight) {
                const speed = parseFloat(getComputedStyle(dot).animationDuration) * 0.2;
                dot.style.transform = `translateY(${(distance / window.innerHeight) * 50 * speed}px)`;
            }
        });
    });
    
    // Amélioration de l'interaction avec la bannière interactive
    const interactiveBanner = document.querySelector('.interactive-banner');
    
    if (interactiveBanner) {
        const bannerContent = interactiveBanner.querySelector('.banner-content');
        
        interactiveBanner.addEventListener('mousemove', function(e) {
            const rect = interactiveBanner.getBoundingClientRect();
            const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
            const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
            
            bannerContent.style.transform = `translate(${mouseX * -20}px, ${mouseY * -20}px)`;
            
            document.querySelectorAll('.wave').forEach((wave, index) => {
                const speed = index + 1;
                wave.style.transform = `translateX(${mouseX * 30 * speed}px)`;
            });
        });
    }
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