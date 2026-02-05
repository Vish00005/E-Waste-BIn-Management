// Rewards data
const rewardsData = [
    { category: 'Discount', title: '10% Off Electronics', points: 500, available: true },
    { category: 'Product', title: 'Eco-Friendly Water Bottle', points: 800, available: true },
    { category: 'Impact', title: 'Plant a Tree', points: 300, available: true },
    { category: 'Voucher', title: '₹200 Shopping Voucher', points: 1500, available: false },
    { category: 'Product', title: 'Bamboo Phone Case', points: 1000, available: true },
    { category: 'Special', title: 'Premium Membership', points: 2000, available: false }
];

// Achievements data
const achievementsData = [
    { icon: '🌱', title: 'First Steps', description: 'Recycle your first item', unlocked: true },
    { icon: '♻️', title: 'Eco Warrior', description: 'Recycle 25 items', unlocked: true },
    { icon: '🏆', title: 'Century Club', description: 'Recycle 100 items', progress: '47/100' },
    { icon: '🔥', title: 'On Fire', description: '30-day streak', progress: '12/30' },
    { icon: '🌍', title: 'Planet Saver', description: 'Save 100kg CO2', progress: '23.5/100' },
    { icon: '⭐', title: 'Top 100', description: 'Reach top 100 on leaderboard', progress: 'Locked' }
];

// Leaderboard data
const leaderboardData = [
    { rank: 1, name: 'Alex Smith', avatar: 'AS', level: 15, points: 3450 },
    { rank: 2, name: 'Maria Johnson', avatar: 'MJ', level: 14, points: 3120 },
    { rank: 3, name: 'David Wilson', avatar: 'DW', level: 13, points: 2890 },
    { rank: 4, name: 'Sarah Brown', avatar: 'SB', level: 12, points: 2650 },
    { rank: 5, name: 'John Davis', avatar: 'JD', level: 11, points: 2430 },
    { rank: 156, name: 'You', avatar: 'YO', level: 8, points: 1250, isCurrentUser: true }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    initializeTabs();
    renderRewards();
    renderAchievements();
    renderLeaderboard();
    animateStats();
    animatePoints();
});

// Tab functionality
function initializeTabs() {
    const tabs = document.querySelectorAll('.tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;
            
            // Remove active class from all tabs and contents
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            document.getElementById(`${targetTab}-content`).classList.add('active');
        });
    });
}

