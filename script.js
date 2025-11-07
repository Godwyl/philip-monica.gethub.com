// Wedding Invitation Website JavaScript

// Guest credentials and usage tracking
const guestCredentials = {
    'LOVE2025': { used: 0, max: 3 },
    'PM0925': { used: 0, max: 3 },
    'WEDDING25': { used: 0, max: 3 },
    'CELEBRATE': { used: 0, max: 3 },
    'HAPPINESS': { used: 0, max: 3 },
    'FOREVER': { used: 0, max: 3 },
    'TOGETHER': { used: 0, max: 3 },
    'FAMILY25': { used: 0, max: 3 },
    'JOYFUL': { used: 0, max: 3 },
    'NEWBEGINNINGS': { used: 0, max: 3 },
    'LOVEISLAND': { used: 0, max: 3 },
    'UNITED2025': { used: 0, max: 3 },
    'PARTYTIME': { used: 0, max: 3 },
    'DREAMDAY': { used: 0, max: 3 },
    'BLISSFUL': { used: 0, max: 3 },
    'SOULMATES': { used: 0, max: 3 },
    'HITCHED25': { used: 0, max: 3 },
    'VOWS2025': { used: 0, max: 3 },
    'ETERNAL': { used: 0, max: 3 },
    'REDROSES7': { used: 0, max: 3 },
    'LOVEBIRDS': { used: 0, max: 3 },
    'WEDLOCK': { used: 0, max: 3 },
    'BRIDAL2025': { used: 0, max: 3 },
    'GROOM2025': { used: 0, max: 3 },
    'HONEYMOON': { used: 0, max: 3 },
    'CELEBR8': { used: 0, max: 3 },
    'TOGETHERFOREVER': { used: 0, max: 3 },
    'LOVEANDLAUGHTER': { used: 0, max: 3 },
    'FALLINGINLOVE': { used: 0, max: 3 },
    'TRUELOVE25': { used: 0, max: 3 },  
    'SOULFUL': { used: 0, max: 3 },
    'HAPPILYEVERAFTER': { used: 0, max: 3 },
    'WEDDINGBELLS': { used: 0, max: 3 },
    'ROMANCE25': { used: 0, max: 3 },
    'PARTNERSFORLIFE': { used: 0, max: 3 },
    'LOVEJOURNEY': { used: 0, max: 3 },
    'TOGETHERNESS': { used: 0, max: 3 },
    'BLESSED25': { used: 0, max: 3 },
    'UNITY2025': { used: 0, max: 3 },
    'FOREVERMORE': { used: 0, max: 3 },
    'LOVEFEST': { used: 0, max: 3 },
    'WEDDEDBLISS': { used: 0, max: 3 },
    'HONEY25': { used: 0, max: 3 },
    'SOULSUNITED': { used: 0, max: 3 },
    'TRUEHEARTS': { used: 0, max: 3 },
    'LOVESTORY': { used: 0, max: 3 },
    'EUPHORIA': { used: 0, max: 3 },


    
};

// PIN Codes
const RSVP_PIN = '123456';
const OWNER_PIN = '2025PM'; // Owner PIN for accessing invitation codes

// Cloud Storage Configuration - REPLACE WITH YOUR ACTUAL GOOGLE DRIVE LINK
const BROCHURE_CONFIG = {
    // Google Drive direct view link (replace with your actual file ID)
    googleDrive: {
        pdf: 'https://drive.google.com/file/d/14ZMPVwH2EbEBvtAGOYiQv2irrqxjdzko/view?usp=sharing' // Replace YOUR_FILE_ID_HERE with actual file ID
    }
};

