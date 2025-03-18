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

    // Email capture modal functionality
    const emailModal = document.getElementById('email-modal');
    const testflightBtn = document.getElementById('testflight-btn');
    const closeModalBtn = document.querySelector('.close-modal');
    const emailForm = document.getElementById('email-capture-form');
    const formMessage = document.querySelector('.form-message');
    const testflightLinkContainer = document.getElementById('testflight-link-container');
    
    // Open modal when TestFlight button is clicked
    if (testflightBtn) {
        testflightBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal();
        });
    }

    // Close modal when close button is clicked
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(e) {
        if (e.target === emailModal) {
            closeModal();
        }
    });

    // Close modal when ESC key is pressed
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && emailModal.classList.contains('active')) {
            closeModal();
        }
    });

    // Form submission
    if (emailForm) {
        emailForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('user-email').value;
            
            if (validateEmail(email)) {
                // Here you would typically send the email to your backend/API
                submitEmailToServer(email);
            } else {
                showFormMessage('Please enter a valid email address', 'error');
            }
        });
    }

    function openModal() {
        emailModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        
        // Reset the form and hide TestFlight link if it was previously shown
        if (emailForm) emailForm.reset();
        if (formMessage) formMessage.textContent = '';
        if (testflightLinkContainer) testflightLinkContainer.classList.remove('active');
        document.getElementById('email-form-container').style.display = 'block';
    }

    function closeModal() {
        emailModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toLowerCase());
    }

    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = 'form-message';
        formMessage.classList.add(type);
    }

    function submitEmailToServer(email) {
        console.log("Email submission started for:", email);
        
        // Track the submission attempt
        trackEvent('conversion', 'email_submit', email);
        
        try {
            // 1. Stocker l'email localement
            let storedEmails = JSON.parse(localStorage.getItem('moodlyEmails') || '[]');
            storedEmails.push({
                email: email,
                timestamp: new Date().toISOString(),
                source: document.referrer || 'direct'
            });
            localStorage.setItem('moodlyEmails', JSON.stringify(storedEmails));
            console.log("Email saved to localStorage");
            
            // 2. Afficher le lien TestFlight immédiatement
            document.getElementById('email-form-container').style.display = 'none';
            testflightLinkContainer.classList.add('active');
            showFormMessage('Thank you for your interest in Moodly!', 'success');
            console.log("TestFlight link displayed");
            
            // Track successful conversion
            trackEvent('conversion', 'email_success', email);
            
            // 3. Facultatif: tenter d'envoyer à Firebase en arrière-plan
            fetch('https://moodly-emails-default-rtdb.firebaseio.com/emails.json', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    timestamp: new Date().toISOString(),
                    source: document.referrer || 'direct'
                })
            }).then(() => {
                console.log("Firebase submission successful");
                trackEvent('backend', 'firebase_success', email);
            })
            .catch(err => {
                console.log("Firebase submission failed:", err);
                trackEvent('backend', 'firebase_error', String(err));
            });
            
        } catch (error) {
            console.error("Error in email submission:", error);
            trackEvent('error', 'email_submission_error', String(error));
            
            // Même en cas d'erreur, afficher le lien TestFlight
            document.getElementById('email-form-container').style.display = 'none';
            testflightLinkContainer.classList.add('active');
            showFormMessage('Thank you for your interest in Moodly!', 'success');
        }
    }

    // Admin login functionality
    const adminLoginForm = document.getElementById('admin-login-form');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const password = document.getElementById('admin-password').value;
            
            // Simple password check (in a real app, this would be done server-side)
            if (password === 'moodly2023admin') {
                // Redirect to admin dashboard or show admin content
                window.location.href = 'admin-dashboard.html';
            } else {
                alert('Invalid password');
            }
        });
    }

    // Fonctions de partage social
    function shareOnTwitter() {
        const text = "I just joined the exclusive Moodly beta testing program! Track your emotions and transform your well-being: ";
        const url = window.location.href;
        const referralCode = document.getElementById('referral-code').textContent;
        
        const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=Moodly,MentalHealth,Wellbeing&via=MoodlyApp`;
        
        window.open(shareUrl, '_blank', 'width=550,height=420');
        return false;
    }

    function shareOnFacebook() {
        const url = window.location.href;
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        
        window.open(shareUrl, '_blank', 'width=550,height=420');
        return false;
    }

    function shareViaEmail() {
        const subject = "Join me on Moodly - The emotional well-being app";
        const body = `Hey!\n\nI've just joined Moodly's exclusive beta testing program and thought you might be interested too.\n\nMoodly helps you track your emotions in seconds and provides insights to improve your well-being.\n\nUse my referral code: ${document.getElementById('referral-code').textContent}\n\nJoin here: ${window.location.href}\n\nEnjoy!`;
        
        const shareUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        window.location.href = shareUrl;
        return false;
    }

    function shareViaWhatsApp() {
        const text = `Hey! I've just joined Moodly's exclusive beta testing program and thought you might be interested too. Use my referral code: ${document.getElementById('referral-code').textContent}\n\nJoin here: ${window.location.href}`;
        
        const shareUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
        
        window.open(shareUrl, '_blank');
        return false;
    }

    // Analytics tracking simple
    function trackEvent(category, action, label = null) {
        console.log(`EVENT: ${category} - ${action}${label ? ' - ' + label : ''}`);
        
        // Si Google Analytics est configuré
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                'event_category': category,
                'event_label': label
            });
        }
        
        // Stockage local pour le tableau de bord admin
        try {
            const events = JSON.parse(localStorage.getItem('moodlyEvents') || '[]');
            events.push({
                category,
                action,
                label,
                timestamp: new Date().toISOString()
            });
            localStorage.setItem('moodlyEvents', JSON.stringify(events));
        } catch (error) {
            console.error('Error storing event data:', error);
        }
    }

    // Generate a unique referral code for each user
    function generateReferralCode() {
        // Get stored code if exists
        const storedCode = localStorage.getItem('moodlyReferralCode');
        if (storedCode) {
            return storedCode;
        }
        
        // Generate a new code
        const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        
        // Store for future use
        localStorage.setItem('moodlyReferralCode', result);
        return result;
    }

    // Copy referral code to clipboard
    function setupCopyCodeButton() {
        const copyBtn = document.getElementById('copy-code-btn');
        if (copyBtn) {
            copyBtn.addEventListener('click', function() {
                const referralCode = document.getElementById('referral-code').textContent;
                
                // Create a temporary input element
                const tempInput = document.createElement('input');
                tempInput.value = referralCode;
                document.body.appendChild(tempInput);
                
                // Select and copy
                tempInput.select();
                document.execCommand('copy');
                
                // Remove the temporary element
                document.body.removeChild(tempInput);
                
                // Show feedback
                const originalIcon = copyBtn.innerHTML;
                copyBtn.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    copyBtn.innerHTML = originalIcon;
                }, 2000);
            });
        }
    }

    // Update the countdown timer
    function updateCountdown() {
        // Set this to your actual deadline
        const deadline = new Date();
        deadline.setDate(deadline.getDate() + 2);
        deadline.setHours(deadline.getHours() + 18);
        deadline.setMinutes(deadline.getMinutes() + 45);
        
        const now = new Date();
        const timeLeft = deadline - now;
        
        if (timeLeft <= 0) {
            // Deadline passed
            document.querySelector('.countdown-timer').innerHTML = `
                <p>Last few spots remaining!</p>
                <div class="timer-display">
                    <div class="timer-unit">
                        <span class="timer-number">0</span>
                        <span class="timer-label">Days</span>
                    </div>
                    <div class="timer-unit">
                        <span class="timer-number">0</span>
                        <span class="timer-label">Hours</span>
                    </div>
                    <div class="timer-unit">
                        <span class="timer-number">0</span>
                        <span class="timer-label">Minutes</span>
                    </div>
                </div>
            `;
            return;
        }
        
        // Calculate days, hours, minutes
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        
        // Update the DOM
        const daysEl = document.querySelector('.timer-unit:nth-child(1) .timer-number');
        const hoursEl = document.querySelector('.timer-unit:nth-child(2) .timer-number');
        const minutesEl = document.querySelector('.timer-unit:nth-child(3) .timer-number');
        
        if (daysEl && hoursEl && minutesEl) {
            daysEl.textContent = days;
            hoursEl.textContent = hours;
            minutesEl.textContent = minutes;
        }
    }

    // Enhanced submitEmailToServer function
    function enhancedSubmitEmailToServer(email) {
        console.log("Email submission started for:", email);
        
        try {
            // 1. Store the email locally
            let storedEmails = JSON.parse(localStorage.getItem('moodlyEmails') || '[]');
            storedEmails.push({
                email: email,
                timestamp: new Date().toISOString(),
                referralCode: document.getElementById('user-ref-code').textContent
            });
            localStorage.setItem('moodlyEmails', JSON.stringify(storedEmails));
            
            // 2. Show the TestFlight link
            document.getElementById('email-form-container').style.display = 'none';
            
            // 3. Set user's personal referral code
            document.getElementById('user-ref-code').textContent = generateReferralCode();
            
            // 4. Show the success container
            testflightLinkContainer.classList.add('active');
            showFormMessage('Thank you for your interest in Moodly!', 'success');
            
            // 5. Try sending to backend in background
            fetch('https://moodly-emails-default-rtdb.firebaseio.com/emails.json', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    timestamp: new Date().toISOString(),
                    referralCode: document.getElementById('user-ref-code').textContent
                })
            }).then(() => console.log("Firebase submission successful"))
              .catch(err => console.log("Firebase submission failed:", err));
                
        } catch (error) {
            console.error("Error in email submission:", error);
            // Even if there's an error, show the TestFlight link
            document.getElementById('email-form-container').style.display = 'none';
            testflightLinkContainer.classList.add('active');
            showFormMessage('Thank you for your interest in Moodly!', 'success');
        }
    }

    // Initialize all growth enhancement features
    setupCopyCodeButton();
    
    // Initialize the countdown timer
    if (document.querySelector('.countdown-timer')) {
        updateCountdown();
        // Update every minute
        setInterval(updateCountdown, 60000);
    }
    
    // Update original submitEmailToServer function if it exists
    if (typeof submitEmailToServer === 'function') {
        submitEmailToServer = enhancedSubmitEmailToServer;
    }
    
    // Set initial referral code
    const userRefCodeEl = document.getElementById('user-ref-code');
    if (userRefCodeEl) {
        userRefCodeEl.textContent = generateReferralCode();
    }

    // Mobile menu toggle functionality
    const mobileMenuButton = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Prevent scrolling when menu is open
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on a link
        const menuLinks = navLinks.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuButton.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.nav-links') && 
                !event.target.closest('.menu-toggle') && 
                navLinks.classList.contains('active')) {
                mobileMenuButton.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
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