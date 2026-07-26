import HistoryItem from "./HistoryItem";

export default function History({
  history,
  search,
  setSearch,
  restaurarImagem,
  removerImagem,
  alternarFavorito,
  abrirModal,
  mostrarToast,
  sortBy,
  setSortBy,
}) {
  if (history.length === 0) {
    return null;
  }

  const filteredHistory = history
    .filter((item) => {
      const texto = search.toLowerCase();
      return (
        item.prompt.toLowerCase().includes(texto) ||
        item.style.toLowerCase().includes(texto)
      );
    })
    .sort((a, b) => {
      if (sortBy === "recent") {
        return b.id - a.id;
      }
      if (sortBy === "oldest") {
        return a.id - b.id;
      }
      if (a.favorite === b.favorite) return 0;
      return a.favorite ? -1 : 1;
    });

  const totalFavoritas = history.filter((item) => item.favorite).length;

  return (
    <section className="max-w-5xl mx-auto px-6 pb-10">
      <div className="glass rounded-2xl p-6 mt-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">Histórico</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {history.length} imagem(ns) · ⭐ {totalFavoritas} favorita(s)
            </p>
          </div>
          <button
            onClick={abrirModal}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-red-600/10 text-red-400 border border-red-500/20 hover:bg-red-600/20 hover:border-red-500/40 transition-all duration-200"
          >
            🗑️ Limpar
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
              🔎
            </span>
            <input
              type="text"
              placeholder="Pesquisar no histórico..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl bg-slate-800/80 border border-slate-700/50 pl-10 pr-4 py-2.5 text-sm outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-xl bg-slate-800/80 border border-slate-700/50 px-4 py-2.5 text-sm outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 min-w-[160px]"
          >
            <option value="favorites">⭐ Favoritos primeiro</option>
            <option value="recent">🆕 Mais recentes</option>
            <option value="oldest">🕒 Mais antigas</option>
          </select>
        </div>

        {filteredHistory.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <p className="text-lg mb-1">🔍</p>
            <p className="text-sm">Nenhum resultado encontrado</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredHistory.map((item) => (
              <div key={item.id} className="animate-fade-in">
                <HistoryItem
                  item={item}
                  restaurarImagem={restaurarImagem}
                  removerImagem={removerImagem}
                  alternarFavorito={alternarFavorito}
                  mostrarToast={mostrarToast}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
