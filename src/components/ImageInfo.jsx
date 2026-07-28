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

  const summary = `${style?.name || "-"} · ${resolution ? `${resolution}px` : "-"} · ${aspectRatio || "-"} · ${model || "-"} · ${seed || "-"}`;

  return (
    <div className="glass rounded-2xl mt-4 overflow-hidden transition-all duration-300">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-800/30 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-300">
            🖼️ Informações da Imagem
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500">{summary}</span>
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
            <p className="text-xs text-slate-500 mb-1.5 uppercase tracking-wider">
              📝 Prompt
            </p>
            <p className="text-sm text-slate-300 bg-slate-800/50 rounded-lg p-3 break-words leading-relaxed">
              {prompt || "-"}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-slate-800/30 rounded-lg p-3">
              <p className="text-xs text-slate-500 mb-1">🎨 Estilo</p>
              <p className="text-sm font-medium text-slate-200">
                {style?.name || "-"}
              </p>
            </div>
            <div className="bg-slate-800/30 rounded-lg p-3">
              <p className="text-xs text-slate-500 mb-1">🤖 Modelo</p>
              <p className="text-sm font-medium text-slate-200">
                {model || "-"}
              </p>
            </div>
            <div className="bg-slate-800/30 rounded-lg p-3">
              <p className="text-xs text-slate-500 mb-1">📐 Proporção</p>
              <p className="text-sm font-medium text-slate-200">
                {aspectRatio || "-"}
              </p>
            </div>
            <div className="bg-slate-800/30 rounded-lg p-3">
              <p className="text-xs text-slate-500 mb-1">📏 Resolução</p>
              <p className="text-sm font-medium text-slate-200">
                {resolution ? `${resolution}px` : "-"}
              </p>
            </div>
            <div className="bg-slate-800/30 rounded-lg p-3">
              <p className="text-xs text-slate-500 mb-1">🌱 Seed</p>
              <p className="text-sm font-medium text-slate-200">
                {seed || "-"}
              </p>
            </div>
            <div className="bg-slate-800/30 rounded-lg p-3">
              <p className="text-xs text-slate-500 mb-1">📅 Gerada em</p>
              <p className="text-sm font-medium text-slate-200">
                {createdAt || "-"}
              </p>
            </div>
          </div>

          {negativePrompt && (
            <div className="mt-4">
              <p className="text-xs text-slate-500 mb-1.5 uppercase tracking-wider">
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