class WeddingWebsite {
    constructor() {
        this.animatedLogo = document.getElementById('animatedLogo');
        this.loginPage = document.getElementById('loginPage');
        this.weddingWebsite = document.getElementById('weddingWebsite');
        this.welcomeModal = document.getElementById('welcomeModal');
        this.loginForm = document.getElementById('loginForm');
        this.togglePassword = document.getElementById('togglePassword');
        this.passwordInput = document.getElementById('password');
        this.errorMessage = document.getElementById('errorMessage');
        this.toggleCodes = document.getElementById('toggleCodes');
        this.codesList = document.getElementById('codesList');
        this.codesGrid = document.getElementById('codesGrid');
        this.welcomeClose = document.getElementById('welcomeClose');
        this.continueBtn = document.getElementById('continueBtn');
        this.guestNameSpan = document.getElementById('guestName');
        this.logoutBtn = document.getElementById('logoutBtn');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.pages = document.querySelectorAll('.page');
        this.pinForm = document.getElementById('pinForm');
        this.rsvpContent = document.getElementById('rsvpContent');
        this.pinSubmit = document.getElementById('pinSubmit');
        this.pinCode = document.getElementById('pinCode');
        this.pinError = document.getElementById('pinError');
        this.downloadBrochureBtn = document.getElementById('downloadBrochureBtn');
        
        // Mobile navigation elements
        this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
        this.mobileMenu = document.getElementById('mobileMenu');
        this.mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        this.mobileDownloadBrochureBtn = document.getElementById('mobileDownloadBrochureBtn');
        this.mobileLogoutBtn = document.getElementById('mobileLogoutBtn');
        
        // Owner access state
        this.ownerAuthenticated = false;
        
        // Track brochure download state
        this.brochureWindow = null;
        this.downloadCheckInterval = null;
        
        this.init();
    }

