// Initialize visitor counter
let visitorCount = localStorage.getItem('visitorCount') || 0;

// Function to generate a random increment between 1-5
function getRandomIncrement() {
    return Math.floor(Math.random() * 5) + 1;
}

// Function to update visitor count
function updateVisitorCount() {
    // Increment count
    visitorCount = parseInt(visitorCount) + getRandomIncrement();
    
    // Save to localStorage
    localStorage.setItem('visitorCount', visitorCount);
    
    // Update display
    const visitorCountElement = document.querySelector('.visitor-count');
    if (visitorCountElement) {
        visitorCountElement.textContent = visitorCount.toLocaleString();
    }
}

// Update count every 30 seconds
setInterval(updateVisitorCount, 30000);

// Array of notification messages
const notificationMessages = [
  {
    title: "New Feature Added",
    message: "Multi-language support coming soon!",
    icon: "fas fa-globe"
  },
  {
    title: "Performance Update",
    message: "Enhanced streaming quality and reduced buffering",
    icon: "fas fa-bolt"  
  },
  {
    title: "Server Upgrade",
    message: "New servers added for faster streaming",
    icon: "fas fa-server"
  },
  {
    title: "Security Enhancement",
    message: "Advanced encryption protocols implemented",
    icon: "fas fa-shield-alt"
  },
  {
    title: "UI Improvement",
    message: "Redesigned player controls for better experience",
    icon: "fas fa-paint-brush"
  },
  {
    title: "New Channels",
    message: "Added more sports channels to our lineup",
    icon: "fas fa-tv"
  },
  {
    title: "Mobile App Update",
    message: "Download our latest mobile app version",
    icon: "fas fa-mobile-alt"
  },
  {
    title: "Bug Fix",
    message: "Fixed various streaming issues",
    icon: "fas fa-bug"
  },
  {
    title: "New Tournament",
    message: "IPL 2025 streaming schedule available",
    icon: "fas fa-trophy"
  },
  {
    title: "Community Growth",
    message: "Over 1 million active users!",
    icon: "fas fa-users"
  }
];

// Store notifications
let storedNotifications = [];
const MAX_STORED_NOTIFICATIONS = 10;

// Function to create and show notification
function showSiteNotification() {
  const notification = notificationMessages[Math.floor(Math.random() * notificationMessages.length)];
  
  // Create notification element
  const notifEl = document.createElement('div');
  notifEl.className = 'site-notification';
  notifEl.innerHTML = `
    <div class="site-notification-content">
      <i class="${notification.icon}"></i>
      <div class="notification-text">
        <h4>${notification.title}</h4>
        <p>${notification.message}</p>
      </div>
    </div>
  `;
  
  document.body.appendChild(notifEl);
  
  // Store notification
  storeNotification(notification);
  
  // Remove notification after animation
  setTimeout(() => {
    notifEl.classList.add('fade-out');
    setTimeout(() => {
      notifEl.remove();
    }, 500);
  }, 5000);

  // Schedule next notification
  setTimeout(showSiteNotification, Math.random() * (30000 - 10000) + 10000); // Random between 10-30 seconds
}

// Function to store notifications
function storeNotification(notification) {
  const timestamp = new Date().toLocaleTimeString();
  storedNotifications.unshift({ ...notification, timestamp });
  
  // Keep only last 10 notifications
  if (storedNotifications.length > MAX_STORED_NOTIFICATIONS) {
    storedNotifications.pop();
  }
  
  // Update notifications container if it exists
  updateNotificationsContainer();
}

