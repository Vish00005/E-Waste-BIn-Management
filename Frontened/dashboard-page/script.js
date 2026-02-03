document.addEventListener('DOMContentLoaded', function () {
    // Current date and time
    const now = new Date();

    // Chart.js Configuration
    const ctx = document.getElementById('activityChart').getContext('2d');

    // Gradient for the chart
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(16, 185, 129, 0.2)');
    gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');

    const activityChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Items Recycled',
                data: [12, 19, 15, 25, 22, 30],
                borderColor: '#10b981',
                backgroundColor: gradient,
                borderWidth: 3,
                pointBackgroundColor: '#ffffff',
                pointBorderColor: '#10b981',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#1e293b',
                    bodyColor: '#1e293b',
                    borderColor: '#e2e8f0',
                    borderWidth: 1,
                    padding: 10,
                    boxPadding: 4,
                    usePointStyle: true,
                    callbacks: {
                        labelTextColor: function () {
                            return '#64748b';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#f1f5f9',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#94a3b8',
                        padding: 10
                    }
                },
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        color: '#94a3b8',
                        padding: 10
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });

    // Animate stats numbers
    const stats = document.querySelectorAll('.stat-value');
    stats.forEach(stat => {
        const value = parseInt(stat.innerText.replace(/[^0-9]/g, ''));
        if (value) {
            let start = 0;
            const duration = 2000;
            const step = Math.ceil(value / (duration / 16));

            const timer = setInterval(() => {
                start += step;
                if (start >= value) {
                    clearInterval(timer);
                    start = value;
                }
                // Format with existing non-numeric characters if needed
                if (stat.innerText.includes('₹')) {
                    stat.innerText = '₹' + start.toLocaleString();
                } else {
                    stat.innerText = start.toLocaleString();
                }
            }, 16);
        }
    });

    // Active link highlighting
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Button interactions
    const buttons = document.querySelectorAll('.btn, .action-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function () {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });
    });

    // Profile button redirect
    document.querySelector('.btn-profile').addEventListener('click', () => {
        window.location.href = '../profile-page/index.html';
    });

    // Filter button active state
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Simulate chart update
            const newData = Array.from({ length: 6 }, () => Math.floor(Math.random() * 30) + 10);
            activityChart.data.datasets[0].data = newData;
            activityChart.update();
        });
    });
});
