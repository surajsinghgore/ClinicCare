import { useEffect, useRef, useState } from "react";
import L from "leaflet";

const MapComponent = ({ selectedCord, setCord }) => {
  const mapRef = useRef(null); // Reference for the map container
  const [coords, setCoords] = useState({ latitude: selectedCord?.latitude || 30.756075, longitude: selectedCord?.longitude || 76.821314 });

  useEffect(() => {
    if (!mapRef.current) return; // Wait until mapRef is available

    // Create the map
    const map = L.map(mapRef.current).setView([coords.latitude, coords.longitude], 13);

    // Add a tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }).addTo(map);

    // Initial marker setup
    let marker = setMarker(map, null, coords.latitude, coords.longitude);

    // Event listener for map click
    map.on("click", (e) => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      setCoords({ latitude: lat, longitude: lng });
      setCord({ latitude: lat, longitude: lng });
      marker = setMarker(map, marker, lat, lng); // Update or add marker
    });

    // Cleanup on component unmount
    return () => {
      map.off();
      map.remove();
    };
  }, [mapRef]);

  // Function to set/update marker
  const setMarker = (map, marker, lat, lng) => {
    if (marker) {
      marker.setLatLng([lat, lng]);
    } else {
      marker = L.marker([lat, lng]).addTo(map);
    }
    return marker;
  };

  return (
    <div className="w-full bg-primary z-0">
      <div ref={mapRef} id="map" style={{ height: "500px", width: "100%" }}></div>
    </div>
  );
};

export default MapComponent;
