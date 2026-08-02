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

  const summary = `${style?.name || "-"} · ${
    resolution ? `${resolution}px` : "-"
  } · ${aspectRatio || "-"} · ${model || "-"} · ${seed || "-"}`;

  return (
    <div className="glass mt-4 overflow-hidden rounded-2xl transition-all duration-300">
      {/* Cabeçalho */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full px-5 py-4 text-left transition-colors hover:bg-slate-800/30"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-2">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-800/60 text-sm">
              ℹ️
            </span>

            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-300">
                Informações da imagem
              </p>

              {!open && (
                <p className="mt-0.5 truncate text-[11px] text-slate-600">
                  {summary}
                </p>
              )}
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
      </button>

      {/* Conteúdo */}
      {open && (
        <div className="border-t border-slate-700/30 p-5 animate-slide-up">
          {/* Prompt */}
          <div className="mb-5">
            <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wider text-slate-500">
              📝 Prompt
            </p>

            <p className="break-words rounded-xl border border-slate-700/30 bg-slate-800/40 p-3 text-sm leading-relaxed text-slate-300">
              {prompt || "-"}
            </p>
          </div>

          {/* Informações */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-700/20 bg-slate-800/30 p-3">
              <p className="mb-1 text-[11px] text-slate-500">🎨 Estilo</p>

              <p className="text-sm font-medium text-slate-200">
                {style?.name || "-"}
              </p>
            </div>

            <div className="rounded-xl border border-slate-700/20 bg-slate-800/30 p-3">
              <p className="mb-1 text-[11px] text-slate-500">🤖 Modelo</p>

              <p className="text-sm font-medium capitalize text-slate-200">
                {model || "-"}
              </p>
            </div>

            <div className="rounded-xl border border-slate-700/20 bg-slate-800/30 p-3">
              <p className="mb-1 text-[11px] text-slate-500">📐 Proporção</p>

              <p className="text-sm font-medium text-slate-200">
                {aspectRatio || "-"}
              </p>
            </div>

            <div className="rounded-xl border border-slate-700/20 bg-slate-800/30 p-3">
              <p className="mb-1 text-[11px] text-slate-500">📏 Resolução</p>

              <p className="text-sm font-medium text-slate-200">
                {resolution ? `${resolution}px` : "-"}
              </p>
            </div>

            <div className="rounded-xl border border-slate-700/20 bg-slate-800/30 p-3">
              <p className="mb-1 text-[11px] text-slate-500">🌱 Seed</p>

              <p className="break-words text-sm font-medium text-slate-200">
                {seed || "-"}
              </p>
            </div>

            <div className="rounded-xl border border-slate-700/20 bg-slate-800/30 p-3">
              <p className="mb-1 text-[11px] text-slate-500">📅 Gerada em</p>

              <p className="break-words text-sm font-medium text-slate-200">
                {createdAt || "-"}
              </p>
            </div>
          </div>

          {/* Prompt negativo */}
          {negativePrompt && (
            <div className="mt-5">
              <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                🚫 Prompt negativo
              </p>

              <p className="break-words rounded-xl border border-slate-700/30 bg-slate-800/40 p-3 text-sm leading-relaxed text-slate-400">
                {negativePrompt}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