    init() {
        // Hide animated logo after animation
        setTimeout(() => {
            if (this.animatedLogo) {
                this.animatedLogo.style.display = 'none';
            }
        }, 3000);

        // Event Listeners
        if (this.loginForm) {
            this.loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }
        if (this.togglePassword) {
            this.togglePassword.addEventListener('click', () => this.togglePasswordVisibility());
        }
        if (this.toggleCodes) {
            this.toggleCodes.addEventListener('click', () => this.handleToggleCodes());
        }
        if (this.welcomeClose) {
            this.welcomeClose.addEventListener('click', () => this.closeWelcomeModal());
        }
        if (this.continueBtn) {
            this.continueBtn.addEventListener('click', () => this.continueToWebsite());
        }
        if (this.logoutBtn) {
            this.logoutBtn.addEventListener('click', () => this.handleLogout());
        }
        
        // Navigation
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavigation(e));
        });

        // RSVP PIN
        if (this.pinSubmit) {
            this.pinSubmit.addEventListener('click', () => this.verifyPin());
        }
        if (this.pinCode) {
            this.pinCode.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.verifyPin();
                }
            });
        }

        // Brochure download
        if (this.downloadBrochureBtn) {
            this.downloadBrochureBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.downloadBrochure();
            });
        }

        // Mobile navigation event listeners
        if (this.mobileMenuBtn) {
            this.mobileMenuBtn.addEventListener('click', () => this.toggleMobileMenu());
        }

        if (this.mobileNavLinks) {
            this.mobileNavLinks.forEach(link => {
                link.addEventListener('click', (e) => this.handleMobileNavigation(e));
            });
        }

        if (this.mobileDownloadBrochureBtn) {
            this.mobileDownloadBrochureBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.downloadBrochure();
                this.closeMobileMenu();
            });
        }

        if (this.mobileLogoutBtn) {
            this.mobileLogoutBtn.addEventListener('click', () => {
                this.handleLogout();
                this.closeMobileMenu();
            });
        }

        // Check if user is already logged in
        this.checkLoginStatus();

        // Listen for page visibility changes (when user returns from download)
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && this.brochureWindow && this.brochureWindow.closed) {
                this.returnToHomePage();
            }
        });
    }

    // Toggle mobile menu
    toggleMobileMenu() {
        if (this.mobileMenu) {
            this.mobileMenu.classList.toggle('active');
        }
    }

    // Close mobile menu
    closeMobileMenu() {
        if (this.mobileMenu) {
            this.mobileMenu.classList.remove('active');
        }
    }

    // Handle mobile navigation
    handleMobileNavigation(e) {
        e.preventDefault();
        const targetPage = e.currentTarget.getAttribute('data-page');
        
        // Update active nav links for both desktop and mobile
        this.navLinks.forEach(link => link.classList.remove('active'));
        this.mobileNavLinks.forEach(link => link.classList.remove('active'));
        
        e.currentTarget.classList.add('active');
        
        // Also update the corresponding desktop nav link
        const desktopLink = document.querySelector(`.nav-link[data-page="${targetPage}"]`);
        if (desktopLink) {
            desktopLink.classList.add('active');
        }
        
        // Show target page
        this.pages.forEach(page => page.classList.remove('active'));
        const targetPageElement = document.getElementById(`${targetPage}-page`);
        if (targetPageElement) {
            targetPageElement.classList.add('active');
        }
        
        // Close mobile menu after navigation
        this.closeMobileMenu();
        
        // Scroll to top
        window.scrollTo(0, 0);
    }

    // Toggle password visibility
    togglePasswordVisibility() {
        if (!this.passwordInput) return;
        
        const type = this.passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        this.passwordInput.setAttribute('type', type);
        
        // Update the eye icon
        if (this.togglePassword) {
            const icon = this.togglePassword.querySelector('i');
            if (type === 'password') {
                icon.className = 'fas fa-eye';
            } else {
                icon.className = 'fas fa-eye-slash';
            }
        }
    }

    // Handle toggle codes with owner authentication
    handleToggleCodes() {
        if (!this.ownerAuthenticated) {
            this.showOwnerAuthModal();
        } else {
            this.toggleCodesVisibility();
        }
    }

    // Show owner authentication modal
    showOwnerAuthModal() {
        const authModalHTML = `
            <div class="owner-auth-modal">
                <div class="owner-auth-content">
                    <button class="close-owner-auth">&times;</button>
                    <h3>Owner Access Required</h3>
                    <p>Please enter the owner PIN to view invitation codes:</p>
                    <input type="password" class="owner-pin-input" id="ownerPinInput" placeholder="Enter Owner PIN" maxlength="10">
                    <div class="owner-pin-error" id="ownerPinError">Invalid PIN. Please try again.</div>
                    <button class="owner-pin-submit" id="ownerPinSubmit">Verify PIN</button>
                    <p class="owner-help">This feature is restricted to website administrators only.</p>
                </div>
            </div>
        `;

        // Add styles for owner auth modal if not already added
        this.addOwnerAuthStyles();

        // Create and show modal
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = authModalHTML;
        document.body.appendChild(modalContainer);

        // Add event listeners
        const closeBtn = modalContainer.querySelector('.close-owner-auth');
        const modal = modalContainer.querySelector('.owner-auth-modal');
        const pinInput = modalContainer.querySelector('#ownerPinInput');
        const pinSubmit = modalContainer.querySelector('#ownerPinSubmit');
        const pinError = modalContainer.querySelector('#ownerPinError');

        const closeModal = () => {
            document.body.removeChild(modalContainer);
        };

        closeBtn.addEventListener('click', closeModal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        pinSubmit.addEventListener('click', () => {
            this.verifyOwnerPin(pinInput.value, pinError, modalContainer);
        });

        pinInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.verifyOwnerPin(pinInput.value, pinError, modalContainer);
            }
        });

        // Focus on input
        setTimeout(() => {
            pinInput.focus();
        }, 100);
    }

    // Verify owner PIN
    verifyOwnerPin(pin, errorElement, modalContainer) {
        if (pin === OWNER_PIN) {
            this.ownerAuthenticated = true;
            document.body.removeChild(modalContainer);
            this.toggleCodesVisibility();
            // Show success message
            this.showTempMessage('Owner access granted!', 'success');
        } else {
            errorElement.style.display = 'block';
            errorElement.textContent = 'Invalid owner PIN. Please try again.';
            // Clear input
            const pinInput = modalContainer.querySelector('#ownerPinInput');
            pinInput.value = '';
            pinInput.focus();
        }
    }

    // Add owner auth styles
    addOwnerAuthStyles() {
        if (document.getElementById('owner-auth-styles')) return;

        const styles = `
            .owner-auth-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 3000;
            }
            
            .owner-auth-content {
                background: white;
                padding: 30px;
                border-radius: 15px;
                max-width: 400px;
                width: 90%;
                position: relative;
                text-align: center;
            }
            
            .close-owner-auth {
                position: absolute;
                top: 15px;
                right: 15px;
                background: none;
                border: none;
                font-size: 24px;
                color: #8d6e63;
                cursor: pointer;
            }
            
            .owner-auth-content h3 {
                color: #5d4037;
                margin-bottom: 15px;
            }
            
            .owner-auth-content p {
                color: #5d4037;
                margin-bottom: 20px;
            }
            
            .owner-pin-input {
                width: 100%;
                padding: 15px;
                border: 2px solid #e0e0e0;
                border-radius: 10px;
                font-size: 16px;
                text-align: center;
                letter-spacing: 2px;
                margin: 15px 0;
            }
            
            .owner-pin-input:focus {
                outline: none;
                border-color: #8d6e63;
            }
            
            .owner-pin-error {
                color: #e53935;
                margin: 10px 0;
                display: none;
            }
            
            .owner-pin-submit {
                padding: 12px 30px;
                background: linear-gradient(135deg, #8d6e63, #5d4037);
                color: white;
                border: none;
                border-radius: 10px;
                font-size: 16px;
                cursor: pointer;
                margin: 10px 0;
                transition: transform 0.3s ease;
            }
            
            .owner-pin-submit:hover {
                transform: translateY(-2px);
            }
            
            .owner-help {
                font-size: 12px;
                color: #8d6e63;
                margin-top: 15px;
                font-style: italic;
            }

            .temp-message {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 25px;
                border-radius: 8px;
                color: white;
                font-weight: 500;
                z-index: 4000;
                animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
            }
            
            .temp-message.success {
                background: #4caf50;
            }
            
            .temp-message.error {
                background: #f44336;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            .download-instructions {
                background: #e3f2fd;
                padding: 20px;
                border-radius: 10px;
                margin: 20px 0;
                text-align: center;
                border-left: 4px solid #2196f3;
            }
            
            .download-instructions h4 {
                color: #1976d2;
                margin-bottom: 10px;
            }
            
            .download-instructions p {
                color: #1565c0;
                margin-bottom: 5px;
                font-size: 14px;
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.id = 'owner-auth-styles';
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    // Show temporary message
    showTempMessage(message, type = 'success') {
        const messageElement = document.createElement('div');
        messageElement.className = `temp-message ${type}`;
        messageElement.textContent = message;
        document.body.appendChild(messageElement);

        // Remove after 3 seconds
        setTimeout(() => {
            if (document.body.contains(messageElement)) {
                document.body.removeChild(messageElement);
            }
        }, 3000);
    }

    // Populate invitation codes (only when owner is authenticated)
    populateInvitationCodes() {
        if (!this.codesGrid) return;
        
        this.codesGrid.innerHTML = '';
        for (const code in guestCredentials) {
            const codeItem = document.createElement('div');
            codeItem.className = 'code-item';
            
            const usage = guestCredentials[code];
            const usageText = `Used: ${usage.used}/${usage.max}`;
            
            codeItem.innerHTML = `
                <div class="code-value">${code}</div>
                <div class="code-usage">${usageText}</div>
            `;
            
            this.codesGrid.appendChild(codeItem);
        }
    }

    // Handle login form submission
    handleLogin(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        
        // Validate credentials
        if (guestCredentials[password] && guestCredentials[password].used < guestCredentials[password].max) {
            // Successful login
            guestCredentials[password].used++;
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('guestName', username);
            this.showWelcomeModal(username);
        } else {
            // Failed login
            this.showError();
        }
    }

    // Show welcome modal
    showWelcomeModal(username) {
        if (this.guestNameSpan) {
            this.guestNameSpan.textContent = username;
        }
        if (this.welcomeModal) {
            this.welcomeModal.style.display = 'flex';
        }
        if (this.loginPage) {
            this.loginPage.style.display = 'none';
        }
    }

    // Close welcome modal
    closeWelcomeModal() {
        if (this.welcomeModal) {
            this.welcomeModal.style.display = 'none';
        }
        if (this.loginPage) {
            this.loginPage.style.display = 'flex';
        }
    }

    // Continue to main website
    continueToWebsite() {
        if (this.welcomeModal) {
            this.welcomeModal.style.display = 'none';
        }
        if (this.weddingWebsite) {
            this.weddingWebsite.style.display = 'block';
        }
    }

    // Show error message
    showError() {
        if (this.errorMessage) {
            this.errorMessage.style.display = 'block';
            setTimeout(() => {
                this.errorMessage.style.display = 'none';
            }, 5000);
        }
    }

    // Toggle codes visibility (only when owner is authenticated)
    toggleCodesVisibility() {
        if (!this.codesList || !this.toggleCodes) return;
        
        // Only allow toggling if owner is authenticated
        if (!this.ownerAuthenticated) {
            this.showOwnerAuthModal();
            return;
        }
        
        const isVisible = this.codesList.style.display === 'block';
        this.codesList.style.display = isVisible ? 'none' : 'block';
        this.toggleCodes.textContent = isVisible ? 'Show Available Invitation Codes' : 'Hide Invitation Codes';
        
        // Populate codes when showing
        if (!isVisible) {
            this.populateInvitationCodes();
        }
    }

    // Handle navigation
    handleNavigation(e) {
        e.preventDefault();
        const targetPage = e.currentTarget.getAttribute('data-page');
        
        // Update active nav link
        this.navLinks.forEach(link => link.classList.remove('active'));
        e.currentTarget.classList.add('active');
        
        // Show target page
        this.pages.forEach(page => page.classList.remove('active'));
        const targetPageElement = document.getElementById(`${targetPage}-page`);
        if (targetPageElement) {
            targetPageElement.classList.add('active');
        }
    }

    // Handle logout
    handleLogout() {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('guestName');
        // Reset owner authentication on logout
        this.ownerAuthenticated = false;
        
        if (this.weddingWebsite) {
            this.weddingWebsite.style.display = 'none';
        }
        if (this.loginPage) {
            this.loginPage.style.display = 'flex';
        }
        
        // Reset form
        if (this.loginForm) {
            this.loginForm.reset();
        }
        
        // Hide codes list if visible
        if (this.codesList) {
            this.codesList.style.display = 'none';
        }

        // Clear any download intervals
        if (this.downloadCheckInterval) {
            clearInterval(this.downloadCheckInterval);
            this.downloadCheckInterval = null;
        }
    }

    // Verify RSVP PIN
    verifyPin() {
        if (!this.pinCode || !this.pinForm || !this.rsvpContent || !this.pinError) return;
        
        if (this.pinCode.value === RSVP_PIN) {
            this.pinForm.style.display = 'none';
            this.rsvpContent.style.display = 'block';
            this.pinError.style.display = 'none';
        } else {
            this.pinError.style.display = 'block';
            this.pinCode.value = '';
        }
    }

    // Download brochure - ENHANCED VERSION with return to home page
    downloadBrochure() {
        // Show loading state briefly
        const downloadBtns = [this.downloadBrochureBtn, this.mobileDownloadBrochureBtn];
        downloadBtns.forEach(btn => {
            if (btn) {
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Opening...';
                btn.classList.add('loading');
                btn.disabled = true;
            }
        });

        // Show download instructions
        this.showDownloadInstructions();

        const googleDriveUrl = BROCHURE_CONFIG.googleDrive.pdf;
        
        if (googleDriveUrl && googleDriveUrl.includes('drive.google.com')) {
            // Open Google Drive in a new tab/window
            this.brochureWindow = window.open(googleDriveUrl, '_blank', 'width=1000,height=700');
            
            // Show success message
            this.showTempMessage('Opening Google Drive... You will return here automatically after download.', 'success');
            
            // Start checking if the download window is closed
            this.startDownloadWindowCheck();
            
        } else {
            // Show error if URL is not configured
            this.showTempMessage('Brochure link not configured', 'error');
            
            // Reset button state
            setTimeout(() => {
                this.resetDownloadButton();
            }, 2000);
        }
    }

    // Show download instructions
    showDownloadInstructions() {
        // Remove any existing instructions
        const existingInstructions = document.querySelector('.download-instructions');
        if (existingInstructions) {
            existingInstructions.remove();
        }
    
        const instructionsHTML = `
            <div class="download-instructions">
                <h4><i class="fas fa-info-circle"></i> Download Instructions</h4>
                <p>1. The brochure will open in a new window</p>
                <p>2. Click the download button in Google Drive (⬇️ icon)</p>
                <p>3. Close the Google Drive tab when done</p>
                <p>4. You will automatically return to the wedding website</p>
            </div>
        `;

        // Insert instructions before the download button
        if (this.downloadBrochureBtn && this.downloadBrochureBtn.parentNode) {
            this.downloadBrochureBtn.parentNode.insertAdjacentHTML('beforebegin', instructionsHTML);
        }
    }

    // Start checking if download window is closed
    startDownloadWindowCheck() {
        if (this.downloadCheckInterval) {
            clearInterval(this.downloadCheckInterval);
        }

        this.downloadCheckInterval = setInterval(() => {
            if (this.brochureWindow && this.brochureWindow.closed) {
                // Window was closed, return to home page
                this.returnToHomePage();
                clearInterval(this.downloadCheckInterval);
                this.downloadCheckInterval = null;
            }
        }, 1000); // Check every second

        // Auto-return after 2 minutes as fallback
        setTimeout(() => {
            if (this.downloadCheckInterval) {
                this.returnToHomePage();
                clearInterval(this.downloadCheckInterval);
                this.downloadCheckInterval = null;
            }
        }, 120000); // 2 minutes
    }

    // Return to home page after download
    returnToHomePage() {
        // Reset download button
        this.resetDownloadButton();

        // Remove download instructions
        const instructions = document.querySelector('.download-instructions');
        if (instructions) {
            instructions.remove();
        }

        // Navigate to home page
        this.navigateToHomePage();

        // Show welcome back message
        this.showTempMessage('Welcome back! Hope you enjoyed the brochure.', 'success');
    }

    // Navigate to home page
    navigateToHomePage() {
        // Update active nav link
        this.navLinks.forEach(link => link.classList.remove('active'));
        const homeLink = document.querySelector('.nav-link[data-page="home"]');
        if (homeLink) {
            homeLink.classList.add('active');
        }

        // Update mobile nav link
        this.mobileNavLinks.forEach(link => link.classList.remove('active'));
        const mobileHomeLink = document.querySelector('.mobile-nav-link[data-page="home"]');
        if (mobileHomeLink) {
            mobileHomeLink.classList.add('active');
        }

        // Show home page
        this.pages.forEach(page => page.classList.remove('active'));
        const homePage = document.getElementById('home-page');
        if (homePage) {
            homePage.classList.add('active');
        }

        // Scroll to top
        window.scrollTo(0, 0);
    }

    // Reset download button state
    resetDownloadButton() {
        const downloadBtns = [this.downloadBrochureBtn, this.mobileDownloadBrochureBtn];
        downloadBtns.forEach(btn => {
            if (btn) {
                btn.innerHTML = '<i class="fas fa-download"></i> Download Brochure';
                btn.classList.remove('loading');
                btn.disabled = false;
            }
        });
    }

    // Check if user is already logged in
    checkLoginStatus() {
        if (localStorage.getItem('loggedIn') === 'true') {
            const savedName = localStorage.getItem('guestName') || 'Guest';
            this.showWelcomeModal(savedName);
            setTimeout(() => {
                this.continueToWebsite();
            }, 1000);
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    new WeddingWebsite();
});