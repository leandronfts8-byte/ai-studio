export default function PromptInput({ prompt, setPrompt, surpreender }) {
  return (
    <div className="space-y-3">
      <div className="relative">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Descreva a imagem que deseja gerar..."
          className="w-full h-32 rounded-xl bg-slate-800/80 p-4 pr-12 border border-slate-700/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none resize-none transition-all duration-200 text-sm leading-relaxed placeholder:text-slate-500"
        />
        <div className="absolute bottom-3 right-3 text-xs text-slate-600">
          {prompt.length} caracteres
        </div>
      </div>

      <button
        onClick={surpreender}
        className="group flex items-center gap-2 text-sm text-slate-400 hover:text-purple-400 transition-colors duration-200"
      >
        <span className="inline-block transition-transform duration-200 group-hover:rotate-180">
          🎲
        </span>
        Surpreenda-me com um prompt aleatório
      </button>
    </div>
  );
}
