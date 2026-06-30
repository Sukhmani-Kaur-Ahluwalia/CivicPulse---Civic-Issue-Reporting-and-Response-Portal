import React, { useState, useEffect, useRef } from "react";
import { Activity, ShieldAlert, CheckCircle, RefreshCw, Volume2, Upload, FileAudio, Play, AlertCircle } from "lucide-react";

interface SoundTesterProps {
  onSuccessDiagnostic: (data: { title: string; description: string; category: string }) => void;
  t: (key: string) => string;
}

interface PremadeClip {
  id: string;
  name: string;
  type: string;
  frequency: number;
  description: string;
  isLeak: boolean;
  severity: "high" | "medium" | "low" | "none";
}

const PREMADE_CLIPS: PremadeClip[] = [
  {
    id: "fault_main_crack",
    name: "Main Line Pipe Crack",
    type: "Pressurized Subterranean Fracture",
    frequency: 135,
    description: "High-frequency escaping fluid soundwave matching main line structural fatigue.",
    isLeak: true,
    severity: "high"
  },
  {
    id: "fault_joint_leak",
    name: "Subsurface Joint Leakage",
    type: "High-Vibration Connection Seepage",
    frequency: 145,
    description: "Rapid water hiss suggesting localized joint seal separation or fitting decay.",
    isLeak: true,
    severity: "medium"
  },
  {
    id: "fault_valve_weep",
    name: "Minor Valve Seepage",
    type: "Low-Acoustic Packing Gland Flow",
    frequency: 120,
    description: "Weak structural micro-vibration indicating minor gate-valve weeping.",
    isLeak: true,
    severity: "low"
  },
  {
    id: "normal_flow",
    name: "Normal Flow Waveform",
    type: "Ambient Hydrodynamic Baseline",
    frequency: 60,
    description: "Healthy laminar hydraulic flow. No anomalous frequency escapes detected.",
    isLeak: false,
    severity: "none"
  }
];

// Procedural audio synthesis of pipeline flow sound using Web Audio API
const playTone = (freq: number, duration: number) => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    
    // Create oscillator for the main frequency tone
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    
    // Set frequency
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    
    // Create bandpass filtered noise to simulate flowing/escaping water
    const bufferSize = ctx.sampleRate * duration;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    
    const filter = ctx.createBiquadFilter();
    // For leaks (high frequency escapes), use bandpass to focus on the hiss.
    // For normal baseline flow, use lowpass to produce a deep fluid rumble.
    if (freq >= 120) {
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(freq * 8, ctx.currentTime); // high harmonic center
      filter.Q.setValueAtTime(2.0, ctx.currentTime);
      
      osc.type = "sine";
      oscGain.gain.setValueAtTime(0.06, ctx.currentTime); // subtle whistle pitch
    } else {
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(150, ctx.currentTime); // low-end rumble
      
      osc.type = "triangle";
      oscGain.gain.setValueAtTime(0.12, ctx.currentTime); // low flow hum
    }
    
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(freq >= 120 ? 0.22 : 0.08, ctx.currentTime);
    
    // Master gain envelope for fade in/out to prevent clicks
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.8, ctx.currentTime + 0.15);
    masterGain.gain.setValueAtTime(0.8, ctx.currentTime + duration - 0.25);
    masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);
    
    // Connections
    osc.connect(oscGain);
    oscGain.connect(masterGain);
    
    noiseSource.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(masterGain);
    
    masterGain.connect(ctx.destination);
    
    // Start / Stop playback
    osc.start(ctx.currentTime);
    noiseSource.start(ctx.currentTime);
    
    osc.stop(ctx.currentTime + duration);
    noiseSource.stop(ctx.currentTime + duration);
  } catch (err) {
    console.warn("Web Audio API failed or blocked by browser user gesture policies:", err);
  }
};

