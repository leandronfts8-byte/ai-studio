import { getRandomPrompt } from "../utils/randomPrompt";

export default function PromptInput({ prompt, setPrompt }) {
  function surpreender() {
    setPrompt(getRandomPrompt());
  }

  return (
    <>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Descreva a imagem..."
        className="w-full h-36 rounded-xl bg-slate-800 p-4 border border-slate-700"
      />

      <button
        onClick={surpreender}
        className="mt-3 bg-purple-600 px-4 py-2 rounded-xl hover:bg-purple-700 transition"
      >
        🎲 Surpreenda-me
      </button>
    </>
  );
}
