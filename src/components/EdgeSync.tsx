import React, { useState } from "react";
import { Wifi, WifiOff, CloudLightning, Database, ArrowRight, ShieldCheck } from "lucide-react";
import { CivicIssue } from "../types";

interface EdgeSyncProps {
  onSyncComplete: (syncedIssues: { title: string; description: string; category: string; lat: number; lon: number }[]) => void;
  t: (key: string) => string;
}

export default function EdgeSync({ onSyncComplete, t }: EdgeSyncProps) {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [offlineQueue, setOfflineQueue] = useState<{ title: string; description: string; category: string; lat: number; lon: number; size: string }[]>([]);
  const [syncStatus, setSyncStatus] = useState<"idle" | "uplink" | "encrypting" | "transmitting" | "success">("idle");

  const triggerOfflineReport = () => {
    const categories = ["Pothole & Roads", "Waste Management", "Streetlights"];
    const randomCat = categories[Math.floor(Math.random() * categories.length)];
    const titles: Record<string, string> = {
      "Pothole & Roads": "Massive structural road decay in deep valley segment",
      "Waste Management": "Accumulating non-biodegradable waste in informal settlement creek",
      "Streetlights": "Unmapped lane dark spot, broken overhead luminaire"
    };

    const newOfflineIssue = {
      title: titles[randomCat],
      description: `EDGE PROCESSED COMPRESSED PACKET: Captured by local patrol vehicle camera in offline zone. Edge-ML confirmed civic hazard. Location lacks formal grid address, synthetic Plus Code generated.`,
      category: randomCat,
      lat: 30.315 + Math.random() * 0.03,
      lon: 78.012 + Math.random() * 0.04,
      size: "114 KB"
    };

    setOfflineQueue([...offlineQueue, newOfflineIssue]);
  };

  const executeSync = () => {
    if (offlineQueue.length === 0) return;
    
    setSyncStatus("uplink");
    setTimeout(() => {
      setSyncStatus("encrypting");
      setTimeout(() => {
        setSyncStatus("transmitting");
        setTimeout(() => {
          onSyncComplete(offlineQueue);
          setOfflineQueue([]);
          setSyncStatus("success");
          setTimeout(() => {
            setSyncStatus("idle");
            setIsOnline(true);
          }, 2000);
        }, 1500);
      }, 1000);
    }, 1200);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {isOnline ? (
            <Wifi className="w-5 h-5 text-emerald-400" />
          ) : (
            <WifiOff className="w-5 h-5 text-amber-500 animate-pulse" />
          )}
          <h3 className="font-sans font-semibold text-slate-200 text-sm">
            {t("edgeOffline")}
          </h3>
        </div>
        <button
          onClick={() => {
            if (syncStatus === "idle") setIsOnline(!isOnline);
          }}
          className={`text-[9px] font-mono px-2 py-1 rounded border font-semibold ${
            isOnline
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
              : "bg-amber-500/10 border-amber-500/20 text-amber-400"
          }`}
        >
          {isOnline ? "LIVE: ONLINE (WI-FI/LTE)" : "EDGE: DISCONNECTED (BLACKSPOT)"}
        </button>
      </div>

      <p className="text-[11px] text-slate-400 mb-4 leading-relaxed">
        Simulate a connectivity blackspot (e.g. unmapped valley settlement). 
        You can draft compressed reports locally, then upload them via Satellite once Wi-Fi/megaconstellation triggers.
      </p>

      {/* Offline Status Queue */}
      <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 mb-4 min-h-[85px] flex flex-col justify-between">
        <div className="flex justify-between items-center mb-1.5 border-b border-slate-850 pb-1">
          <span className="text-[9px] font-mono text-slate-500">Edge-ML Cache Queue</span>
          <span className="text-[10px] font-bold font-mono text-slate-300">
            {offlineQueue.length} Compressed Packets
          </span>
        </div>

        {offlineQueue.length === 0 ? (
          <div className="text-center py-2 text-[10px] text-slate-500 font-mono">
            Queue empty. Toggle disconnected mode and log an edge packet.
          </div>
        ) : (
          <div className="max-h-[110px] overflow-y-auto space-y-1.5">
            {offlineQueue.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center bg-slate-900/60 p-1.5 rounded border border-slate-800 text-[10px]">
                <div className="truncate pr-2 text-slate-300 font-sans">
                  [{item.category}] {item.title.substring(0, 30)}...
                </div>
                <div className="text-[8px] font-mono bg-blue-500/10 text-blue-400 px-1 border border-blue-500/20 rounded shrink-0">
                  {item.size}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action triggers */}
      <div className="space-y-2">
        {!isOnline && (
          <button
            onClick={triggerOfflineReport}
            className="w-full bg-slate-800 hover:bg-slate-750 text-amber-400 border border-amber-500/20 py-1.5 px-3 rounded-xl text-[11px] font-medium font-sans flex items-center justify-center gap-1 transition-all"
          >
            <WifiOff className="w-4 h-4 text-amber-500" />
            {t("edgeReporting")}
          </button>
        )}

        {isOnline && offlineQueue.length > 0 && syncStatus === "idle" && (
          <button
            onClick={executeSync}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-1.5 px-3 rounded-xl text-[11px] font-medium font-sans flex items-center justify-center gap-1.5 transition-all"
          >
            <CloudLightning className="w-4 h-4 text-emerald-300" />
            {t("edgeOnlineSync")}
          </button>
        )}

        {/* Sync Progress Animations */}
        {syncStatus !== "idle" && (
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-400 animate-pulse shrink-0" />
              <div className="text-[10px] font-mono text-slate-300 text-left w-full">
                {syncStatus === "uplink" && "Searching satellite uplink vector..."}
                {syncStatus === "encrypting" && "Compacting & Encrypting visual data payload..."}
                {syncStatus === "transmitting" && "Transmitting 128-bit geotagged telemetry to municipal DB..."}
                {syncStatus === "success" && "Transmission verified by municipal grid node!"}
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full h-1 bg-slate-850 rounded-full overflow-hidden">
              <div
                className={`h-full bg-emerald-500 transition-all duration-[1200ms] ${
                  syncStatus === "uplink" ? "w-[25%]" :
                  syncStatus === "encrypting" ? "w-[55%]" :
                  syncStatus === "transmitting" ? "w-[85%]" : "w-[100%]"
                }`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
