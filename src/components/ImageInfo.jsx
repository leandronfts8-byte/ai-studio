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

  return (
    <div className="bg-slate-900 rounded-2xl mt-6 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-800 transition-colors"
      >
        <div>
          <h2 className="text-lg font-semibold">🖼️ Informações da imagem</h2>

          <p className="text-sm text-slate-400 mt-1">
            {model} • {aspectRatio} • {resolution}px
          </p>
        </div>

        <span className="text-2xl text-slate-400">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="border-t border-slate-800 p-5">
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-slate-400 mb-1">📝 Prompt</p>
              <p className="break-words">{prompt}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-slate-400 mb-1">🎨 Estilo</p>
                <p>{style.name}</p>
              </div>

              <div>
                <p className="text-slate-400 mb-1">🤖 Modelo</p>
                <p>{model}</p>
              </div>

              <div>
                <p className="text-slate-400 mb-1">📐 Aspect Ratio</p>
                <p>{aspectRatio}</p>
              </div>

              <div>
                <p className="text-slate-400 mb-1">📏 Resolução</p>
                <p>{resolution}px</p>
              </div>
            </div>

            <div>
              <p className="text-slate-400 mb-1">🌱 Seed</p>
              <p>{seed}</p>
            </div>

            <div>
              <p className="text-slate-400 mb-1">📅 Gerada em</p>
              <p>{createdAt || "-"}</p>
            </div>

            <div>
              <p className="text-slate-400 mb-1">🚫 Prompt Negativo</p>
              <p className="break-words">{negativePrompt || "Nenhum"}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
