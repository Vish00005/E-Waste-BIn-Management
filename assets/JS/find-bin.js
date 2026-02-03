// Configuration & Global Variables
let map;
let userMarker, userCircle;

// Real-world coordinates for your bins (Replace with your actual locations)
const binsData = [
    {
        id: 1,
        name: "DDIT Campus Hub",
        address: "College Road, Nadiad",
        lat: 22.6825, 
        lng: 72.8805,
        distance: 0.4,
        time: "5 min walk",
        rating: 4.9,
        fill: 15, // Low fill (Green)
        accepted: ["phone", "laptop", "cable", "charger"]
    },
    {
        id: 2,
        name: "Santram Mandir Collection Point",
        address: "Near Santram Temple Plaza",
        lat: 22.6915, 
        lng: 72.8590,
        distance: 1.2,
        time: "15 min walk",
        rating: 4.7,
        fill: 65, // Moderate fill (Orange)
        accepted: ["phone", "battery", "cable", "charger"]
    },
    {
        id: 3,
        name: "Nadiad Railway Station Bin",
        address: "Main Exit Gate, Station Road",
        lat: 22.6885, 
        lng: 72.8710,
        distance: 0.9,
        time: "12 min walk",
        rating: 4.4,
        fill: 88, // High fill (Red)
        accepted: ["phone", "battery", "charger"]
    },
    {
        id: 4,
        name: "Pij Road Smart Drop",
        address: "Near Vaniawad Circle",
        lat: 22.6980, 
        lng: 72.8520,
        distance: 2.3,
        time: "30 min walk",
        rating: 4.2,
        fill: 30, // Low fill (Green)
        accepted: ["battery", "cable", "laptop"]
    },
    {
        id: 5,
        name: "Mission Road Recycling",
        address: "Opposite Methodist Hospital",
        lat: 22.7050, 
        lng: 72.8680,
        distance: 1.8,
        time: "22 min walk",
        rating: 4.5,
        fill: 52, // Moderate fill (Orange)
        accepted: ["phone", "battery", "laptop", "cable", "charger"]
    }
];

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    setupFilters();
    renderBins('charger'); // Default view
});

function initMap() {
    const mapDiv = document.getElementById('map');
    if (!mapDiv) return;

    // FIX 3: Centered on Nadiad [22.6948, 72.8650] instead of New York
    map = L.map('map').setView([22.6948, 72.8650], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    locateUser();
    setTimeout(() => map.invalidateSize(), 500);
}

// Handle the category filtering
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const selectedType = this.innerText.toLowerCase().trim();
            renderBins(selectedType);
        });
    });
}

function renderBins(filter = 'charger') {
    const binListContainer = document.querySelector('.bin-list');
    const filteredBins = binsData.filter(bin => bin.accepted.includes(filter));

    binListContainer.innerHTML = `<h3>Nearby Bins (${filteredBins.length} found)</h3>`;

    filteredBins.forEach((bin) => {
        const fillClass = bin.fill > 70 ? 'orange' : 'green';

        const binCard = `
            <div class="bin-card" id="bin-card-${bin.id}">
                <div class="bin-info-header" onclick="toggleBin(${bin.id})">
                    <div>
                        <h4>${bin.name}</h4>
                        <p class="address">${bin.address}</p>
                    </div>
                    <i class="fa-solid fa-chevron-down toggle-icon"></i>
                </div>
                <div class="bin-stats">
                    <span><i class="fa-solid fa-location-arrow"></i> ${bin.distance} km</span>
                    <span><i class="fa-solid fa-person-walking"></i> ${bin.time}</span>
                    <span><i class="fa-solid fa-star"></i> ${bin.rating}</span>
                </div>
                <div class="bin-details-expand">
                    <div class="fill-meter-container">
                        <div class="meter-label"><span>Fill Level</span><span>${bin.fill}%</span></div>
                        <div class="meter-bar"><div class="fill ${fillClass}" style="width: ${bin.fill}%;"></div></div>
                    </div>
                    <div class="accepted-icons">
                        ${bin.accepted.map(type => getIcon(type)).join('')}
                    </div>
                    <button class="btn-directions" onclick="focusBin(${bin.lat}, ${bin.lng}, '${bin.name}')">
                        <i class="fa-solid fa-paper-plane"></i> View on Map
                    </button>
                </div>
            </div>
        `;
        binListContainer.innerHTML += binCard;
    });

    // FIX 1: Call this function to actually draw the markers!
    updateMapMarkers(filteredBins);
}

// FIX 2: Add this helper so the icons don't break the code
function getIcon(type) {
    const icons = {
        phone: '<i class="fa-solid fa-mobile-screen"></i>',
        battery: '<i class="fa-solid fa-battery-half"></i>',
        laptop: '<i class="fa-solid fa-laptop"></i>',
        cable: '<i class="fa-solid fa-link"></i>',
        charger: '<i class="fa-solid fa-plug"></i>'
    };
    return icons[type] || '';
}
function toggleBin(binId) {
    const card = document.getElementById(`bin-card-${binId}`);
    const icon = card.querySelector('.toggle-icon');

    // Optional: Close all other cards first for a clean "Accordion" feel
    // document.querySelectorAll('.bin-card').forEach(c => {
    //    if(c !== card) c.classList.remove('expanded');
    // });

    const isExpanding = card.classList.toggle('expanded');

    // Update Icon
    if (isExpanding) {
        icon.classList.replace('fa-solid-chevron-down', 'fa-solid-chevron-up');
    } else {
        icon.classList.replace('fa-solid-chevron-up', 'fa-solid-chevron-down');
    }
}
// Clean old markers and add new ones
let activeMarkers = [];
function updateMapMarkers(bins) {
    if (!map) return;

    // Remove existing bin markers
    activeMarkers.forEach(m => map.removeLayer(m));
    activeMarkers = [];

    bins.forEach(bin => {
        const marker = L.marker([bin.lat, bin.lng]).addTo(map)
            .bindPopup(`<b>${bin.name}</b><br>Fill Level: ${bin.fill}%`);
        activeMarkers.push(marker);
    });
}

// Browser Geolocation
function locateUser() {
    if (!map) {
        console.error("Map is not initialized yet!");
        return;
    }

    console.log("Requesting user location...");
    
    // setView: true automatically moves the map to you
    map.locate({setView: true, maxZoom: 15, enableHighAccuracy: true});

    map.on('locationfound', (e) => {
        console.log("Location found at: ", e.latlng);
        
        if (userMarker) map.removeLayer(userMarker);
        
        userMarker = L.circleMarker(e.latlng, {
            radius: 8,
            fillColor: "#3498db",
            color: "#fff",
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
        }).addTo(map).bindPopup("You are here").openPopup();
        
        // After finding location, you should re-render bins to show correct distances
        renderBins(document.querySelector('.filter-btn.active')?.innerText.toLowerCase().trim() || 'charger');

        
    });

    map.on('locationerror', (e) => {
        console.error("Location Error: " + e.message);
        alert("Could not find your location. Defaulting to Nadiad City Center.");
    });
}


document.addEventListener('DOMContentLoaded', () => {
    // ... your existing initMap() call ...

    const locateBtn = document.getElementById('locate-btn');
    if (locateBtn) {
        locateBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevents page refresh if it's inside a form
            locateUser();
        });
    }
});
// Helper to center map on a specific bin
function focusBin(lat, lng, name) {
    map.setView([lat, lng], 16);
    // Find the marker for this bin and open its popup
    activeMarkers.forEach(m => {
        if(m.getLatLng().lat === lat) m.openPopup();
    });
}

