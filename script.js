document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Interactive hover effects for buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Handle Watch Live button click
    const watchLiveButton = document.querySelector('.cta-button');
    if (watchLiveButton) {
        watchLiveButton.addEventListener('click', function(e) {
            e.preventDefault();
            showLoading();
            setTimeout(() => {
                window.location.href = 'live.html';
            }, 2000);
        });
    }

    // Handle navigation link clicks
    document.querySelectorAll('a[href="live.html"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showLoading();
            setTimeout(() => {
                window.location.href = 'live.html';
            }, 2000);
        });
    });

    function showLoading() {
        // Create loading bar if it doesn't exist
        let loadingBar = document.querySelector('.loading-bar');
        if (!loadingBar) {
            loadingBar = document.createElement('div');
            loadingBar.className = 'loading-bar';
            document.body.appendChild(loadingBar);
        }
        
        // Trigger loading animation
        document.body.classList.add('loading');
        
        // Remove loading class after animation
        setTimeout(() => {
            document.body.classList.remove('loading');
        }, 2000);
    }

    // Handle mobile watch button click
    const mobileBtn = document.querySelector('.watch-btn.mobile.main-btn');
    const serverOptions = document.querySelector('.server-options');
    
    if (mobileBtn) {
        mobileBtn.addEventListener('click', function() {
            serverOptions.style.display = serverOptions.style.display === 'none' ? 'flex' : 'none';
        });
    }

    // Handle server button clicks
    document.querySelectorAll('.server-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const url = this.dataset.url;
            const isInline = this.dataset.inline === 'true';
            
            if (isInline) {
                // Create an iframe for inline viewing
                const container = document.querySelector('.trophy-container');
                const existingFrame = document.querySelector('.stream-frame');
                
                if (!existingFrame) {
                    const iframe = document.createElement('iframe');
                    iframe.src = url;
                    iframe.className = 'stream-frame';
                    iframe.style.width = '100%';
                    iframe.style.height = '500px';
                    iframe.style.border = 'none';
                    iframe.style.borderRadius = '12px';
                    iframe.style.marginTop = '2rem';
                    container.appendChild(iframe);
                }
            } else {
                // Redirect to external URL
                window.location.href = url;
            }
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const heroContent = document.querySelector('.hero-content');
        const scrolled = window.pageYOffset;
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    });

    // Add background particles
    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'background-particles';
        document.body.appendChild(particlesContainer);

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random starting position
            const startX = Math.random() * window.innerWidth;
            const startY = Math.random() * window.innerHeight;
            
            // Random movement
            const moveX = (Math.random() - 0.5) * 200;
            const moveY = (Math.random() - 0.5) * 200;
            
            particle.style.left = `${startX}px`;
            particle.style.top = `${startY}px`;
            particle.style.setProperty('--moveX', `${moveX}px`);
            particle.style.setProperty('--moveY', `${moveY}px`);
            
            // Random delay
            particle.style.animationDelay = `${Math.random() * 20}s`;
            
            particlesContainer.appendChild(particle);
        }
    }

    createParticles();

    // Recreate particles on window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            const oldParticles = document.querySelector('.background-particles');
            if (oldParticles) {
                oldParticles.remove();
            }
            createParticles();
        }, 250);
    });

    // Add background animations for the live page
    if (document.querySelector('.cricket-background')) {
        const background = document.getElementById('cricketBackground');
        
        // Function to create and add neon balls
        function addNeonBall() {
            const element = document.createElement('div');
            element.className = 'floating-element neon-ball';
            
            // Random starting position
            const startX = Math.random() * window.innerWidth;
            const startY = window.innerHeight + 100;
            
            element.style.left = `${startX}px`;
            element.style.top = `${startY}px`;
            
            // Random size variation
            const size = 10 + Math.random() * 15;
            element.style.width = `${size}px`;
            element.style.height = `${size}px`;
            
            // Random animation duration and delay
            const duration = 8 + Math.random() * 7;
            element.style.animation = `float ${duration}s linear infinite, colorChange ${4 + Math.random() * 2}s infinite alternate`;
            
            background.appendChild(element);
            
            // Remove element after animation
            setTimeout(() => {
                element.remove();
            }, duration * 1000);
        }

        // Add new neon balls periodically
        setInterval(addNeonBall, 1000);
        
        // Add initial neon balls
        for (let i = 0; i < 15; i++) {
            addNeonBall();
        }
    }
});