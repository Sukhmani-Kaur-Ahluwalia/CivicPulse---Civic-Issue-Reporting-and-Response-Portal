import React, { useState } from "react";
import { CivicIssue } from "../types";
import { ShieldCheck, ArrowDownUp, TrendingUp, AlertTriangle } from "lucide-react";

interface SocioeconomicTriageProps {
  issues: CivicIssue[];
  t: (key: string) => string;
}

export default function SocioeconomicTriage({ issues, t }: SocioeconomicTriageProps) {
  const [sortBy, setSortBy] = useState<"standard" | "equity">("equity");

  // Filter out resolved issues for dispatch ranking
  const activeIssues = issues.filter((i) => i.status !== "resolved");

  // Custom data decoration for comparison simulation
  const getSocioeconomicMetrics = (issueId: string, category: string) => {
    switch (issueId) {
      case "issue_1": // Large crater near Rajpur
        return { densityIndex: "High (Dense School Zone)", alternateInfra: "None", socioeconomicScore: 7.2, volume: 15 };
      case "issue_2": // Pipe burst flooding lane
        return { densityIndex: "Extreme (Arhat Commercial Bazar)", alternateInfra: "Siloed alternate supply", socioeconomicScore: 8.5, volume: 42 };
      case "issue_3": // Garbage pile Patel Nagar
        return { densityIndex: "Medium (Residential Cross)", alternateInfra: "Multiple bins nearby", socioeconomicScore: 4.8, volume: 8 };
      default:
        return { densityIndex: "High Density", alternateInfra: "Limited alternative", socioeconomicScore: 6.0, volume: Math.floor(Math.random() * 10) + 1 };
    }
  };

  const decoratedIssues = activeIssues.map((issue) => {
    const metrics = getSocioeconomicMetrics(issue.id, issue.category);
    // Calculated Equity Weight combining safety hazard (from AI Triage), density, and alternate infra gaps
    const calculatedEquity = Number(
      ((issue.vulnerabilityWeight * 0.5) + (metrics.socioeconomicScore * 0.5)).toFixed(1)
    );
    return {
      ...issue,
      ...metrics,
      calculatedEquity
    };
  });

  // Sort logic
  const sortedIssues = [...decoratedIssues].sort((a, b) => {
    if (sortBy === "equity") {
      return b.calculatedEquity - a.calculatedEquity;
    } else {
      return b.volume - a.volume;
    }
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="font-sans font-semibold text-slate-200 text-sm flex items-center gap-1.5">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            {t("equityWeightLabel")}
          </h3>
          <p className="text-[10px] text-slate-400 leading-normal mt-1 max-w-xl">
            {t("managerTriageDesc")}
          </p>
        </div>

        {/* Selector Toggle */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-850 self-start">
          <button
            onClick={() => setSortBy("standard")}
            className={`text-[10px] font-mono px-3 py-1.5 rounded-lg transition-all ${
              sortBy === "standard"
                ? "bg-amber-500 text-slate-950 font-bold"
                : "text-slate-400 hover:text-slate-300"
            }`}
          >
            {t("sortByReports")}
          </button>
          <button
            onClick={() => setSortBy("equity")}
            className={`text-[10px] font-mono px-3 py-1.5 rounded-lg transition-all ${
              sortBy === "equity"
                ? "bg-emerald-500 text-slate-950 font-bold"
                : "text-slate-400 hover:text-slate-300"
            }`}
          >
            {t("sortByPriority")}
          </button>
        </div>
      </div>

      {/* Comparison table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-850 text-slate-500 font-mono text-[9px] uppercase tracking-wider">
              <th className="py-2.5 px-2">{t("rank")}</th>
              <th className="py-2.5 px-2">{t("issueAndPlace")}</th>
              <th className="py-2.5 px-2">{t("areaCrowd")}</th>
              <th className="py-2.5 px-2">{t("otherOption")}</th>
              <th className="py-2.5 px-2 text-center">{t("reports")}</th>
              <th className="py-2.5 px-2 text-right">{t("priorityScore")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-850/50">
            {sortedIssues.map((issue, idx) => (
              <tr key={issue.id} className="text-[11px] hover:bg-slate-950/40 transition-colors">
                <td className="py-3 px-2 font-mono">
                  <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold ${
                    idx === 0 ? "bg-rose-500/20 text-rose-400 border border-rose-500/30" : "bg-slate-800 text-slate-400"
                  }`}>
                    #{idx + 1}
                  </span>
                </td>
                <td className="py-3 px-2">
                  <div className="font-sans font-medium text-slate-300 truncate max-w-[180px]">
                    {issue.title}
                  </div>
                  <div className="font-mono text-[8.5px] text-slate-500 mt-0.5">
                    {issue.plusCode}
                  </div>
                </td>
                <td className="py-3 px-2 text-slate-400 font-sans">
                  {issue.densityIndex}
                </td>
                <td className="py-3 px-2">
                  <span className={`px-1.5 py-0.5 rounded text-[8.5px] font-mono ${
                    issue.alternateInfra === "None" 
                      ? "bg-rose-500/10 text-rose-400 border border-rose-500/10" 
                      : "bg-slate-800 text-slate-400"
                  }`}>
                    {issue.alternateInfra}
                  </span>
                </td>
                <td className="py-3 px-2 text-center font-mono text-slate-400">
                  {issue.volume} {t("reports")}
                </td>
                <td className="py-3 px-2 text-right font-mono font-bold">
                  <span className={sortBy === "equity" ? "text-emerald-400" : "text-amber-500"}>
                    {issue.calculatedEquity} / 10.0
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sortBy === "equity" && (
        <div className="mt-3.5 bg-emerald-500/5 border border-emerald-500/10 p-2.5 rounded-xl flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-[10px] text-slate-400 font-mono">
            {t("priorityHelp")}
          </span>
        </div>
      )}
    </div>
  );
}