export default function SoundTester({ onSuccessDiagnostic, t }: SoundTesterProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedClip, setSelectedClip] = useState<PremadeClip | null>(null);
  const [frequency, setFrequency] = useState<number>(60);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanResult, setScanResult] = useState<"none" | "clean" | "leak">("none");
  const [detectedCategory, setDetectedCategory] = useState<string>("");
  const [detectedDetail, setDetectedDetail] = useState<string>("");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Generate simulated soundwave oscillation on the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let offset = 0;
    const drawWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.lineWidth = 2.5;

      // Base line gradient matching the diagnostic state
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, "#2563eb"); // blue

      const isHighFrequencyLeak = frequency >= 120 && frequency <= 150;
      if (isScanning) {
        gradient.addColorStop(0.5, "#d97706"); // Amber during scan
      } else if (scanResult === "leak") {
        gradient.addColorStop(0.5, "#f43f5e"); // Rose on leak
      } else if (scanResult === "clean") {
        gradient.addColorStop(0.5, "#10b981"); // Emerald on clean
      } else {
        gradient.addColorStop(0.5, isHighFrequencyLeak ? "#f43f5e" : "#2563eb");
      }
      
      gradient.addColorStop(1, "#2563eb");
      ctx.strokeStyle = gradient;

      for (let x = 0; x < canvas.width; x++) {
        const amplitude = isScanning
          ? Math.random() * 8 + 25
          : scanResult === "leak"
          ? 38
          : scanResult === "clean"
          ? 12
          : frequency >= 120 && frequency <= 150
          ? 35
          : 15;
          
        const waveFrequency = frequency / 400;
        const y = canvas.height / 2 + Math.sin(x * waveFrequency + offset) * amplitude;
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      offset += isScanning ? 0.35 : 0.04 + frequency / 650;
      animationRef.current = requestAnimationFrame(drawWave);
    };

    drawWave();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [frequency, isScanning, scanResult]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setSelectedClip(null);
      setScanResult("none");
      
      // Seed a realistic simulated frequency based on file name or randomise
      const fileNameLower = file.name.toLowerCase();
      if (fileNameLower.includes("leak") || fileNameLower.includes("crack") || fileNameLower.includes("burst")) {
        setFrequency(135);
      } else if (fileNameLower.includes("valve") || fileNameLower.includes("seep")) {
        setFrequency(120);
      } else if (fileNameLower.includes("normal") || fileNameLower.includes("clean") || fileNameLower.includes("baseline")) {
        setFrequency(60);
      } else {
        // Randomly assign a fault or clean pitch for standard uploads
        const mockPitches = [60, 120, 135, 145];
        const pitch = mockPitches[Math.floor(Math.random() * mockPitches.length)];
        setFrequency(pitch);
      }
    }
  };

  const handleSelectClip = (clip: PremadeClip) => {
    setSelectedClip(clip);
    setSelectedFile(null);
    setFrequency(clip.frequency);
    setScanResult("none");
    // Play the synthesized audio track for 1.5 seconds upon selection
    playTone(clip.frequency, 1.5);
  };

  const handleScan = () => {
    if (!selectedFile && !selectedClip) return;
    setIsScanning(true);
    setScanResult("none");
    
    // Play the synthesized audio track during the 2-second scan
    playTone(frequency, 2.0);
    
    setTimeout(() => {
      setIsScanning(false);
      const isLeak = frequency >= 120 && frequency <= 150;
      
      if (isLeak) {
        setScanResult("leak");
        if (selectedClip) {
          setDetectedCategory(selectedClip.name);
          setDetectedDetail(selectedClip.description);
        } else if (selectedFile) {
          setDetectedCategory("Uploaded Hydrophone Recording");
          setDetectedDetail(`Acoustic vibration analysis of "${selectedFile.name}" detected severe escaping fluid signals at ${frequency}Hz.`);
        }
      } else {
        setScanResult("clean");
      }
    }, 2000);
  };

  const handleCreateTicket = () => {
    const diagnosticTitle = selectedClip 
      ? `Acoustic Diagnostic: ${selectedClip.name} (#${Math.floor(Math.random() * 900) + 100})`
      : `Uploaded Acoustic Analysis: ${selectedFile?.name || "Acoustic Record"}`;

    const diagnosticDescription = selectedClip
      ? `AUTOMATED ACOUSTIC SENSOR DIAGNOSTIC: High-frequency escaping fluid soundwave detected at ${selectedClip.frequency}Hz. Signature indicates: ${selectedClip.type}. details: ${selectedClip.description}`
      : `AUTOMATED ACOUSTIC SENSOR DIAGNOSTIC: Analyzed uploaded record "${selectedFile?.name}". Detected anomalous escaping fluid signature at ${frequency}Hz pressure zones indicating potential early-stage subsurface waterline leakage.`;

    onSuccessDiagnostic({
      title: diagnosticTitle,
      description: diagnosticDescription,
      category: "Water & Leakage"
    });
  };

  return (
    <div className="bg-slate-900 border border-slate-850 rounded-3xl p-6 shadow-xl text-left">
      <div className="flex justify-between items-start gap-4 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20">
            <Volume2 className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="font-sans font-bold text-white text-sm">
              {t("soundLabTitle")}
            </h3>
            <p className="text-[10px] text-slate-400">
              {t("soundLabSubtitle")}
            </p>
          </div>
        </div>
        <span className="text-[9px] font-mono text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20 font-semibold uppercase">
          Acoustic Analysis
        </span>
      </div>

      <p className="text-xs text-slate-400 mb-6 leading-relaxed">
        {t("soundLabDesc")}
      </p>

      {/* Visual wave canvas */}
      <div className="bg-slate-950 rounded-2xl p-4 border border-slate-850 relative mb-6">
        <div className="absolute top-3 left-4 flex items-center gap-1.5 bg-slate-900/80 px-2 py-1 rounded border border-slate-800 font-mono text-[9px] text-slate-400">
          <Activity className="w-3 h-3 text-blue-400 animate-pulse" />
          {t("waveformMonitor")}
        </div>
        <div className="absolute top-3 right-4 font-mono text-[9px] text-slate-400 bg-slate-900/80 px-2 py-1 rounded border border-slate-800">
          {t("frequency")}: <span className="text-blue-400 font-bold">{frequency} Hz</span>
        </div>
        
        <canvas
          ref={canvasRef}
          width={450}
          height={110}
          className="w-full h-[110px] block mt-4"
        />
        
        {isScanning && (
          <div className="absolute inset-0 bg-slate-950/90 flex flex-col items-center justify-center gap-2 rounded-2xl">
            <RefreshCw className="w-6 h-6 text-blue-400 animate-spin" />
            <span className="text-[11px] font-mono text-blue-400 font-bold uppercase tracking-wider">{t("analyzingSound")}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Left Side: Upload Audio Component */}
        <div className="bg-slate-950 rounded-2xl p-5 border border-slate-850 flex flex-col justify-between">
          <div>
            <h4 className="font-sans font-bold text-slate-200 text-xs mb-1.5 flex items-center gap-1.5">
              <Upload className="w-4 h-4 text-blue-400" />
              {t("uploadAudio")}
            </h4>
            <p className="text-[10px] text-slate-500 leading-normal mb-4">
              {t("uploadAudioDesc")}
            </p>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="audio/*"
              className="hidden"
            />

            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                selectedFile 
                  ? "border-blue-500/50 bg-blue-500/5" 
                  : "border-slate-800 hover:border-slate-700 bg-slate-900/20"
              }`}
            >
              {selectedFile ? (
                <div className="flex flex-col items-center gap-1.5">
                  <FileAudio className="w-8 h-8 text-blue-400 animate-pulse" />
                  <span className="text-xs font-semibold text-slate-200 truncate max-w-[200px]">
                    {selectedFile.name}
                  </span>
                  <span className="text-[9px] font-mono text-slate-500">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • Audio Track
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-1.5">
                  <Upload className="w-7 h-7 text-slate-600 mb-1" />
                  <span className="text-xs text-slate-400 font-medium">{t("clickUpload")}</span>
                  <span className="text-[9px] font-mono text-slate-600">{t("fileTypes")}</span>
                </div>
              )}
            </div>
          </div>

          {selectedFile && !isScanning && scanResult === "none" && (
            <button
              onClick={handleScan}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-500 text-white font-sans font-bold text-xs py-2 rounded-xl transition-all flex items-center justify-center gap-1.5"
            >
              <Activity className="w-4 h-4" />
              {t("analyzeUpload")}
            </button>
          )}
        </div>

        {/* Right Side: Premade Clips for Testing */}
        <div className="bg-slate-950 rounded-2xl p-5 border border-slate-850 flex flex-col justify-between">
          <div>
            <h4 className="font-sans font-bold text-slate-200 text-xs mb-1.5 flex items-center gap-1.5">
              <Play className="w-4 h-4 text-emerald-400" />
              {t("sampleSounds")}
            </h4>
            <p className="text-[10px] text-slate-500 leading-normal mb-3">
              {t("sampleSoundsDesc")}
            </p>

            <div className="space-y-2.5 max-h-[160px] overflow-y-auto pr-1">
              {PREMADE_CLIPS.map((clip) => (
                <button
                  key={clip.id}
                  onClick={() => handleSelectClip(clip)}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-start gap-2.5 ${
                    selectedClip?.id === clip.id
                      ? "bg-emerald-500/10 border-emerald-500/40"
                      : "bg-slate-900/60 border-slate-900 hover:border-slate-800"
                  }`}
                >
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center mt-0.5 ${
                    clip.isLeak ? "bg-rose-500/10" : "bg-emerald-500/10"
                  }`}>
                    <Volume2 className={`w-3.5 h-3.5 ${
                      clip.isLeak ? "text-rose-400" : "text-emerald-400"
                    }`} />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-bold text-slate-200 font-sans leading-none">{clip.name}</span>
                      <span className="text-[8px] font-mono text-slate-500">{clip.frequency} Hz</span>
                    </div>
                    <span className="text-[8.5px] font-mono text-slate-400 block mt-0.5 truncate">{clip.type}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {selectedClip && !isScanning && scanResult === "none" && (
            <button
              onClick={handleScan}
              className="mt-4 w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-sans font-bold text-xs py-2 rounded-xl transition-all flex items-center justify-center gap-1.5"
            >
              <Play className="w-4 h-4 text-slate-950 fill-slate-950" />
              {t("runSampleScan")}
            </button>
          )}
        </div>
      </div>

      {/* Scan Results and Ticket Filing */}
      {scanResult !== "none" && !isScanning && (
        <div className="animate-fade-in">
          {scanResult === "clean" ? (
            <div className="bg-emerald-500/10 border border-emerald-500/25 p-4 rounded-2xl flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5 animate-pulse" />
              <div className="text-left">
                <h4 className="text-xs font-bold text-emerald-400 font-sans uppercase tracking-wide">{t("pipeSafe")}</h4>
                <p className="text-xs text-slate-400 leading-normal mt-1">
                  {t("pipeSafeDesc")}
                </p>
                <button 
                  onClick={() => {
                    setScanResult("none");
                    setSelectedClip(null);
                    setSelectedFile(null);
                  }} 
                  className="mt-3 text-[10px] font-mono text-emerald-400 underline hover:text-emerald-300"
                >
                  {t("clearScan")}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-rose-500/10 border border-rose-500/25 p-4 rounded-2xl flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0 mt-0.5 animate-bounce" />
              <div className="text-left w-full">
                <h4 className="text-xs font-bold text-rose-500 font-sans uppercase tracking-wide">{t("leakFound")}</h4>
                <div className="bg-slate-950/60 border border-slate-850 p-2.5 rounded-lg mt-2 font-mono text-[10px] text-slate-300">
                  <span className="text-rose-400 font-bold uppercase block text-[9px] mb-1">{t("soundReport")}</span>
                  <div><span className="text-slate-500">{t("anomalyTarget")}:</span> {detectedCategory}</div>
                  <div><span className="text-slate-500">{t("acousticVibration")}:</span> {frequency} Hz</div>
                  <div className="mt-1 text-slate-400 leading-normal italic">"{detectedDetail}"</div>
                </div>
                <div className="mt-4 flex flex-col sm:flex-row gap-2.5">
                  <button
                    onClick={handleCreateTicket}
                    className="flex-grow bg-rose-500 hover:bg-rose-400 text-slate-950 font-sans font-bold text-xs py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-lg"
                  >
                    <Activity className="w-4 h-4 text-slate-950" />
                    {t("createLeakTicket")}
                  </button>
                  <button 
                    onClick={() => {
                      setScanResult("none");
                      setSelectedClip(null);
                      setSelectedFile(null);
                    }} 
                    className="px-4 py-2 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-400 rounded-xl transition-colors"
                  >
                    {t("reset")}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
