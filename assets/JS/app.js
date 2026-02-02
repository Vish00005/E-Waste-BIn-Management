function switchCategory(type) {
    const box = document.getElementById('detail-box');
    const title = document.getElementById('item-title');
    const value = document.getElementById('item-value');
    
    if(type === 'laptops') {
        box.style.background = "linear-gradient(135deg, #8b5cf6, #ec4899)"; // Matches SS 315
        title.innerText = "Laptops";
        value.innerText = "₹200 - ₹2000";
    } else {
        box.style.background = "linear-gradient(135deg, #3b82f6, #06b6d4)";
        title.innerText = "Smartphones";
        value.innerText = "₹50 - ₹500";
    }
}
const itemData = {
    smartphones: {
        title: "Smartphones",
        desc: "Old phones, feature phones, and mobile devices",
        value: "₹50 - ₹500",
        impact: "Recovers rare earth metals and reduces toxic waste",
        icon: "fa-mobile-button",
        grad: "grad-blue"
    },
    batteries: {
        title: "Batteries",
        desc: "Lithium-ion, alkaline, and rechargeable batteries",
        value: "₹10 - ₹100",
        impact: "Prevents soil and water contamination",
        icon: "fa-battery-half",
        grad: "grad-orange"
    },
    laptops: {
        title: "Laptops",
        desc: "Notebooks, tablets, and portable computers",
        value: "₹200 - ₹2000",
        impact: "Recovers precious metals like gold and silver",
        icon: "fa-laptop",
        grad: "grad-purple"
    },
    cables: {
        title: "Cables",
        desc: "USB cables, charger cables, and wiring",
        value: "₹5 - ₹50",
        impact: "Copper and plastic recovery",
        icon: "fa-link",
        grad: "grad-teal"
    },
    chargers: {
        title: "Chargers",
        desc: "Phone chargers, laptop adapters, and power banks",
        value: "₹20 - ₹150",
        impact: "Reduces electronic component waste",
        icon: "fa-plug",
        grad: "grad-red"
    },
    audio: {
        title: "Audio Devices",
        desc: "Headphones, earbuds, and speakers",
        value: "₹30 - ₹300",
        impact: "Specialized component recovery",
        icon: "fa-headphones",
        grad: "grad-indigo"
    },
    wearables: {
        title: "Wearables",
        desc: "Smartwatches, fitness trackers, and health bands",
        value: "₹50 - ₹300",
        impact: "Recovers specialized sensors and micro-batteries",
        icon: "fa-clock",
        grad: "grad-pink"
    },
    gaming: {
        title: "Gaming Devices",
        desc: "Controllers, consoles, and handheld gaming units",
        value: "₹100 - ₹1000",
        impact: "Complex circuit board and plastic housing recovery",
        icon: "fa-gamepad",
        grad: "grad-green"
    }
};

function updateItem(type, element) {
    const cards = document.querySelectorAll('.cat-card');
    cards.forEach(card => card.classList.remove('active'));
    element.classList.add('active');

    const data = itemData[type];
    if (data) {
        document.getElementById('item-title').innerText = data.title;
        document.getElementById('item-desc').innerText = data.desc;
        document.getElementById('item-value').innerText = data.value;
        document.getElementById('item-impact').innerText = data.impact;
        document.getElementById('main-icon').innerHTML = `<i class="fa-solid ${data.icon}"></i>`;

        const box = document.getElementById('detail-box');
        // Reset and apply the new gradient class
        box.className = `detail-display-box ${data.grad}`;
    }
}