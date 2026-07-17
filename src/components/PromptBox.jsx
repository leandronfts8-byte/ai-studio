import { getRandomPrompt } from "../utils/randomPrompt";
import { styles } from "../data/styles";

export default function PromptBox({
  prompt,
  setPrompt,
  gerarImagem,
  loading,
  style,
  setStyle,
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

      <div className="mt-4">
        <label className="block mb-2 text-sm text-slate-400">
          Estilo da imagem
        </label>

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

      <div className="mt-4 flex gap-4">
        <button
          onClick={surpreender}
          className="bg-purple-600 px-6 py-3 rounded-xl hover:bg-purple-700 transition"
        >
          🎲 Surpreenda-me
        </button>

        <button
          onClick={gerarImagem}
          disabled={loading}
          className="bg-blue-600 px-6 py-3 rounded-xl hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed transition"
        >
          {loading ? "Gerando..." : "Gerar Imagem"}
        </button>
      </div>
    </div>
  );
}
