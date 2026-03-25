import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { createRoot } from "react-dom/client";
import { Language, landmarks, type Landmark } from "@/data/landmarks";
import LandmarkPopup from "./LandmarkPopup";

// Fix default marker icon
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const categoryColors: Record<string, string> = {
  fortress: "#1e40af",
  church: "#9333ea",
  historic: "#b45309",
  plaza: "#059669",
  gate: "#dc2626",
};

function createColoredIcon(category: string) {
  const color = categoryColors[category] || "#1e40af";
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="
      width: 28px; height: 28px; border-radius: 50% 50% 50% 0;
      background: ${color}; transform: rotate(-45deg);
      border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      display: flex; align-items: center; justify-content: center;
    "><div style="
      width: 8px; height: 8px; border-radius: 50%;
      background: white; transform: rotate(45deg);
    "></div></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -30],
  });
}

interface MapEventsProps {
  activeLandmark: Landmark | null;
}

function MapEvents({ activeLandmark }: MapEventsProps) {
  const map = useMap();

  useEffect(() => {
    if (activeLandmark) {
      map.flyTo([activeLandmark.lat, activeLandmark.lng], 17, { duration: 0.8 });
    }
  }, [activeLandmark, map]);

  return null;
}

interface IntramurosMapProps {
  language: Language;
  activeLandmark: Landmark | null;
  onLandmarkSelect: (landmark: Landmark | null) => void;
}

const IntramurosMap = ({ language, activeLandmark, onLandmarkSelect }: IntramurosMapProps) => {
  const popupContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={[14.5905, 120.9730]}
        zoom={16}
        className="w-full h-full z-0"
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapEvents activeLandmark={activeLandmark} />
        {landmarks.map((lm) => (
          <Marker
            key={lm.id}
            position={[lm.lat, lm.lng]}
            icon={createColoredIcon(lm.category)}
            eventHandlers={{
              click: () => onLandmarkSelect(lm),
            }}
          />
        ))}
      </MapContainer>

      {/* Floating popup */}
      {activeLandmark && (
        <div className="absolute top-4 right-4 z-[1000]" ref={popupContainerRef}>
          <LandmarkPopup
            landmark={activeLandmark}
            language={language}
            onClose={() => onLandmarkSelect(null)}
          />
        </div>
      )}
    </div>
  );
};

export default IntramurosMap;
