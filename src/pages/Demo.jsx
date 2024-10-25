import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Optional: Custom icon for the marker
const locationIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // URL of the custom icon
    iconSize: [32, 32], // Size of the icon
    iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
    popupAnchor: [0, -32] // Point from which the popup should open relative to the iconAnchor
});

const Demo = () => {
    useEffect(() => {
        // Create the map
        const map = L.map('map').setView([30.756075, 76.821314], 13); // Center on Chandigarh

        // Add a tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        }).addTo(map);

        // Add a marker at the initial location
        let marker = L.marker([30.756075, 76.821314], { icon: locationIcon }).addTo(map);

        // Event listener for map click
        map.on('click', (e) => {
            const lat = e.latlng.lat;
            const lng = e.latlng.lng;
            console.log(`Latitude: ${lat}, Longitude: ${lng}`);

            // Move the marker to the clicked location
            if (marker) marker.setLatLng([lat, lng]);
            else marker = L.marker([lat, lng], { icon: locationIcon }).addTo(map);
        });

        // Cleanup on component unmount
        return () => {
            map.off();
            map.remove();
        };
    }, []);

    return (
        <div>
            <h2>Map Demo</h2>
            <div id="map" style={{ height: '400px', width: '100%' }}></div>
        </div>
    );
};

export default Demo;
