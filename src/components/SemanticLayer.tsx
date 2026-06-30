import React from "react";
import { CivicSchedule } from "../types";
import { Database, GitMerge, AlertOctagon, HelpCircle } from "lucide-react";

interface SemanticLayerProps {
  schedules: CivicSchedule[];
  t: (key: string) => string;
}

export default function SemanticLayer({ schedules, t }: SemanticLayerProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
      <div className="flex items-center gap-2 mb-3">
        <GitMerge className="w-5 h-5 text-indigo-400" />
        <h3 className="font-sans font-semibold text-slate-200 text-sm">
          {t("interopLog")}
        </h3>
      </div>
      <p className="text-[11px] text-slate-400 mb-4 leading-relaxed">
        {t("departmentCheckDesc")}
      </p>

      {/* Legacy database siloes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        {/* Silo 1 */}
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-850">
          <div className="flex items-center gap-1.5 mb-2 border-b border-slate-850 pb-1">
            <Database className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span className="text-[9px] font-mono font-bold text-slate-300">{t("waterBoardDb")}</span>
          </div>
          <div className="space-y-1 font-mono text-[8.5px] text-slate-500 text-left">
            <div><span className="text-blue-400">TABLE_NAME:</span> Sewer_Pipe_Overhaul</div>
            <div><span className="text-blue-400">LOC_CODE:</span> RAJPUR_RD_S3</div>
            <div><span className="text-blue-400">WORK_ST:</span> 2026-07-20</div>
            <div><span className="text-blue-400">STATUS:</span> ACTIVE_PLANNED</div>
          </div>
        </div>

        {/* Silo 2 */}
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-850">
          <div className="flex items-center gap-1.5 mb-2 border-b border-slate-850 pb-1">
            <Database className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
            <span className="text-[9px] font-mono font-bold text-slate-300">{t("electricityDb")}</span>
          </div>
          <div className="space-y-1 font-mono text-[8.5px] text-slate-500 text-left">
            <div><span className="text-yellow-400">OBJECT_ID:</span> GR_TRENCH_202</div>
            <div><span className="text-yellow-400">LOC_GPS:</span> Karanpur Crossing</div>
            <div><span className="text-yellow-400">SCH_DATE:</span> 2026-08-05</div>
            <div><span className="text-yellow-400">OP_CODE:</span> HT_CABLE_UNDERGROUND</div>
          </div>
        </div>

        {/* Silo 3 */}
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-850">
          <div className="flex items-center gap-1.5 mb-2 border-b border-slate-850 pb-1">
            <Database className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="text-[9px] font-mono font-bold text-slate-300">{t("pavingDb")}</span>
          </div>
          <div className="space-y-1 font-mono text-[8.5px] text-slate-500 text-left">
            <div><span className="text-amber-500">p_id:</span> P_REPAVING_1092</div>
            <div><span className="text-amber-500">loc_name:</span> Rajpur Main Road</div>
            <div><span className="text-amber-500">t_target:</span> 2026-06-30</div>
            <div><span className="text-amber-500">crew_grp:</span> Highway_Paving_A</div>
          </div>
        </div>
      </div>

      {/* Autonomous Semantic Translator Feed */}
      <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 relative text-left">
        <h4 className="text-[10px] font-mono text-indigo-400 border-b border-slate-850 pb-1.5 mb-2 flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping inline-block" />
          {t("departmentFeed")}
        </h4>
        <div className="space-y-2 font-mono text-[9px] leading-relaxed text-slate-400">
          <div className="flex gap-1.5">
            <span className="text-indigo-400 shrink-0">[11:24:15 UTC]</span>
            <span>{t("departmentFeedOne")}</span>
          </div>
          <div className="flex gap-1.5">
            <span className="text-indigo-400 shrink-0">[11:24:16 UTC]</span>
            <span>{t("departmentFeedTwo")}</span>
          </div>
          <div className="flex gap-1.5 border-t border-slate-850 pt-2 text-rose-400 font-semibold items-start">
            <AlertOctagon className="w-4 h-4 text-rose-500 shrink-0 mr-1 mt-0.5" />
            <div>
              <span>{t("departmentWarning")}</span>
              <p className="text-[9px] text-slate-500 font-normal mt-0.5 leading-tight">
                {t("departmentWarningDesc")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
