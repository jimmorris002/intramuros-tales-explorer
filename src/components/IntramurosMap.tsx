import { useEffect, useMemo, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Language, landmarks, type Landmark } from "@/data/landmarks";
import LandmarkPopup from "./LandmarkPopup";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl;
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

const INITIAL_CENTER: L.LatLngExpression = [14.5905, 120.973];
const INITIAL_ZOOM = 16;

function createColoredIcon(category: string) {
  const color = categoryColors[category] || "#1e40af";

  return L.divIcon({
    className: "custom-marker",
    html: `<div style="width:28px;height:28px;border-radius:50% 50% 50% 0;background:${color};transform:rotate(-45deg);border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;"><div style="width:8px;height:8px;border-radius:50%;background:white;transform:rotate(45deg);"></div></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -30],
  });
}

interface IntramurosMapProps {
  language: Language;
  activeLandmark: Landmark | null;
  onLandmarkSelect: (landmark: Landmark | null) => void;
}

const IntramurosMap = ({ language, activeLandmark, onLandmarkSelect }: IntramurosMapProps) => {
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const icons = useMemo(
    () => ({
      fortress: createColoredIcon("fortress"),
      church: createColoredIcon("church"),
      historic: createColoredIcon("historic"),
      plaza: createColoredIcon("plaza"),
      gate: createColoredIcon("gate"),
    }),
    []
  );

  useEffect(() => {
    if (!mapElementRef.current || mapInstanceRef.current) return;

    const map = L.map(mapElementRef.current, {
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
      zoomControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    markersLayerRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    return () => {
      markersLayerRef.current?.clearLayers();
      markersLayerRef.current = null;
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    landmarks.forEach((landmark) => {
      const marker = L.marker([landmark.lat, landmark.lng], {
        icon: icons[landmark.category],
      });

      marker.on("click", () => onLandmarkSelect(landmark));
      marker.addTo(markersLayerRef.current!);
    });
  }, [icons, onLandmarkSelect]);

  useEffect(() => {
    if (!mapInstanceRef.current || !activeLandmark) return;

    mapInstanceRef.current.flyTo([activeLandmark.lat, activeLandmark.lng], 17, {
      duration: 0.8,
    });
  }, [activeLandmark]);

  return (
    <div className="relative h-full w-full">
      <div ref={mapElementRef} className="h-full w-full" aria-label={`Intramuros map ${language}`} />

      {activeLandmark && (
        <div className="absolute right-4 top-4 z-[1000]">
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