// Render rewards
function renderRewards() {
    const rewardsGrid = document.querySelector('.rewards-grid');
    
    rewardsGrid.innerHTML = rewardsData.map(reward => `
        <div class="reward-card" data-category="${reward.category.toLowerCase()}">
            <div class="reward-badge">
                <span>⭐</span>
                <span>${reward.points}</span>
            </div>
            <div class="reward-content">
                <span class="reward-category">${reward.category}</span>
                <h3 class="reward-title">${reward.title}</h3>
                <button class="reward-btn ${reward.available ? '' : 'disabled'}" 
                        onclick="redeemReward('${reward.title}', ${reward.points}, ${reward.available})">
                    ${reward.available ? 'Redeem Now' : 'Coming Soon'}
                </button>
            </div>
        </div>
    `).join('');
    
    // Add stagger animation
    const cards = document.querySelectorAll('.reward-card');
    cards.forEach((card, index) => {
        card.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s backwards`;
    });
}

// Render achievements
function renderAchievements() {
    const achievementsGrid = document.querySelector('.achievements-grid');
    
    achievementsGrid.innerHTML = achievementsData.map(achievement => `
        <div class="achievement-card ${achievement.unlocked ? 'unlocked' : ''}">
            <div class="achievement-icon">${achievement.icon}</div>
            <h3>${achievement.title}</h3>
            <p>${achievement.description}</p>
            ${achievement.unlocked 
                ? '<div class="achievement-status">Unlocked</div>' 
                : `<div class="achievement-progress">${achievement.progress}</div>`
            }
        </div>
    `).join('');
}

// Render leaderboard
function renderLeaderboard() {
    const leaderboardContainer = document.querySelector('.leaderboard-container');
    
    const topUsers = leaderboardData.slice(0, 5);
    const currentUser = leaderboardData.find(user => user.isCurrentUser);
    
    leaderboardContainer.innerHTML = `
        ${topUsers.map(user => {
            let rankClass = '';
            if (user.rank === 1) rankClass = 'gold';
            else if (user.rank === 2) rankClass = 'silver';
            else if (user.rank === 3) rankClass = 'bronze';
            
            return `
                <div class="leaderboard-item rank-${user.rank}">
                    <div class="rank-badge ${rankClass}">${user.rank}</div>
                    <div class="user-info">
                        <div class="user-avatar">${user.avatar}</div>
                        <div class="user-details">
                            <span class="user-name">${user.name}</span>
                            <span class="user-stats">Level ${user.level} • ${user.points.toLocaleString()} pts</span>
                        </div>
                    </div>
                    <div class="user-score">${user.points.toLocaleString()}</div>
                </div>
            `;
        }).join('')}
        <div class="leaderboard-divider">...</div>
        <div class="leaderboard-item current-user">
            <div class="rank-badge">${currentUser.rank}</div>
            <div class="user-info">
                <div class="user-avatar">${currentUser.avatar}</div>
                <div class="user-details">
                    <span class="user-name">${currentUser.name}</span>
                    <span class="user-stats">Level ${currentUser.level} • ${currentUser.points.toLocaleString()} pts</span>
                </div>
            </div>
            <div class="user-score">${currentUser.points.toLocaleString()}</div>
        </div>
    `;
}

// Redeem reward function
function redeemReward(title, points, available) {
    if (!available) return;
    
    const currentPoints = parseInt(document.getElementById('totalPoints').textContent.replace(',', ''));
    
    if (currentPoints >= points) {
        // Create custom modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;
        
        modal.innerHTML = `
            <div style="
                background: white;
                padding: 2.5rem;
                border-radius: 1rem;
                max-width: 400px;
                text-align: center;
                animation: slideDown 0.3s ease;
            ">
                <div style="font-size: 4rem; margin-bottom: 1rem;">🎉</div>
                <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; color: #111827;">
                    Reward Redeemed!
                </h2>
                <p style="color: #6b7280; margin-bottom: 1.5rem;">
                    You've successfully redeemed <strong>${title}</strong> for ${points} points!
                </p>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    width: 100%;
                    padding: 0.875rem;
                    border: none;
                    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                    color: white;
                    font-size: 1rem;
                    font-weight: 600;
                    border-radius: 0.5rem;
                    cursor: pointer;
                ">
                    Awesome!
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Update points
        const newPoints = currentPoints - points;
        animatePointsChange(currentPoints, newPoints);
        
    } else {
        // Not enough points modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;
        
        modal.innerHTML = `
            <div style="
                background: white;
                padding: 2.5rem;
                border-radius: 1rem;
                max-width: 400px;
                text-align: center;
                animation: slideDown 0.3s ease;
            ">
                <div style="font-size: 4rem; margin-bottom: 1rem;">😢</div>
                <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; color: #111827;">
                    Not Enough Points
                </h2>
                <p style="color: #6b7280; margin-bottom: 1.5rem;">
                    You need ${points - currentPoints} more points to redeem this reward. Keep recycling!
                </p>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    width: 100%;
                    padding: 0.875rem;
                    border: none;
                    background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
                    color: white;
                    font-size: 1rem;
                    font-weight: 600;
                    border-radius: 0.5rem;
                    cursor: pointer;
                ">
                    Got it!
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
}

// Animate stats on scroll
function animateStats() {
    const statCards = document.querySelectorAll('.stat-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease';
            }
        });
    }, { threshold: 0.1 });
    
    statCards.forEach(card => observer.observe(card));
}

// Animate points counter
function animatePoints() {
    const pointsElement = document.getElementById('totalPoints');
    const targetPoints = document.getElementById('totalPoints').innerText;
    const duration = 2000;
    const steps = 60;
    const increment = targetPoints / steps;
    let currentPoints = 0;
    
    const timer = setInterval(() => {
        currentPoints += increment;
        if (currentPoints >= targetPoints) {
            currentPoints = targetPoints;
            clearInterval(timer);
        }
        pointsElement.textContent = Math.floor(currentPoints).toLocaleString();
    }, duration / steps);
}

// Animate points change
function animatePointsChange(from, to) {
    const pointsElement = document.getElementById('totalPoints');
    const duration = 1000;
    const steps = 30;
    const increment = (to - from) / steps;
    let currentPoints = from;
    
    const timer = setInterval(() => {
        currentPoints += increment;
        if ((increment > 0 && currentPoints >= to) || (increment < 0 && currentPoints <= to)) {
            currentPoints = to;
            clearInterval(timer);
        }
        pointsElement.textContent = Math.floor(currentPoints).toLocaleString();
    }, duration / steps);
}

// Add hover effects to reward cards
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const rewardCards = document.querySelectorAll('.reward-card');
        
        rewardCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }, 500);
});

// Add particle effect on reward redeem
function createParticles(x, y) {
    const colors = ['#10b981', '#f59e0b', '#3b82f6', '#ef4444', '#8b5cf6'];
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 10001;
            left: ${x}px;
            top: ${y}px;
        `;
        
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / 20;
        const velocity = 100 + Math.random() * 100;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let posX = x;
        let posY = y;
        let opacity = 1;
        
        const animate = () => {
            posX += vx * 0.016;
            posY += vy * 0.016 + 2;
            opacity -= 0.02;
            
            particle.style.left = posX + 'px';
            particle.style.top = posY + 'px';
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        
        animate();
    }
}

// Add smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
