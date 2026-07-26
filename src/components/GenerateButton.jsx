export default function GenerateButton({ gerarImagem, loading }) {
  return (
    <div className="mt-6">
      <button
        onClick={gerarImagem}
        disabled={loading}
        className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 p-[2px] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30"
      >
        <div className="relative flex items-center justify-center gap-3 rounded-xl bg-slate-800/90 px-6 py-3.5 transition-all duration-300 group-hover:bg-slate-800/70">
          {loading ? (
            <>
              <div className="w-5 h-5 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />
              <span className="font-semibold text-blue-400">Gerando...</span>
            </>
          ) : (
            <>
              <span className="text-lg">✨</span>
              <span className="font-semibold text-white">Gerar Imagem</span>
              <kbd className="hidden sm:inline-flex items-center gap-1 rounded-md bg-slate-700/70 px-2 py-0.5 text-xs text-slate-300">
                Ctrl + Enter
              </kbd>
            </>
          )}
        </div>
      </button>
    </div>
  );
}
