function switchForm(formType) {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    if (formType === 'signup') {
        loginForm.classList.remove('active');
        signupForm.classList.add('active');
    } else {
        signupForm.classList.remove('active');
        loginForm.classList.add('active');
    }
}

// ===== Password Toggle =====
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const button = input.parentElement.querySelector('.toggle-password');
    
    if (input.type === 'password') {
        input.type = 'text';
        button.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2.5 10C2.5 10 5 4.16667 10 4.16667C15 4.16667 17.5 10 17.5 10C17.5 10 15 15.8333 10 15.8333C5 15.8333 2.5 10 2.5 10Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="3" y1="3" x2="17" y2="17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
        `;
    } else {
        input.type = 'password';
        button.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2.5 10C2.5 10 5 4.16667 10 4.16667C15 4.16667 17.5 10 17.5 10C17.5 10 15 15.8333 10 15.8333C5 15.8333 2.5 10 2.5 10Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
    }
}

// ===== Password Strength Checker =====
function checkPasswordStrength(password) {
    let strength = 0;
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');
    
    if (!password) {
        strengthFill.style.width = '0%';
        strengthText.textContent = 'Password strength';
        strengthText.style.color = '#6b7280';
        return;
    }
    
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 12.5;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 12.5;
    
    strengthFill.style.width = strength + '%';
    
    if (strength <= 25) {
        strengthFill.style.background = '#ef4444';
        strengthText.textContent = 'Weak password';
        strengthText.style.color = '#ef4444';
    } else if (strength <= 50) {
        strengthFill.style.background = '#f59e0b';
        strengthText.textContent = 'Fair password';
        strengthText.style.color = '#f59e0b';
    } else if (strength <= 75) {
        strengthFill.style.background = '#3b82f6';
        strengthText.textContent = 'Good password';
        strengthText.style.color = '#3b82f6';
    } else {
        strengthFill.style.background = '#10b981';
        strengthText.textContent = 'Strong password';
        strengthText.style.color = '#10b981';
    }
}

// ===== Event Listeners =====
document.addEventListener('DOMContentLoaded', function() {
    const signupPassword = document.getElementById('signup-password');
    if (signupPassword) {
        signupPassword.addEventListener('input', function() {
            checkPasswordStrength(this.value);
        });
    }

    // const loginForm = document.querySelector('#loginForm form');
    // if (loginForm) {
    //     loginForm.addEventListener('submit', function(e) {
    //         e.preventDefault();
    //         const submitBtn = this.querySelector('.btn-primary');
    //         submitBtn.classList.add('loading');
    //         submitBtn.disabled = true;
            
    //         setTimeout(() => {
    //             submitBtn.classList.remove('loading');
    //             submitBtn.disabled = false;
    //             alert('Login successful! (This is a demo)');
    //         }, 2000);
    //     });
    // }

    // const signupFormEl = document.querySelector('#signupForm form');
    // if (signupFormEl) {
    //     signupFormEl.addEventListener('submit', function(e) {
    //         e.preventDefault();
    //         const submitBtn = this.querySelector('.btn-primary');
    //         submitBtn.classList.add('loading');
    //         submitBtn.disabled = true;
            
    //         setTimeout(() => {
    //             submitBtn.classList.remove('loading');
    //             submitBtn.disabled = false;
    //             alert('Account created successfully! (This is a demo)');
    //             switchForm('login');
    //         }, 2000);
    //     });
    // }

    const socialButtons = document.querySelectorAll('.btn-social');
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const provider = this.textContent.trim();
            alert(`${provider} login coming soon! (This is a demo)`);
        });
    });

    const forgotPasswordLink = document.querySelector('.forgot-password');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Password reset functionality coming soon! (This is a demo)');
        });
    }
});