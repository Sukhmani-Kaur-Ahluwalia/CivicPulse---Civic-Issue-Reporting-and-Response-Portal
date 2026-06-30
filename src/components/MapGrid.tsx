import React, { useEffect, useState, useRef } from "react";
import { CivicIssue, OptimizedRoute } from "../types";
import { MapPin, Info, Compass, Navigation } from "lucide-react";

interface MapGridProps {
  issues: CivicIssue[];
  selectedLat: number;
  selectedLon: number;
  onSelectCoords: (lat: number, lon: number) => void;
  highlightedRoutes?: OptimizedRoute[];
  t: (key: string) => string;
}

export default function MapGrid({
  issues,
  selectedLat,
  selectedLon,
  onSelectCoords,
  highlightedRoutes = [],
  t
}: MapGridProps) {
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState<boolean>(false);

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);
  const userMarkerRef = useRef<any>(null);
  const selectedMarkerRef = useRef<any>(null);
  const issueMarkersRef = useRef<any>([]);
  const routeLayerRef = useRef<any>(null);

  // Watch/Request Geolocation
  const requestGeolocation = () => {
    if (!navigator.geolocation) {
      setGpsError(t("gpsNotSupported"));
      return;
    }

    setIsLocating(true);
    setGpsError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = Number(position.coords.latitude.toFixed(4));
        const lon = Number(position.coords.longitude.toFixed(4));

        setUserLocation({ lat, lon });
        onSelectCoords(lat, lon);
        setIsLocating(false);

        // Center map on user location when coordinates are found
        if (mapInstanceRef.current) {
          mapInstanceRef.current.setView([lat, lon], 14);
        }
      },
      (error) => {
        console.warn("Geolocation permission error:", error);
        setGpsError(t("gpsUnavailable"));
        setIsLocating(false);
        // Default to center of Dehradun region if GPS fails
        onSelectCoords(30.3300, 78.0350);
        if (mapInstanceRef.current) {
          mapInstanceRef.current.setView([30.3300, 78.0350], 14);
        }
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  // Run location request on mount
  useEffect(() => {
    requestGeolocation();
  }, []);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    const L = (window as any).L;
    if (!L) {
      console.warn("Leaflet script has not finished loading from CDN yet.");
      return;
    }

    if (!mapInstanceRef.current) {
      // Create Map
      const map = L.map(mapContainerRef.current).setView([selectedLat, selectedLon], 14);

      // Add CartoDB Dark Matter tiles (matching the premium app dark aesthetic)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(map);

      // Map Click Handler to select coordinates
      map.on("click", (e: any) => {
        const lat = Number(e.latlng.lat.toFixed(4));
        const lon = Number(e.latlng.lng.toFixed(4));
        onSelectCoords(lat, lon);
      });

      mapInstanceRef.current = map;
    }
  }, [mapContainerRef]);

  // Sync Selected Pin position
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const L = (window as any).L;
    if (!L) return;

    if (selectedMarkerRef.current) {
      map.removeLayer(selectedMarkerRef.current);
    }

    const pinIcon = L.divIcon({
      className: 'custom-selected-pin-icon',
      html: `<div class="flex flex-col items-center select-none">
               <div class="bg-rose-500 text-slate-950 font-sans font-bold text-[9px] px-1.5 py-0.5 rounded-lg shadow-lg whitespace-nowrap mb-0.5">
                 ${selectedLat.toFixed(3)}, ${selectedLon.toFixed(3)}
               </div>
               <svg class="w-6 h-6 text-rose-500 drop-shadow-md animate-bounce" viewBox="0 0 24 24" fill="currentColor">
                 <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
               </svg>
             </div>`,
      iconSize: [60, 40],
      iconAnchor: [30, 40]
    });

    selectedMarkerRef.current = L.marker([selectedLat, selectedLon], { icon: pinIcon }).addTo(map);
  }, [selectedLat, selectedLon]);

  // Sync User's GPS Location pulsing marker
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const L = (window as any).L;
    if (!L) return;

    if (userMarkerRef.current) {
      map.removeLayer(userMarkerRef.current);
    }

    if (userLocation) {
      const userIcon = L.divIcon({
        className: 'custom-user-gps-dot',
        html: `<div class="relative flex items-center justify-center w-8 h-8">
                 <div class="absolute w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/40 animate-ping"></div>
                 <div class="absolute w-4 h-4 rounded-full bg-blue-500/40 border border-blue-500/60 animate-pulse"></div>
                 <div class="w-2.5 h-2.5 rounded-full bg-blue-400 border-2 border-white shadow-md z-30"></div>
               </div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      userMarkerRef.current = L.marker([userLocation.lat, userLocation.lon], { icon: userIcon }).addTo(map);
    }
  }, [userLocation]);

  // Render Issue Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const L = (window as any).L;
    if (!L) return;

    // Remove existing issue markers
    issueMarkersRef.current.forEach((m: any) => map.removeLayer(m));
    issueMarkersRef.current = [];

    issues.forEach((iss) => {
      const getCategoryColor = (cat: string) => {
        switch (cat) {
          case "Pothole & Roads": return "#f59e0b"; // amber
          case "Water & Leakage": return "#3b82f6"; // blue
          case "Waste Management": return "#14b8a6"; // teal
          case "Streetlights": return "#facc15"; // yellow
          default: return "#a855f7"; // purple
        }
      };

      const color = getCategoryColor(iss.category);
      const markerHtml = `
        <div class="w-4 h-4 rounded-full border-2 border-slate-950 flex items-center justify-center cursor-pointer transition-transform hover:scale-125 ring-4 shadow-lg" style="background-color: ${color}; --tw-ring-color: ${color}4d;"></div>
      `;

      const issueIcon = L.divIcon({
        className: 'custom-issue-pin',
        html: markerHtml,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });

      const marker = L.marker([iss.latitude, iss.longitude], { icon: issueIcon }).addTo(map);

      // Popup content
      marker.bindPopup(`
        <div class="text-xs font-sans text-slate-200 min-w-[150px] p-1">
          <strong class="text-white block text-sm mb-1">${iss.title}</strong>
          <span class="text-slate-400 block leading-tight text-[10px] mb-1">${iss.description}</span>
          <div class="flex justify-between items-center mt-2 border-t border-slate-800 pt-1.5 font-mono text-[9px]">
            <span class="text-slate-500 uppercase">${iss.category}</span>
            <span class="text-emerald-400 font-bold uppercase">${iss.status}</span>
          </div>
        </div>
      `, {
        className: 'custom-map-popup',
        closeButton: false
      });

      marker.on("click", () => {
        onSelectCoords(iss.latitude, iss.longitude);
      });

      issueMarkersRef.current.push(marker);
    });
  }, [issues]);

  // Highlight maintenance crew routes if any
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const L = (window as any).L;
    if (!L) return;

    if (routeLayerRef.current) {
      map.removeLayer(routeLayerRef.current);
    }

    const routeGroup = L.layerGroup();
    const colors = ["#10b981", "#38bdf8", "#f59e0b", "#a78bfa"];

    highlightedRoutes.forEach((route, routeIndex) => {
      const color = colors[routeIndex % colors.length];
      const latlngs = route.tasks.map((task) => [task.latitude, task.longitude]);

      if (latlngs.length > 1) {
        L.polyline(latlngs, {
          color,
          weight: 4,
          dashArray: routeIndex % 2 === 0 ? "8, 5" : "2, 7",
          opacity: 0.9
        }).addTo(routeGroup);
      }

      route.tasks.forEach((task) => {
        const routeIcon = L.divIcon({
          className: "custom-route-step-pin",
          html: `<div class="w-6 h-6 rounded-full border-2 border-slate-950 text-slate-950 font-bold text-[10px] flex items-center justify-center shadow-lg" style="background-color:${color};">${task.sequence}</div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        });

        L.marker([task.latitude, task.longitude], { icon: routeIcon })
          .bindPopup(`
            <div class="text-xs font-sans text-slate-200 min-w-[190px] p-1">
              <strong class="text-white block text-sm mb-1">${route.crewName}</strong>
              <span class="text-slate-400 block text-[10px] mb-1">${route.crewSize} people - ${route.issueCount} issues</span>
              <div class="border-t border-slate-800 pt-1.5 mt-1.5 font-mono text-[9px]">
                <div><span class="text-slate-500">Pehle/Then:</span> #${task.sequence} ${task.title}</div>
                <div><span class="text-slate-500">Arrive:</span> ${task.eta}</div>
                <div><span class="text-slate-500">Resolve by:</span> ${task.estimatedResolutionTime}</div>
              </div>
            </div>
          `, {
            className: "custom-map-popup",
            closeButton: false
          })
          .addTo(routeGroup);
      });
    });

    if (highlightedRoutes.length > 0) {
      routeLayerRef.current = routeGroup.addTo(map);
    }
  }, [highlightedRoutes]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-emerald-400 animate-spin-slow" />
          <div>
            <h3 className="font-sans font-semibold text-slate-200 text-sm">
              {t("mapLabel")}
            </h3>
            <p className="text-[9px] text-slate-500 font-sans">
              {t("mapHelp")}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={requestGeolocation}
            disabled={isLocating}
            className="flex items-center gap-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded text-[10px] font-mono font-bold transition-all cursor-pointer disabled:opacity-40"
          >
            <Navigation className={`w-3 h-3 ${isLocating ? "animate-pulse" : ""}`} />
            {isLocating ? t("locating") : t("findMe")}
          </button>
          <div className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded">
            {t("liveGpsMap")}
          </div>
        </div>
      </div>

      {gpsError && (
        <div className="bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] px-2.5 py-1.5 rounded-lg mb-3 font-sans">
          ⚠️ {gpsError}
        </div>
      )}

      {/* Styled Google Maps Leaflet Canvas */}
      <div
        ref={mapContainerRef}
        id="map-leaflet-canvas"
        className="relative w-full h-[320px] bg-[#0e1726] rounded-xl overflow-hidden cursor-crosshair border border-slate-800 shadow-inner z-0"
        style={{ minHeight: '320px' }}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-3 text-xs bg-slate-950/60 p-2.5 rounded-xl border border-slate-850">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-emerald-400 shrink-0" />
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-3 gap-y-1 text-slate-400 font-mono text-[9px]">
            <div className="flex items-center"><span className="inline-block w-2 h-2 rounded-full bg-amber-500 mr-1" />{t("potholesRoads")}</div>
            <div className="flex items-center"><span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-1" />{t("waterLeakage")}</div>
            <div className="flex items-center"><span className="inline-block w-2 h-2 rounded-full bg-teal-500 mr-1" />{t("wasteManagement")}</div>
            <div className="flex items-center"><span className="inline-block w-2 h-2 rounded-full bg-yellow-400 mr-1" />{t("streetlights")}</div>
          </div>
        </div>
        {userLocation && (
          <span className="text-[9.5px] font-mono text-blue-400 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
            {t("gpsActive")}
          </span>
        )}
      </div>
    </div>
  );
}
