import React, { useState } from "react";
import { Satellite, ShieldAlert, CheckCircle, RefreshCw, Layers } from "lucide-react";

interface SatelliteInSARProps {
  t: (key: string) => string;
}

export default function SatelliteInSAR({ t }: SatelliteInSARProps) {
  const [selectedZone, setSelectedZone] = useState<"rajpur" | "arhat" | "patel">("arhat");
  const [isScanning, setIsScanning] = useState<boolean>(false);

  const zones = {
    rajpur: {
      name: "Rajpur Viaduct & Flyover Segment",
      subsidenceRate: "-0.4 mm/year",
      status: "STABLE",
      gprDepth: "0.02 cm deflection at 15m depth",
      desc: "Radar coherence is high. Bedrock foundations show negligible subterranean drift. Safety factor: 1.42 (Within tolerances)."
    },
    arhat: {
      name: "Arhat Bazaar Bridge Pillar #4",
      subsidenceRate: "-2.8 mm/year",
      status: "SUBSIDENCE ALERT",
      gprDepth: "4.2 cm deep soil displacement detected at 8m depth",
      desc: "CRITICAL DRIFT: InSAR satellite radar records high-density subsidence. Sub-surface erosion detected around central concrete bridge foundations. Concrete shear crack hazard flagged by GPR."
    },
    patel: {
      name: "Patel Nagar Underpass & Subway Tunnel",
      subsidenceRate: "-0.1 mm/year",
      status: "STABLE",
      gprDepth: "0.01 cm deflection at 10m depth",
      desc: "Uniform terrain settlement. GPR radar confirms concrete lining is intact. Subterranean structural safety limits verified."
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Satellite className="w-5 h-5 text-indigo-400 animate-pulse" />
          <h3 className="font-sans font-semibold text-slate-200 text-sm">
            {t("insarMonitoring")}
          </h3>
        </div>
        <div className="flex items-center gap-1 font-mono text-[8px] text-indigo-400 bg-indigo-500/10 px-2 py-0.5 border border-indigo-500/20 rounded">
          <Layers className="w-3 h-3" />
          ESA Copernicus Sentinel-1
        </div>
      </div>

      <p className="text-[11px] text-slate-400 mb-4 leading-relaxed">
        Ingests Interferometric Synthetic Aperture Radar (InSAR) to map sub-millimeter geological shifts. 
        Detects underground infrastructure sinkhole risks and bridge settlement before structural failure.
      </p>

      {/* Grid heat-map visualizer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Heatmap Visual Canvas */}
        <div className="relative h-[160px] bg-slate-950 rounded-xl overflow-hidden border border-slate-850 flex flex-col justify-between p-3 select-none">
          {/* Grid structure */}
          <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 pointer-events-none opacity-10">
            {Array.from({ length: 36 }).map((_, i) => (
              <div key={i} className="border border-indigo-500" />
            ))}
          </div>

          <div className="z-10 font-mono text-[8px] text-slate-500">InSAR Surface Drift Spectrum Map</div>

          {/* Sinking Heat Points */}
          <div className="flex justify-around items-center h-full z-10">
            {/* Zone 1: Rajpur */}
            <button
              onClick={() => setSelectedZone("rajpur")}
              className={`flex flex-col items-center group transition-all ${
                selectedZone === "rajpur" ? "scale-110" : "opacity-60"
              }`}
            >
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center font-bold text-[8px] text-emerald-400 shadow-lg ring-4 ring-emerald-500/10">
                -0.4
              </div>
              <span className="text-[7.5px] font-mono text-slate-400 mt-1">Rajpur</span>
            </button>

            {/* Zone 2: Arhat (Sinking) */}
            <button
              onClick={() => setSelectedZone("arhat")}
              className={`flex flex-col items-center group transition-all ${
                selectedZone === "arhat" ? "scale-110" : "opacity-60"
              }`}
            >
              <div className="w-9 h-9 rounded-full bg-rose-500/30 border-2 border-rose-500 flex items-center justify-center font-bold text-[9px] text-rose-400 shadow-xl ring-8 ring-rose-500/15 animate-pulse">
                -2.8
              </div>
              <span className="text-[7.5px] font-mono text-slate-400 mt-1">Arhat Pillar</span>
            </button>

            {/* Zone 3: Patel */}
            <button
              onClick={() => setSelectedZone("patel")}
              className={`flex flex-col items-center group transition-all ${
                selectedZone === "patel" ? "scale-110" : "opacity-60"
              }`}
            >
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center font-bold text-[8px] text-emerald-400 shadow-lg ring-4 ring-emerald-500/10">
                -0.1
              </div>
              <span className="text-[7.5px] font-mono text-slate-400 mt-1">Patel Tunnel</span>
            </button>
          </div>

          <div className="flex justify-between items-center z-10">
            <span className="text-[8px] font-mono text-slate-500">Coordinate Scale: mm/yr shift</span>
            <div className="flex gap-2 items-center text-[8px] font-mono">
              <span className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1" />Stable</span>
              <span className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-1 animate-ping" />Sinking</span>
            </div>
          </div>
        </div>

        {/* Selected Zone Readout Details */}
        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-850 flex flex-col justify-between text-left">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[8.5px] font-mono text-slate-500">Target Georeference</span>
              <span className={`text-[8.5px] font-mono font-bold px-1.5 rounded ${
                zones[selectedZone].status === "STABLE"
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25"
                  : "bg-rose-500/15 text-rose-400 border border-rose-500/25 animate-pulse"
              }`}>
                {zones[selectedZone].status}
              </span>
            </div>
            <h4 className="text-[11px] font-sans font-semibold text-slate-200">
              {zones[selectedZone].name}
            </h4>
            <div className="grid grid-cols-2 gap-2 mt-2 border-t border-b border-slate-850 py-1.5 font-mono text-[9px]">
              <div>
                <span className="text-slate-500 block">Sinking rate:</span>
                <span className={`font-bold ${zones[selectedZone].status === "STABLE" ? "text-emerald-400" : "text-rose-400"}`}>
                  {zones[selectedZone].subsidenceRate}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">GPR displacement:</span>
                <span className="text-slate-300 font-bold">{zones[selectedZone].gprDepth}</span>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 leading-tight mt-2">
              {zones[selectedZone].desc}
            </p>
          </div>

          {zones[selectedZone].status !== "STABLE" && (
            <div className="mt-3 bg-rose-500/10 border border-rose-500/20 p-2 rounded flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span className="text-[8.5px] font-mono text-rose-400">
                PROACTIVE DISPATCH ACTION: Concrete structural inspection assigned automatically.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
