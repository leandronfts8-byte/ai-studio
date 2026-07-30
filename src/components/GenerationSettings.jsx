import { useState } from "react";
import { styles } from "../data/styles";

export default function GenerationSettings({
  style,
  setStyle,
  resolution,
  setResolution,
  aspectRatio,
  setAspectRatio,
  model,
  setModel,
  seed,
  setSeed,
  manualSeed,
  setManualSeed,
  negativePrompt,
  setNegativePrompt,
}) {
  const [open, setOpen] = useState(false);

  const summary = `${style.name} · ${resolution}px · ${aspectRatio} · ${
    model === "flux" ? "Flux" : model === "turbo" ? "Turbo" : "Sana"
  } · ${seed === "manual" ? manualSeed || "Manual" : "🎲 Auto"}`;

  return (
    <div className="mt-5">
      {/* Cabeçalho das configurações */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full rounded-xl border border-slate-700/40 bg-slate-800/30 px-4 py-3 text-left transition-all duration-200 hover:bg-slate-800/50 hover:border-slate-600/50"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-700/50 text-sm">
              ⚙️
            </span>

            <div>
              <p className="text-sm font-medium text-slate-300">
                Configurações
              </p>

              <p className="text-[11px] text-slate-500">
                Personalize a geração da imagem
              </p>
            </div>
          </div>

          <span
            className={`shrink-0 text-xs text-slate-400 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </div>

        {!open && (
          <div className="mt-3 border-t border-slate-700/30 pt-3">
            <p className="truncate text-xs text-slate-500">{summary}</p>
          </div>
        )}
      </button>

      {/* Conteúdo */}
      {open && (
        <div className="mt-3 rounded-xl border border-slate-700/30 bg-slate-800/20 p-4 animate-slide-up">
          {/* Estilo + Resolução */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-slate-500">
                🎨 Estilo
              </label>

              <select
                value={style.id}
                onChange={(e) =>
                  setStyle(styles.find((s) => s.id === e.target.value))
                }
                className="w-full rounded-xl border border-slate-700/50 bg-slate-800/80 p-2.5 text-sm text-slate-200 outline-none transition-all duration-200 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
              >
                {styles.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-slate-500">
                📐 Resolução
              </label>

              <select
                value={resolution}
                onChange={(e) => setResolution(e.target.value)}
                className="w-full rounded-xl border border-slate-700/50 bg-slate-800/80 p-2.5 text-sm text-slate-200 outline-none transition-all duration-200 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="512">512 × 512</option>
                <option value="768">768 × 768</option>
                <option value="1024">1024 × 1024</option>
                <option value="1536">1536 × 1536</option>
              </select>
            </div>
          </div>

          {/* Aspect Ratio */}
          <div className="mt-5">
            <label className="mb-2 block text-[11px] font-medium uppercase tracking-wider text-slate-500">
              🖼️ Proporção da imagem
            </label>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
              {[
                { value: "1:1", label: "1:1", icon: "⬜" },
                { value: "16:9", label: "16:9", icon: "🖥️" },
                { value: "9:16", label: "9:16", icon: "📱" },
                { value: "3:2", label: "3:2", icon: "📷" },
                { value: "2:3", label: "2:3", icon: "📸" },
              ].map((opt) => {
                const selected = aspectRatio === opt.value;

                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setAspectRatio(opt.value)}
                    className={`flex flex-col items-center justify-center gap-1 rounded-xl border p-2.5 text-xs transition-all duration-200 ${
                      selected
                        ? "border-blue-500/50 bg-blue-600/20 text-blue-400 shadow-sm shadow-blue-500/10"
                        : "border-slate-700/30 bg-slate-800/60 text-slate-400 hover:border-slate-600/50 hover:bg-slate-700/60 hover:text-slate-300"
                    }`}
                  >
                    <span className="text-base">{opt.icon}</span>
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Modelo + Seed */}
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-slate-500">
                🤖 Modelo
              </label>

              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full rounded-xl border border-slate-700/50 bg-slate-800/80 p-2.5 text-sm text-slate-200 outline-none transition-all duration-200 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="flux">Flux</option>
                <option value="turbo">Turbo</option>
                <option value="sana">Sana</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-slate-500">
                🎲 Seed
              </label>

              <select
                value={seed}
                onChange={(e) => setSeed(e.target.value)}
                className="w-full rounded-xl border border-slate-700/50 bg-slate-800/80 p-2.5 text-sm text-slate-200 outline-none transition-all duration-200 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="auto">🎲 Automática</option>
                <option value="manual">✏️ Manual</option>
              </select>
            </div>
          </div>

          {/* Seed manual */}
          {seed === "manual" && (
            <div className="mt-4 animate-slide-up">
              <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-slate-500">
                🔢 Valor da Seed
              </label>

              <input
                type="number"
                value={manualSeed}
                onChange={(e) => setManualSeed(e.target.value)}
                placeholder="Ex.: 12345"
                className="w-full rounded-xl border border-slate-700/50 bg-slate-800/80 px-4 py-2.5 text-sm text-slate-200 outline-none transition-all duration-200 placeholder:text-slate-600 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          )}

          {/* Prompt negativo */}
          <div className="mt-5">
            <div className="mb-1.5 flex items-center justify-between">
              <label className="block text-[11px] font-medium uppercase tracking-wider text-slate-500">
                🚫 Prompt negativo
              </label>

              <span className="text-[10px] text-slate-600">Opcional</span>
            </div>

            <textarea
              value={negativePrompt}
              onChange={(e) => setNegativePrompt(e.target.value)}
              placeholder="O que você NÃO quer na imagem..."
              rows={2}
              className="w-full resize-none rounded-xl border border-slate-700/50 bg-slate-800/80 p-3 text-sm text-slate-200 outline-none transition-all duration-200 placeholder:text-slate-600 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>
      )}
    </div>
  );
}
