export default function PromptInput({
  prompt,
  setPrompt,
  surpreender,
  onSavePrompt,
}) {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
            <span>✨</span>
            Prompt
          </label>

          <span className="text-xs text-slate-500">
            {prompt.length} caracteres
          </span>
        </div>

        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Descreva a imagem que deseja gerar..."
            className="w-full h-32 rounded-xl bg-slate-800/80 p-4 border border-slate-700/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none resize-none transition-all duration-200 text-sm leading-relaxed placeholder:text-slate-500"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <button
          type="button"
          onClick={surpreender}
          className="group flex items-center justify-center gap-2 text-xs font-medium px-3 py-2 rounded-lg text-purple-400 bg-purple-600/10 border border-purple-500/20 hover:bg-purple-600/20 hover:border-purple-500/40 hover:text-purple-300 transition-all duration-200"
        >
          <span className="inline-block transition-transform duration-200 group-hover:rotate-180">
            🎲
          </span>

          <span>Surpreenda-me com um prompt aleatório</span>
        </button>

        <button
          type="button"
          onClick={onSavePrompt}
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-cyan-600/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-600/20 hover:border-cyan-500/40 transition-all duration-200"
        >
          💾 Salvar Prompt
        </button>
      </div>
    </div>
  );
}
