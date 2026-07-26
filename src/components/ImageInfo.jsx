import { useState } from "react";

export default function ImageInfo({ settings }) {
  const [open, setOpen] = useState(false);

  const {
    prompt,
    style,
    model,
    resolution,
    aspectRatio,
    seed,
    createdAt,
    negativePrompt,
  } = settings;

  const summary = prompt
    ? `${style?.name || "-"} · ${model} · ${resolution}px · ${aspectRatio} · ${seed}`
    : "Nenhuma imagem gerada";

  const infoItems = [
    { label: "🎨 Estilo", value: style?.name || "-" },
    { label: "🤖 Modelo", value: model || "-" },
    { label: "📐 Proporção", value: aspectRatio || "-" },
    { label: "📏 Resolução", value: resolution ? `${resolution}px` : "-" },
    { label: "🌱 Seed", value: seed || "-" },
    { label: "📅 Gerada em", value: createdAt || "-" },
  ];

  return (
    <div className="glass rounded-2xl mt-6 overflow-hidden transition-all duration-300">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full p-5 text-left hover:bg-slate-800/30 transition-colors group"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">🖼️</span>
          <span className="font-semibold">Informações da imagem</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 max-w-[300px] truncate">
            {summary}
          </span>
          <span
            className={`text-xs text-slate-400 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </div>
      </button>

      {open && (
        <div className="border-t border-slate-700/30 p-5 animate-slide-up">
          <div className="mb-4">
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1.5">
              📝 Prompt
            </p>
            <p className="text-sm text-slate-300 bg-slate-800/50 rounded-lg p-3 break-words leading-relaxed">
              {prompt || "-"}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {infoItems.map((item) => (
              <div key={item.label} className="bg-slate-800/30 rounded-lg p-3">
                <p className="text-xs text-slate-500 mb-1">{item.label}</p>
                <p className="text-sm font-medium text-slate-200">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {negativePrompt && (
            <div className="mt-4">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-1.5">
                🚫 Prompt Negativo
              </p>
              <p className="text-sm text-slate-400 bg-slate-800/50 rounded-lg p-3 break-words">
                {negativePrompt}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