// Function to update notifications container
function updateNotificationsContainer() {
  const container = document.querySelector('.updates-container');
  if (container) {
    const notificationsList = container.querySelector('.notifications-list') || document.createElement('div');
    notificationsList.className = 'notifications-list';
    notificationsList.innerHTML = storedNotifications.map(notification => `
      <div class="notification-item" data-aos="fade-up">
        <div class="notification-header">
          <i class="${notification.icon}"></i>
          <h3>${notification.title}</h3>
          <span class="notification-time">${notification.timestamp}</span>
        </div>
        <p>${notification.message}</p>
      </div>
    `).join('');
    
    if (!container.querySelector('.notifications-list')) {
      container.appendChild(notificationsList);
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
    // Array of example names
    const viewerNames = [
        'Saqib', 'Danish', 'Ujval', 'Kumar', 'Owais', 
        'Jasria', 'Alia', 'Anjali', 'Karshna',
        'Rahul', 'Priya', 'Arjun', 'Zara', 'Farah',
        'Mohammed', 'Ravi', 'Neha', 'Kavya', 'Arun',
        'Ishaan', 'Diya', 'Vihaan', 'Anaya', 'Yash'
    ];

    // Function to generate a random name
    function getRandomName() {
        return viewerNames[Math.floor(Math.random() * viewerNames.length)];
    }

    // Function to get random time between 10-20 seconds
    function getRandomInterval() {
        return Math.floor(Math.random() * (20000 - 10000 + 1) + 10000); // Random between 10000ms and 20000ms
    }

    // Function to create and show viewer notification
    function showViewerNotification() {
        const name = getRandomName();
        const notifications = [
            `${name} joined the live stream!`,
            `Welcome ${name} to the stream!`,
            `${name} is now watching!`,
            `New viewer: ${name}`,
            `${name} has joined the match!`
        ];
        const notification = notifications[Math.floor(Math.random() * notifications.length)];
        
        // Create notification element
        const notifEl = document.createElement('div');
        notifEl.className = 'viewer-notification';
        notifEl.innerHTML = `
            <div class="viewer-notification-content">
                <i class="fas fa-user-plus"></i>
                <span>${notification}</span>
            </div>
        `;
        
        document.body.appendChild(notifEl);
        
        // Remove notification after animation
        setTimeout(() => {
            notifEl.classList.add('fade-out');
            setTimeout(() => {
                notifEl.remove();
            }, 500);
        }, 3000);

        // Schedule next notification with random interval
        setTimeout(showViewerNotification, getRandomInterval());
    }

    // Start showing notifications with initial random interval
    setTimeout(showViewerNotification, getRandomInterval());

    // Update the visitor count with actual increment
    function updateVisitorCount() {
        // Generate random increment between 1-5
        const increment = Math.floor(Math.random() * 5) + 1;
        
        // Update count
        visitorCount = parseInt(visitorCount) + increment;
        
        // Save to localStorage
        localStorage.setItem('visitorCount', visitorCount);
        
        // Update display
        const visitorCountElement = document.querySelector('.visitor-count');
        if (visitorCountElement) {
            visitorCountElement.textContent = visitorCount.toLocaleString();
            
            // Add animation class
            visitorCountElement.classList.add('count-update');
            setTimeout(() => {
                visitorCountElement.classList.remove('count-update');
            }, 300);
        }
    }

    updateVisitorCount();

    // Get stored profile data
    const profileData = JSON.parse(localStorage.getItem('userProfile') || '{}');
    
    // Update website title if profile exists
    if (profileData.fullName || profileData.profilePic) {
        const navLogo = document.querySelector('.nav-logo');
        if (navLogo) {
            // Create profile container if it doesn't exist
            let profileContainer = navLogo.querySelector('.profile-info');
            if (!profileContainer) {
                profileContainer = document.createElement('div');
                profileContainer.className = 'profile-info';
                navLogo.appendChild(profileContainer);
            }

            // Update profile HTML
            profileContainer.innerHTML = `
                ${profileData.profilePic ? `
                    <img src="${profileData.profilePic}" alt="Profile" class="nav-profile-pic">
                ` : ''}
                ${profileData.fullName ? `
                    <small class="nav-profile-name">${profileData.fullName}</small>
                ` : ''}
            `;
        }
    }

    // Add this check at the beginning to conditionally enable menu functionality
    const isLivePage = window.location.pathname.includes('live.html');
    const menuBtn = document.querySelector('.menu-btn');
    
    if (!isLivePage && menuBtn) {
        // Only initialize menu functionality if not on live page
        menuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            document.querySelector('.menu-overlay').classList.toggle('active');
        });

        // Handle menu item clicks
        document.querySelectorAll('.menu-items button').forEach(button => {
            button.addEventListener('click', function() {
                const type = this.getAttribute('data-type');
                showContent(type);
            });
        });

        // Handle back buttons
        document.querySelectorAll('.back-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelector('.content-overlay').style.display = 'none';
                menuBtn.classList.remove('active');
                document.querySelector('.menu-overlay').classList.remove('active');
            });
        });
    }

    // Remove update notification after 3 seconds
    setTimeout(() => {
        const notification = document.querySelector('.update-notification');
        if (notification) {
            notification.addEventListener('animationend', function(e) {
                if (e.animationName === 'slideUp') {
                    notification.remove();
                }
            });
        }
    }, 3000);

    // Splash screen handler
    const splashScreen = document.querySelector('.splash-screen');
    
    // Hide splash screen after 2 seconds
    setTimeout(() => {
        splashScreen.classList.add('fade-out');
        // Remove splash screen from DOM after animation
        setTimeout(() => {
            splashScreen.remove();
        }, 500);
    }, 2000);

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

    // Handle LIVE NOW button click and server options
    const liveNowBtn = document.querySelector('.watch-btn.live-now');
    const liveServerOptions = document.querySelector('.server-options');
    
    if (liveNowBtn) {
        liveNowBtn.addEventListener('click', function() {
            liveServerOptions.style.display = liveServerOptions.style.display === 'none' ? 'flex' : 'none';
            
            // Scroll to server options smoothly if they're being shown
            if (liveServerOptions.style.display === 'flex') {
                liveServerOptions.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }

    // Handle server button clicks
    document.querySelectorAll('.server-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if(this.classList.contains('server-1')) {
                // Direct redirect to Server 1
                window.open('https://livecrichdofficial.pages.dev/Tnt1', '_blank');
            } else if(this.classList.contains('server-2')) {
                // Show Server 2 in container box
                const matchBox = document.createElement('div');
                matchBox.className = 'match-box';
                matchBox.innerHTML = `
                    <button class="close-button"></button>
                    <div class="loading-message">Loading Server 2 stream... Please wait</div>
                    <div class="progress-bar">
                        <div class="progress-fill"></div>
                    </div>
                    <div class="match-frame-container" style="display: none;">
                        <iframe 
                            src="" 
                            class="match-frame" 
                            frameborder="0"
                            allowfullscreen="true"
                            webkitallowfullscreen="true" 
                            mozallowfullscreen="true"
                            allow="autoplay; fullscreen; encrypted-media; picture-in-picture; presentation"
                            sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-presentation"
                            scrolling="no"
                        ></iframe>
                    </div>
                `;

                document.querySelector('.trophy-container').appendChild(matchBox);
                
                // Scroll to the box container smoothly
                matchBox.scrollIntoView({ behavior: 'smooth', block: 'center' });

                const loadingMessage = matchBox.querySelector('.loading-message');
                const progressBar = matchBox.querySelector('.progress-fill');
                const frameContainer = matchBox.querySelector('.match-frame-container');
                const iframe = frameContainer.querySelector('iframe');
                const closeButton = matchBox.querySelector('.close-button');

                // Close button handler
                closeButton.addEventListener('click', function() {
                    matchBox.remove();
                });

                // Simulate loading with progress bar
                let progress = 0;
                const interval = setInterval(() => {
                    progress += 1;
                    progressBar.style.width = `${progress}%`;
                    
                    if (progress >= 100) {
                        clearInterval(interval);
                        loadingMessage.style.display = 'none';
                        frameContainer.style.display = 'block';
                        
                        // Set up iframe with the new link
                        const cacheBuster = new Date().getTime();
                        iframe.src = `https://cxh.pages.dev/p1/?id=Tsports&cb=${cacheBuster}`;
                    }
                }, 30);
                
                liveServerOptions.style.display = 'none';
            }
        });
    });

    // Handle KashCric Live button click
    const kashcricBtn = document.querySelector('.watch-btn.kashcric');
    const kashcricOptions = document.querySelector('.kashcric-options');
    
    if (kashcricBtn) {
        kashcricBtn.addEventListener('click', function() {
            // Directly show Hindi stream instead of options
            const kashcricBox = document.querySelector('.kashcric-box');
            const loadingMessage = kashcricBox.querySelector('.loading-message');
            const progressBar = kashcricBox.querySelector('.progress-fill');
            const frameContainer = kashcricBox.querySelector('.kashcric-frame-container');
            const iframe = frameContainer.querySelector('iframe');
            const closeButton = kashcricBox.querySelector('.close-button');

            // Show the box and loading state
            kashcricBox.style.display = 'block';
            loadingMessage.style.display = 'block';
            progressBar.style.width = '0%';
            frameContainer.style.display = 'none';
            
            // Scroll to the box container smoothly
            kashcricBox.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Close button handler
            closeButton.addEventListener('click', function() {
                kashcricBox.style.display = 'none';
                iframe.src = '';
                frameContainer.style.display = 'none';
                loadingMessage.style.display = 'none';
                progressBar.style.width = '0%';
            });

            // Simulate loading with progress bar
            let progress = 0;
            const interval = setInterval(() => {
                progress += 1;
                progressBar.style.width = `${progress}%`;
                
                if (progress >= 100) {
                    clearInterval(interval);
                    loadingMessage.style.display = 'none';
                    frameContainer.style.display = 'block';
                    
                    // Set up iframe with necessary attributes
                    iframe.setAttribute('sandbox', 'allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-presentation');
                    iframe.setAttribute('allow', 'autoplay; fullscreen; encrypted-media; picture-in-picture; presentation');
                    
                    // Add cache-busting parameter
                    const cacheBuster = new Date().getTime();
                    iframe.src = `https://ifram.embedxt.site/iframe/frame.php?cb=${cacheBuster}`;
                }
            }, 30);
        });
    }

    // Handle KashCric stream button clicks
    document.querySelectorAll('.kashcric-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            console.log('KashCric stream button clicked');
        });
    });

    // Handle PC/iOS watch button click
    const pciosBtn = document.querySelector('.watch-btn.pc-ios');
    if (pciosBtn) {
        pciosBtn.addEventListener('click', function() {
            const pciosBox = document.querySelector('.pc-ios-box');
            const loadingMessage = pciosBox.querySelector('.loading-message');
            const progressBar = pciosBox.querySelector('.progress-fill');
            const frameContainer = pciosBox.querySelector('.pc-ios-frame-container');
            const iframe = frameContainer.querySelector('iframe');
            const closeButton = pciosBox.querySelector('.close-button');

            // Show the box and loading state
            pciosBox.style.display = 'block';
            loadingMessage.style.display = 'block';
            progressBar.style.width = '0%';
            frameContainer.style.display = 'none';
            
            // Scroll to the box container smoothly
            pciosBox.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Close button handler
            closeButton.addEventListener('click', function() {
                pciosBox.style.display = 'none';
                iframe.src = '';
                frameContainer.style.display = 'none';
                loadingMessage.style.display = 'none';
                progressBar.style.width = '0%';
            });

            // Simulate loading with progress bar
            let progress = 0;
            const interval = setInterval(() => {
                progress += 1;
                progressBar.style.width = `${progress}%`;
                
                if (progress >= 100) {
                    clearInterval(interval);
                    loadingMessage.style.display = 'none';
                    frameContainer.style.display = 'block';
                    
                    // Set up iframe with necessary attributes
                    iframe.setAttribute('sandbox', 'allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-presentation');
                    iframe.setAttribute('allow', 'autoplay; fullscreen; encrypted-media; picture-in-picture; presentation');
                    
                    // Add cache-busting parameter
                    const cacheBuster = new Date().getTime();
                    iframe.src = `https://denverisalive.github.io/SportsLovers/Sports18HD.html?cb=${cacheBuster}`;
                }
            }, 30);
        });
    }

    // Handle JioHotstar button click
    const hotstarBtn = document.querySelector('.watch-btn.hotstar');
    if (hotstarBtn) {
        hotstarBtn.addEventListener('click', function() {
            const popup = document.createElement('div');
            popup.className = 'hotstar-popup';
            popup.innerHTML = `
                <button class="popup-close">×</button>
                <div class="hotstar-popup-content">
                    <img src="hot (1).webp" alt="Jio Hotstar" class="hotstar-logo">
                    <div class="stream-time">
                        <i class="fas fa-clock"></i>
                        Stream starts at 7:30 PM
                    </div>
                    <button class="watch-now-btn">
                        <i class="fas fa-play-circle"></i>
                        Watch Now
                    </button>
                </div>
            `;

            const overlay = document.createElement('div');
            overlay.className = 'popup-overlay';

            document.body.appendChild(overlay);
            document.body.appendChild(popup);

            overlay.style.display = 'block';
            popup.style.display = 'block';

            // Handle close button click
            const closeBtn = popup.querySelector('.popup-close');
            closeBtn.addEventListener('click', function() {
                popup.remove();
                overlay.remove();
            });

            // Handle overlay click
            overlay.addEventListener('click', function() {
                popup.remove();
                overlay.remove();
            });

            // Handle Watch Now button click
            const watchNowBtn = popup.querySelector('.watch-now-btn');
            watchNowBtn.addEventListener('click', function() {
                popup.remove();
                overlay.remove();

                const hotstarBox = document.querySelector('.hotstar-box');
                const loadingMessage = hotstarBox.querySelector('.loading-message');
                const progressBar = hotstarBox.querySelector('.progress-fill');
                const frameContainer = hotstarBox.querySelector('.hotstar-frame-container');
                const iframe = frameContainer.querySelector('iframe');
                const closeButton = hotstarBox.querySelector('.close-button');

                // Show the box and loading state
                hotstarBox.style.display = 'block';
                loadingMessage.style.display = 'block';
                progressBar.style.width = '0%';
                frameContainer.style.display = 'none';
                
                // Scroll to the box container smoothly
                hotstarBox.scrollIntoView({ behavior: 'smooth', block: 'center' });

                // Close button handler
                closeButton.addEventListener('click', function() {
                    hotstarBox.style.display = 'none';
                    iframe.src = '';
                    frameContainer.style.display = 'none';
                    loadingMessage.style.display = 'none';
                    progressBar.style.width = '0%';
                });

                // Simulate loading with progress bar
                let progress = 0;
                const interval = setInterval(() => {
                    progress += 1;
                    progressBar.style.width = `${progress}%`;
                    
                    if (progress >= 100) {
                        clearInterval(interval);
                        loadingMessage.style.display = 'none';
                        frameContainer.style.display = 'block';
                        
                        // Set up iframe with necessary attributes
                        iframe.setAttribute('sandbox', 'allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-presentation');
                        iframe.setAttribute('allow', 'autoplay; fullscreen; encrypted-media; picture-in-picture; presentation');
                        
                        // Add cache-busting parameter
                        const cacheBuster = new Date().getTime();
                        iframe.src = `https://cxh.pages.dev/play/?id=Hindi&cb=${cacheBuster}`;
                    }
                }, 30);
            });
        });
    }

    // Handle Telegram text animation
    const telegramText = document.querySelector('.telegram-text');
    if (telegramText) {
        telegramText.addEventListener('animationend', function() {
            this.remove();
        });
    }

    document.querySelector('.watch-live-btn').addEventListener('click', function() {
        const loadingCircle = this.querySelector('.loading-circle');
        const btnText = this.textContent;
        
        // Show loading animation
        loadingCircle.style.display = 'block';
        this.style.paddingRight = '40px';
        this.disabled = true;
        
        // Simulate loading
        setTimeout(() => {
            // Hide loading animation
            loadingCircle.style.display = 'none';
            this.style.paddingRight = '2rem';
            this.disabled = false;
            
            // Redirect to live page
            window.location.href = 'live.html';
        }, 1500);
    });

    // Profile submit and remove handlers
    const profileForm = document.querySelector('.profile-form');
    if (profileForm) {
        // Add remove profile button if it doesn't exist
        let removeProfileBtn = profileForm.querySelector('.remove-profile-btn');
        if (!removeProfileBtn) {
            removeProfileBtn = document.createElement('button');
            removeProfileBtn.className = 'remove-profile-btn';
            removeProfileBtn.type = 'button';
            removeProfileBtn.innerHTML = '<i class="fas fa-user-times"></i> Remove Profile';
            profileForm.appendChild(removeProfileBtn);
        }

        // Remove profile handler
        removeProfileBtn.addEventListener('click', function() {
            // Clear localStorage
            localStorage.removeItem('userProfile');
            
            // Reset form
            profileForm.reset();
            
            // Reset profile picture
            const profilePicture = document.querySelector('.profile-picture-container img');
            const profilePlaceholder = document.querySelector('.profile-picture-container .placeholder');
            if (profilePicture && profilePlaceholder) {
                profilePicture.src = '';
                profilePicture.style.display = 'none';
                profilePlaceholder.style.display = 'flex';
            }
            
            // Remove profile info from nav
            const profileInfo = document.querySelector('.profile-info');
            if (profileInfo) {
                profileInfo.remove();
            }
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.textContent = 'Profile removed successfully!';
            profileForm.appendChild(successMsg);
            
            setTimeout(() => {
                successMsg.remove();
            }, 3000);
        });

        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = {
                fullName: this.fullName.value,
                email: this.email.value,
                profilePic: profilePicture.src || ''
            };
            localStorage.setItem('userProfile', JSON.stringify(formData));
            
            // Update website title
            const navLogo = document.querySelector('.nav-logo');
            if (navLogo) {
                let profileContainer = navLogo.querySelector('.profile-info');
                if (!profileContainer) {
                    profileContainer = document.createElement('div');
                    profileContainer.className = 'profile-info';
                    navLogo.appendChild(profileContainer);
                }

                // Update profile HTML
                profileContainer.innerHTML = `
                    ${formData.profilePic ? `
                        <img src="${formData.profilePic}" alt="Profile" class="nav-profile-pic">
                    ` : ''}
                    ${formData.fullName ? `
                        <small class="nav-profile-name">${formData.fullName}</small>
                    ` : ''}
                `;
            }
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.textContent = 'Profile updated successfully!';
            this.appendChild(successMsg);
            
            setTimeout(() => {
                successMsg.remove();
            }, 3000);
        });
    }

    // Profile picture preview handler
    const profilePictureInput = document.querySelector('.profile-picture-input');
    const profilePicture = document.querySelector('.profile-picture-container img');
    const profilePlaceholder = document.querySelector('.profile-picture-container .placeholder');

    if (profilePictureInput) {
        // Load existing profile picture if any
        const profileData = JSON.parse(localStorage.getItem('userProfile') || '{}');
        if (profileData.profilePic) {
            profilePicture.src = profileData.profilePic;
            profilePicture.style.display = 'block';
            profilePlaceholder.style.display = 'none';
        }

        profilePictureInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    profilePicture.src = e.target.result;
                    profilePicture.style.display = 'block';
                    profilePlaceholder.style.display = 'none';
                    
                    // Store the image data
                    const profileData = JSON.parse(localStorage.getItem('userProfile') || '{}');
                    profileData.profilePic = e.target.result;
                    localStorage.setItem('userProfile', JSON.stringify(profileData));
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Match schedule data structure
    const matchSchedule = {
        '2025-03-22': {
            team1: {
                code: 'KKR',
                logo: 'download (8).jpeg'
            },
            team2: {
                code: 'RCB',
                logo: 'download (9).jpeg'
            },
            time: '7:30 PM IST',
            venue: 'Eden Gardens, Kolkata'
        },
        '2025-03-23': {
            team1: {
                code: 'SRH',
                logo: 'download (4).jpeg'
            },
            team2: {
                code: 'RR',
                logo: 'medium-gk1yaseret12tkg59-ipl-rajasthan-royals-paper-fineart-wall-original-imaff2pgmfey4kwf.webp'
            },
            time: '3:30 PM IST',
            venue: 'Rajiv Gandhi International Cricket Stadium, Hyderabad'
        },
        '2025-03-23': {
            team1: {
                code: 'CSK',
                logo: 'images (2).jpeg'
            },
            team2: {
                code: 'MI',
                logo: 'download (7).jpeg'
            },
            time: '7:30 PM IST',
            venue: 'M.A. Chidambaram Stadium, Chennai'
        },
        '2025-03-24': {
            team1: {
                code: 'DC',
                logo: 'download (5).jpeg'
            },
            team2: {
                code: 'LSG',
                logo: 'images (3).jpeg'
            },
            time: '7:30 PM IST',
            venue: 'Dr. Y.S. Rajasekhara Reddy ACA-VDCA Cricket Stadium, Visakhapatnam'
        },
        '2025-03-25': {
            team1: {
                code: 'GT',
                logo: 'Cricketdata-IPL-Flag-Gujarat-Titans-2.jpg'
            },
            team2: {
                code: 'PBKS',
                logo: 'download (6).jpeg'
            },
            time: '7:30 PM IST',
            venue: 'Narendra Modi Stadium, Ahmedabad'
        },
        '2025-03-26': {
            team1: {
                code: 'RR',
                logo: 'medium-gk1yaseret12tkg59-ipl-rajasthan-royals-paper-fineart-wall-original-imaff2pgmfey4kwf.webp'
            },
            team2: {
                code: 'KKR',
                logo: 'download (8).jpeg'
            },
            time: '7:30 PM IST',
            venue: 'Barsapara Cricket Stadium, Guwahati'
        },
        '2025-03-27': {
            team1: {
                code: 'SRH',
                logo: 'download (4).jpeg'
            },
            team2: {
                code: 'LSG',
                logo: 'images (3).jpeg'
            },
            time: '7:30 PM IST',
            venue: 'Rajiv Gandhi International Cricket Stadium, Hyderabad'
        },
        // Add all matches through May 25th following the same pattern
    };

    // Function to update today's match display
    function updateTodayMatch() {
        // Get current date in YYYY-MM-DD format
        const today = new Date();
        const dateStr = today.toISOString().split('T')[0];
        
        // Get match for today or next available match
        let match = matchSchedule[dateStr];
        let displayDate = today;

        if (!match) {
            // If no match today, find next available match
            const availableDates = Object.keys(matchSchedule).sort();
            const nextMatchDate = availableDates.find(date => date > dateStr);
            if (nextMatchDate) {
                match = matchSchedule[nextMatchDate];
                displayDate = new Date(nextMatchDate);
            } else {
                // If no future matches, show first match of the schedule
                match = matchSchedule[availableDates[0]];
                displayDate = new Date(availableDates[0]);
            }
        }

        if (match) {
            const todaysMatchElement = document.querySelector('.todays-match');
            if (todaysMatchElement) {
                // Update team logos and names
                document.querySelector('.team1').textContent = match.team1.code;
                document.querySelector('.team2').textContent = match.team2.code;
                document.querySelector('.team-container:first-child img').src = match.team1.logo;
                document.querySelector('.team-container:last-child img').src = match.team2.logo;
                
                // Update match info
                document.querySelector('.match-time').textContent = match.time;
                document.querySelector('.match-venue').textContent = match.venue;
                document.querySelector('.match-date').textContent = displayDate.toLocaleDateString();
            }
        }
    }

    // Initialize match updates
    if (document.querySelector('.todays-match')) {
        updateTodayMatch();
        
        // Set up automatic updates at midnight
        function scheduleNextUpdate() {
            const now = new Date();
            const tomorrow = new Date(now);
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(0, 0, 0, 0);
            
            const timeUntilMidnight = tomorrow - now;
            
            setTimeout(() => {
                updateTodayMatch();
                scheduleNextUpdate(); // Schedule next update
            }, timeUntilMidnight);
        }
        
        scheduleNextUpdate();
    }

    // Schedule handling
    const scheduleBtn = document.querySelector('.schedule-only');
    const scheduleMenu = document.querySelector('.schedule-menu');
    
    if (scheduleBtn) {
        scheduleBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            scheduleMenu.classList.toggle('active');
        });
    }

    // Login state
    const loginState = JSON.parse(localStorage.getItem('loginState') || '{}');
    
    // Login handling
    const menuItems = document.querySelector('.menu-items');
    if (menuItems) {
        // Update or add login button to menu items if not already present
        let loginButton = menuItems.querySelector('[data-type="login"]')?.parentElement;
        if (!loginButton) {
            loginButton = document.createElement('li');
            loginButton.innerHTML = `
                <button data-type="login">
                    <i class="fas fa-sign-in-alt"></i>
                    ${loginState.isLoggedIn ? 'Profile' : 'Login'}
                </button>
            `;
            menuItems.insertBefore(loginButton, menuItems.firstChild);
        }
    }

    // Show content function
    function showContent(type) {
        const contentOverlay = document.querySelector('.content-overlay');
        const containers = contentOverlay.querySelectorAll('.content-container');
        
        // Hide all containers first
        containers.forEach(container => container.style.display = 'none');
        
        // Show the overlay
        contentOverlay.style.display = 'block';
        
        // Show the appropriate container
        switch(type) {
            case 'updates':
                contentOverlay.querySelector('.updates-container').style.display = 'block';
                break;
            case 'about':
                contentOverlay.querySelector('.about-container').style.display = 'block';
                break;
            case 'developer':
                contentOverlay.querySelector('.developer-container').style.display = 'block';
                break;
            case 'profile':
                contentOverlay.querySelector('.profile-container').style.display = 'block';
                break;
            case 'share':
                contentOverlay.querySelector('.share-container').style.display = 'block';
                break;
            case 'login':
                contentOverlay.querySelector('.login-container').style.display = 'block';
                break;
        }
    }

    // Handle menu item clicks
    document.querySelectorAll('.menu-items button').forEach(button => {
        button.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            showContent(type);
        });
    });

    // Handle login button click
    document.querySelector('.menu-items [data-type="login"]')?.addEventListener('click', function() {
        const loginContainer = document.querySelector('.login-container');
        if (loginContainer) {
            document.querySelector('.content-overlay').style.display = 'block';
            loginContainer.style.display = 'block';
        }
    });

    // Ensure content containers exist
    function ensureContentContainers() {
        const contentOverlay = document.querySelector('.content-overlay');
        if (!contentOverlay.querySelector('.login-container')) {
            const loginContainer = document.createElement('div');
            loginContainer.className = 'login-container content-container';
            loginContainer.innerHTML = `
                <button class="back-btn">
                    <i class="fas fa-times"></i>
                </button>
                <h2 class="content-title">Login</h2>
                <div class="login-options">
                    <button class="login-btn google">
                        <i class="fab fa-google"></i>
                        Continue with Google
                    </button>
                    <button class="login-btn email">
                        <i class="fas fa-envelope"></i>
                        Continue with Email
                    </button>
                </div>
                <form class="login-form">
                    <div class="form-group">
                        <label for="loginEmail">Email</label>
                        <input type="email" id="loginEmail" required>
                    </div>
                    <div class="form-group">
                        <label for="loginPassword">Password</label>
                        <input type="password" id="loginPassword" required>
                    </div>
                    <button type="submit" class="submit-btn">Login</button>
                </form>
            `;
            contentOverlay.appendChild(loginContainer);

            // Add event listeners for the new container
            loginContainer.querySelector('.back-btn').addEventListener('click', function() {
                contentOverlay.style.display = 'none';
                document.querySelector('.menu-btn').classList.remove('active');
                document.querySelector('.menu-overlay').classList.remove('active');
            });

            loginContainer.querySelector('.login-btn.google').addEventListener('click', function() {
                handleGoogleLogin();
            });

            loginContainer.querySelector('.login-btn.email').addEventListener('click', function() {
                loginContainer.querySelector('.login-form').classList.add('active');
            });

            loginContainer.querySelector('.login-form').addEventListener('submit', function(e) {
                e.preventDefault();
                handleEmailLogin(this);
            });
        }
    }

    // Call this function when the page loads
    ensureContentContainers();

    function handleGoogleLogin() {
        const loginState = {
            isLoggedIn: true,
            provider: 'google',
            email: 'user@gmail.com',
            isPremium: true
        };
        localStorage.setItem('loginState', JSON.stringify(loginState));
        showLoginSuccess();
        updateProfileInfo();
    }

    function handleEmailLogin(form) {
        const loginState = {
            isLoggedIn: true,
            provider: 'email',
            email: form.loginEmail.value,
            isPremium: true
        };
        localStorage.setItem('loginState', JSON.stringify(loginState));
        showLoginSuccess();
        updateProfileInfo();
    }

    function showLoginSuccess() {
        const successMsg = document.createElement('div');
        successMsg.className = 'login-success';
        successMsg.innerHTML = `
            <i class="fas fa-check-circle"></i>
            Login successful! You are now a premium user
            <span class="premium-icon">👑</span>
        `;
        document.querySelector('.login-container').appendChild(successMsg);
        
        setTimeout(() => {
            document.querySelector('.content-overlay').style.display = 'none';
            document.querySelector('.menu-btn').classList.remove('active');
            document.querySelector('.menu-overlay').classList.remove('active');
        }, 2000);
    }

    function updateProfileInfo() {
        const loginState = JSON.parse(localStorage.getItem('loginState') || '{}');
        const profileData = JSON.parse(localStorage.getItem('userProfile') || '{}');
        
        if (loginState.isLoggedIn) {
            const navLogo = document.querySelector('.nav-logo');
            if (navLogo) {
                let profileContainer = navLogo.querySelector('.profile-info');
                if (!profileContainer) {
                    profileContainer = document.createElement('div');
                    profileContainer.className = 'profile-info';
                    navLogo.appendChild(profileContainer);
                }

                profileContainer.innerHTML = `
                    ${profileData.profilePic ? `
                        <img src="${profileData.profilePic}" alt="Profile" class="nav-profile-pic">
                    ` : ''}
                    <small class="nav-profile-name">
                        ${profileData.fullName || 'User'}
                        <span class="premium-icon">👑</span>
                    </small>
                `;
            }
        }
    }

    // Initialize profile info if logged in
    if (loginState.isLoggedIn) {
        updateProfileInfo();
    }

    // Start notifications after page load
    setTimeout(showSiteNotification, 5000); // Start first notification after 5 seconds
});