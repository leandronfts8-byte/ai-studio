export default function GenerateButton({ gerarImagem, loading }) {
  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={gerarImagem}
        disabled={loading}
        className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 p-[2px] shadow-lg shadow-blue-600/20 transition-all duration-300 hover:scale-[1.01] hover:shadow-blue-600/30 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
      >
        <div
          className={`relative flex min-h-[52px] items-center justify-center gap-3 rounded-[10px] px-6 py-3.5 transition-all duration-300 ${
            loading
              ? "bg-slate-900/95"
              : "bg-slate-800/90 group-hover:bg-slate-800/70"
          }`}
        >
          {loading ? (
            <>
              <span
                className="h-5 w-5 animate-spin rounded-full border-2 border-blue-400 border-t-transparent"
                aria-hidden="true"
              />

              <span className="font-semibold text-blue-400">
                Gerando imagem...
              </span>
            </>
          ) : (
            <>
              <span
                className="text-lg transition-transform duration-300 group-hover:scale-110"
                aria-hidden="true"
              >
                ✨
              </span>

              <span className="font-semibold text-white">Gerar Imagem</span>

              <kbd className="hidden items-center gap-1 rounded-md border border-slate-600/50 bg-slate-700/70 px-2 py-0.5 text-xs text-slate-300 sm:inline-flex">
                Ctrl + Enter
              </kbd>
            </>
          )}
        </div>
      </button>

      {!loading && (
        <p className="mt-2 text-center text-[11px] text-slate-600">
          Configure os parâmetros acima ou gere com as configurações atuais.
        </p>
      )}
    </div>
  );
}
