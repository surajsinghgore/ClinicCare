import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Optional: Custom icon for the marker
const locationIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // URL of the custom icon
    iconSize: [32, 32], // Size of the icon
    iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
    popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
});

const ClinicMapComponent = ({ clinicData, status }) => {
    const mapRef = useRef(null); // Reference for the map container

    useEffect(() => {
        if (!mapRef.current || !clinicData?.length) return; // Wait until mapRef and data are available

        // Create the map and set its initial view
        const map = L.map(mapRef.current).setView(
            [clinicData[0].lat, clinicData[0].long],
            13
        );

        // Add a tile layer
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: "© OpenStreetMap",
        }).addTo(map);

        // Add markers for each clinic
        clinicData.forEach((clinic) => {
            const { lat, long, name, address, doctorId } = clinic;

            // Create a popup with the clinic and doctor details
            const popupContent = `
        <div>
          <strong>Clinic Name:</strong> ${name}<br />
          <strong>Doctor:</strong> ${doctorId.name}<br />
          <strong>Address:</strong> ${address}
        </div>
      `;

            // Add marker with popup
            L.marker([lat, long], { icon: locationIcon })
                .addTo(map)
                .bindPopup(popupContent);
        });

        // Cleanup on component unmount
        return () => {
            map.off();
            map.remove();
        };
    }, [clinicData]);

    return (
        <div>
            <h2 className="mb-2">{(status) ? "Near By Clinics In 10 Km Range" : "All Clinic Location"}</h2>
            <div
                ref={mapRef}
                id="map"
                style={{ height: "450px", width: "100%" }}
            ></div>
        </div>
    );
};

export default ClinicMapComponent;
