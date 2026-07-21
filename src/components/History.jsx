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
  sortBY,
  setSortBY,
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
      if (sortBY === "recent") {
        return b.id - a.id;
      }
      if (sortBY === "oldest") {
        return a.id - b.id;
      }
      if (a.favorite === b.favorite) return 0;
      return a.favorite ? -1 : 1;
    });
  const totalfavoritas = history.filter((item) => item.favorite).length;

  return (
    <section className="max-w-5xl mx-auto px-6 pb-10">
      <div className="flex items-center mb-5">
        <h2 className="text-xl font-bold">Histórico</h2>
        <div className="ml-auto text-sm text-slate-400">
          {history.length} imagem(ns) . ⭐ {totalfavoritas} favorita(s)
        </div>
      </div>
      <input
        type="text"
        placeholder="🔎 Pesquisar..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-5 rounded-lg bg-slate-800 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="mb-5">
        <select
          value={sortBY}
          onChange={(e) => setSortBY(e.target.value)}
          className="w-full rounded-lg bg-slate-800 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="favorites">⭐ Favoritos primeiro</option>
          <option value="recent">🆕 Mais recentes</option>
          <option value="oldest">🕒 Mais antigas</option>
        </select>
      </div>
      <div className="flex justify-end mb-5">
        <button
          onClick={abrirModal}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm transition"
        >
          🗑️ Limpar Histórico
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredHistory.map((item) => (
          <HistoryItem
            key={item.id}
            item={item}
            restaurarImagem={restaurarImagem}
            removerImagem={removerImagem}
            alternarFavorito={alternarFavorito}
            mostrarToast={mostrarToast}
          />
        ))}
      </div>
    </section>
  );
}
