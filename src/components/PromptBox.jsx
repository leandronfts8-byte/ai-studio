import GenerateButton from "./GenerateButton";
import { getRandomPrompt } from "../utils/randomPrompt";
import { styles } from "../data/styles";

export default function PromptBox({
  prompt,
  setPrompt,
  gerarImagem,
  loading,
  style,
  setStyle,
  resolution,
  setResolution,
  model,
  setModel,
  seed,
  setSeed,
  manualSeed,
  setManualSeed,
  negativePrompt,
  setNegativePrompt,
}) {
  function surpreender() {
    setPrompt(getRandomPrompt());
  }

  return (
    <div className="bg-slate-900 p-6 rounded-2xl">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Descreva a imagem..."
        className="w-full h-36 rounded-xl bg-slate-800 p-4 border border-slate-700"
      />
      <button
        onClick={surpreender}
        className="bg-purple-600 px-4 py-2 rounded-xl hover:bg-purple-700 transition"
      >
        🎲 Surpreenda-me
      </button>
      <div className="grid grid-cols-2 gap-3 mt-3">
        <div>
          <label className="block text-sm text-slate-400 mb-1">Estilo</label>

          <select
            value={style.id}
            onChange={(e) =>
              setStyle(styles.find((s) => s.id === e.target.value))
            }
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3"
          >
            {styles.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-1">Resolução</label>
          <select
            value={resolution}
            onChange={(e) => setResolution(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3"
          >
            <option value="512">512 x 512</option>
            <option value="768">768 x 768</option>
            <option value="1024">1024 x 1024</option>
            <option value="1536">1536 x 1536</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-3">
        <div>
          <label className="block text-sm text-slate-400 mb-1">Modelo</label>

          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3"
          >
            <option value="flux">Flux</option>
            <option value="turbo">Turbo</option>
            <option value="sana">sana</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">Seed</label>

          <select
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3"
          >
            <option value="auto">Auto</option>
            <option value="manual">Manual</option>
          </select>
        </div>
      </div>
      {seed === "manual" && (
        <div className="mt-3">
          <label className="block text-sm text-slate-400 mb-1">
            Valor da Seed
          </label>

          <input
            type="number"
            value={manualSeed}
            onChange={(e) => setManualSeed(e.target.value)}
            placeholder="Ex.: 123456"
            className="w-full rounded-lg bg-slate-800 px-4 py-2"
          />
        </div>
      )}
      <div className="mt-4">
        <label className="block text-sm text-slate-400 mb-1">
          Prompt Negativo
        </label>

        <textarea
          value={negativePrompt}
          onChange={(e) => setNegativePrompt(e.target.value)}
          placeholder="Descreva o que você NÃO quer na imagem..."
          rows={3}
          className="w-full rounded-lg bg-slate-800 p-4 py-3 resize-none"
        />
      </div>

      <div className="mt-4 flex gap-4">
        <div className="mt-6 flex justify-center">
          <GenerateButton gerarImagem={gerarImagem} loading={loading} />
        </div>
      </div>
    </div>
  );
}
