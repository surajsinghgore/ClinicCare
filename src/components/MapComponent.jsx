import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Optional: Custom icon for the marker
const locationIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // URL of the custom icon
  iconSize: [32, 32], // Size of the icon
  iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
});

const MapComponent = ({ selectedCord, setCord }) => {
  console.log(selectedCord)
  const mapRef = useRef(null); // Reference for the map container
  const [coords, setCoords] = useState({
    latitude: selectedCord?.latitude || selectedCord?.lat || 0,
    longitude: selectedCord?.longitude || selectedCord?.long || 0,
  });

  useEffect(() => {
    if (!mapRef.current) return; // Wait until mapRef is available

    // Create the map
    const map = L.map(mapRef.current).setView([coords.latitude, coords.longitude], 13);

    // Add a tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap',
    }).addTo(map);

    // Initial marker setup with custom icon
    let marker = setMarker(map, null, coords.latitude, coords.longitude);

    // Event listener for map click
    map.on('click', (e) => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      setCoords({ latitude: lat, longitude: lng });
      setCord({ latitude: lat, longitude: lng });

      // Move or add the marker at the clicked position
      marker = setMarker(map, marker, lat, lng);
    });

    // Cleanup on component unmount
    return () => {
      map.off();
      map.remove();
    };
  }, [coords, setCord]);

  // Function to set/update marker
  const setMarker = (map, marker, lat, lng) => {
    if (marker) {
      marker.setLatLng([lat, lng]);
    } else {
      marker = L.marker([lat, lng], { icon: locationIcon }).addTo(map); 
    }
    return marker;
  };

  return (
    <div>
      <h2>Map Demo</h2>
      <div
        ref={mapRef}
        id="map"
        style={{ height: '400px', width: '100%' }} 
      ></div>
    </div>
  );
};

export default MapComponent;
