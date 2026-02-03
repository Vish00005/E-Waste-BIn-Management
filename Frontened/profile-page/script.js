// Smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add click animations to interactive elements
document.querySelectorAll('.btn, .nav-link, .settings-item').forEach(element => {
    element.addEventListener('click', function(e) {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

// Animate stats cards on page load
window.addEventListener('load', () => {
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        }, index * 100);
    });
});

// Download QR Code functionality
document.querySelector('.btn-download')?.addEventListener('click', function() {
    alert('QR Code download functionality would be implemented here');
});

// Edit profile functionality
document.querySelector('.btn-edit')?.addEventListener('click', function() {
    alert('Edit profile functionality would be implemented here');
});

// Settings items click handlers
document.querySelectorAll('.settings-item').forEach(item => {
    item.addEventListener('click', function() {
        const settingName = this.querySelector('h3').textContent;
        console.log(`Navigating to: ${settingName}`);
    });
});

// Sign out functionality
document.querySelector('.btn-signout')?.addEventListener('click', function() {
    if (confirm('Are you sure you want to sign out?')) {
        console.log('User signed out');
        // Add sign out logic here
    }
});
