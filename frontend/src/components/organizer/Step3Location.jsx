// Step3Location.jsx
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import L from "leaflet";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function LocationSelector({ onSelect }) {
  useMapEvents({
    click(e) {
      onSelect({
        address: `Lat: ${e.latlng.lat}, Lng: ${e.latlng.lng}`,
        coordinates: [e.latlng.lng, e.latlng.lat],
      });
    },
  });
  return null;
}

export default function Step3Location({ location, handleLocationChange, nextStep, prevStep }) {
  const [position, setPosition] = useState([12.9716, 77.5946]); // Default Bangalore

  const updateLocation = (loc) => {
    setPosition([loc.coordinates[1], loc.coordinates[0]]);
    handleLocationChange(loc);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Event Location</h2>
      <p className="mb-2 text-sm">Click on the map to set your event location</p>
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "300px", width: "100%", borderRadius: "8px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationSelector onSelect={updateLocation} />
        <Marker position={position} icon={markerIcon} />
      </MapContainer>

      <input
        type="text"
        placeholder="Address"
        value={location.address}
        onChange={(e) =>
          handleLocationChange({ ...location, address: e.target.value })
        }
        className="w-full p-2 my-4 rounded bg-gray-800"
      />

      <div className="flex justify-between">
        <button onClick={prevStep} className="px-4 py-2 bg-gray-600 rounded">
          Back
        </button>
        <button onClick={nextStep} className="px-4 py-2 bg-blue-600 rounded">
          Next
        </button>
      </div>
    </div>
  );
}
