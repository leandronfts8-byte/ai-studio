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
  return (
    <div className="space-y-4 mt-4">
      <div className="flex items-center gap-2 border-b border-slate-700/50 pb-2">
        <span className="text-sm font-medium text-slate-300">
          ⚙️ Configurações
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-slate-500 mb-1.5 uppercase tracking-wider">
            Estilo
          </label>
          <select
            value={style.id}
            onChange={(e) =>
              setStyle(styles.find((s) => s.id === e.target.value))
            }
            className="w-full bg-slate-800/80 border border-slate-700/50 rounded-xl p-2.5 text-sm outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
          >
            {styles.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs text-slate-500 mb-1.5 uppercase tracking-wider">
            Resolução
          </label>
          <select
            value={resolution}
            onChange={(e) => setResolution(e.target.value)}
            className="w-full bg-slate-800/80 border border-slate-700/50 rounded-xl p-2.5 text-sm outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
          >
            <option value="512">512 × 512</option>
            <option value="768">768 × 768</option>
            <option value="1024">1024 × 1024</option>
            <option value="1536">1536 × 1536</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs text-slate-500 mb-1.5 uppercase tracking-wider">
          Proporção (Aspect Ratio)
        </label>
        <div className="grid grid-cols-5 gap-2">
          {[
            { value: "1:1", label: "1:1", icon: "⬜" },
            { value: "16:9", label: "16:9", icon: "🖥️" },
            { value: "9:16", label: "9:16", icon: "📱" },
            { value: "3:2", label: "3:2", icon: "📷" },
            { value: "2:3", label: "2:3", icon: "📸" },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setAspectRatio(opt.value)}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl text-xs transition-all duration-200 ${
                aspectRatio === opt.value
                  ? "bg-blue-600/20 border border-blue-500/50 text-blue-400"
                  : "bg-slate-800/60 border border-slate-700/30 text-slate-400 hover:bg-slate-700/60 hover:border-slate-600/50"
              }`}
            >
              <span className="text-base">{opt.icon}</span>
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-slate-500 mb-1.5 uppercase tracking-wider">
            Modelo
          </label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full bg-slate-800/80 border border-slate-700/50 rounded-xl p-2.5 text-sm outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
          >
            <option value="flux">Flux</option>
            <option value="turbo">Turbo</option>
            <option value="sana">Sana</option>
          </select>
        </div>

        <div>
          <label className="block text-xs text-slate-500 mb-1.5 uppercase tracking-wider">
            Seed
          </label>
          <select
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
            className="w-full bg-slate-800/80 border border-slate-700/50 rounded-xl p-2.5 text-sm outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
          >
            <option value="auto">🎲 Automática</option>
            <option value="manual">✏️ Manual</option>
          </select>
        </div>
      </div>

      {seed === "manual" && (
        <div className="animate-slide-up">
          <label className="block text-xs text-slate-500 mb-1.5 uppercase tracking-wider">
            Valor da Seed
          </label>
          <input
            type="number"
            value={manualSeed}
            onChange={(e) => setManualSeed(e.target.value)}
            placeholder="Ex.: 12345"
            className="w-full rounded-xl bg-slate-800/80 border border-slate-700/50 px-4 py-2.5 text-sm outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
          />
        </div>
      )}

      <div>
        <label className="block text-xs text-slate-500 mb-1.5 uppercase tracking-wider">
          Prompt Negativo
        </label>
        <textarea
          value={negativePrompt}
          onChange={(e) => setNegativePrompt(e.target.value)}
          placeholder="O que você NÃO quer na imagem..."
          rows={2}
          className="w-full rounded-xl bg-slate-800/80 border border-slate-700/50 p-3 text-sm outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 resize-none transition-all duration-200 placeholder:text-slate-500"
        />
      </div>
    </div>
  );
}
