// Initialize the map
let map;
let userMarker;
let pickupMarker;
let destinationMarker;

function initMap() {
    // Create the map centered on a default location (you can change this)
    map = L.map('map').setView([12.9716, 77.5946], 13); // Default: Bangalore

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Get user's current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                map.setView([latitude, longitude], 15);
                
                // Add user marker
                userMarker = L.marker([latitude, longitude], {
                    title: 'Your Location',
                    draggable: false
                }).addTo(map);
            },
            (error) => {
                console.error('Error getting location:', error);
            }
        );
    }

    // Setup click handlers for pickup and destination
    map.on('click', handleMapClick);
}

function handleMapClick(e) {
    const { lat, lng } = e.latlng;
    
    // If pickup isn't set, set pickup
    if (!pickupMarker) {
        pickupMarker = L.marker([lat, lng], {
            title: 'Pickup Location',
            draggable: true
        }).addTo(map);
        document.getElementById('pickup').value = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
        return;
    }
    
    // If destination isn't set, set destination
    if (!destinationMarker) {
        destinationMarker = L.marker([lat, lng], {
            title: 'Destination',
            draggable: true
        }).addTo(map);
        document.getElementById('destination').value = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
        
        // Draw route between pickup and destination
        drawRoute();
    }
}

function drawRoute() {
    if (pickupMarker && destinationMarker) {
        const pickup = pickupMarker.getLatLng();
        const destination = destinationMarker.getLatLng();
        
        // Draw a simple line for now
        // In a real app, you'd use a routing service
        L.polyline([
            [pickup.lat, pickup.lng],
            [destination.lat, destination.lng]
        ], {
            color: '#3498db',
            weight: 3,
            opacity: 0.7
        }).addTo(map);
    }
}

// Initialize map when the page loads
window.addEventListener('load', initMap);
