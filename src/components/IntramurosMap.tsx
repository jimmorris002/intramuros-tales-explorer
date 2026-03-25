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

// Manila Cathedral as the starting point
const START_POINT: [number, number] = [14.5918, 120.9736];
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

const startIcon = L.divIcon({
  className: "start-marker",
  html: `<div style="width:32px;height:32px;border-radius:50%;background:#16a34a;border:3px solid white;box-shadow:0 2px 10px rgba(0,0,0,0.35);display:flex;align-items:center;justify-content:center;"><svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg></div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

async function fetchWalkingRoute(
  from: [number, number],
  to: [number, number]
): Promise<L.LatLngExpression[] | null> {
  try {
    const url = `https://router.project-osrm.org/route/v1/foot/${from[1]},${from[0]};${to[1]},${to[0]}?overview=full&geometries=geojson`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.code === "Ok" && data.routes?.[0]) {
      const coords = data.routes[0].geometry.coordinates;
      return coords.map((c: [number, number]) => [c[1], c[0]] as L.LatLngExpression);
    }
    return null;
  } catch {
    return null;
  }
}

function formatDuration(seconds: number): string {
  const mins = Math.round(seconds / 60);
  if (mins < 60) return `${mins} min`;
  const hrs = Math.floor(mins / 60);
  const remainMins = mins % 60;
  return `${hrs}h ${remainMins}m`;
}

function formatDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)} m`;
  return `${(meters / 1000).toFixed(1)} km`;
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
  const routeLayerRef = useRef<L.LayerGroup | null>(null);
  const routeInfoRef = useRef<{ distance: string; duration: string } | null>(null);
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

  // Initialize map
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
    routeLayerRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    // Add the start marker (Manila Cathedral)
    L.marker(START_POINT, { icon: startIcon })
      .bindTooltip("Start: Manila Cathedral", { permanent: false, direction: "top" })
      .addTo(map);

    return () => {
      markersLayerRef.current?.clearLayers();
      routeLayerRef.current?.clearLayers();
      markersLayerRef.current = null;
      routeLayerRef.current = null;
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Add markers
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

  // Draw walking route when landmark is selected
  useEffect(() => {
    if (!mapInstanceRef.current || !routeLayerRef.current) return;

    routeLayerRef.current.clearLayers();
    routeInfoRef.current = null;

    if (!activeLandmark) return;

    // Skip routing to self (Manila Cathedral)
    if (activeLandmark.id === "manila-cathedral") {
      mapInstanceRef.current.flyTo([activeLandmark.lat, activeLandmark.lng], 17, { duration: 0.8 });
      return;
    }

    const dest: [number, number] = [activeLandmark.lat, activeLandmark.lng];

    fetchWalkingRoute(START_POINT, dest).then((coords) => {
      if (!coords || !routeLayerRef.current || !mapInstanceRef.current) return;

      // Dashed route line
      const routeLine = L.polyline(coords, {
        color: "#2563eb",
        weight: 5,
        opacity: 0.8,
        dashArray: "10, 8",
        lineCap: "round",
      });

      // Route glow
      const routeGlow = L.polyline(coords, {
        color: "#3b82f6",
        weight: 10,
        opacity: 0.25,
      });

      routeGlow.addTo(routeLayerRef.current!);
      routeLine.addTo(routeLayerRef.current!);

      // Fit bounds to show entire route
      const bounds = routeLine.getBounds().pad(0.15);
      mapInstanceRef.current!.fitBounds(bounds, { duration: 0.8 });
    });

    // Also fetch distance/duration for the info badge
    const url = `https://router.project-osrm.org/route/v1/foot/${START_POINT[1]},${START_POINT[0]};${dest[1]},${dest[0]}?overview=false`;
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        if (data.code === "Ok" && data.routes?.[0]) {
          const route = data.routes[0];
          routeInfoRef.current = {
            distance: formatDistance(route.distance),
            duration: formatDuration(route.duration),
          };
          // Force re-render by updating a DOM element
          const el = document.getElementById("route-info");
          if (el) {
            el.textContent = `🚶 ${routeInfoRef.current.distance} · ${routeInfoRef.current.duration}`;
            el.style.display = "flex";
          }
        }
      })
      .catch(() => {});
  }, [activeLandmark]);

  return (
    <div className="relative h-full w-full">
      <div ref={mapElementRef} className="h-full w-full" aria-label={`Intramuros map ${language}`} />

      {/* Route info badge */}
      <div
        id="route-info"
        className="absolute left-4 bottom-8 z-[1000] rounded-lg px-4 py-2.5 text-sm font-semibold shadow-lg border border-border"
        style={{
          display: activeLandmark && activeLandmark.id !== "manila-cathedral" ? "flex" : "none",
          background: "hsl(var(--card))",
          color: "hsl(var(--card-foreground))",
        }}
      >
        Loading route...
      </div>

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
