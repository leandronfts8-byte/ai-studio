import HistoryItem from "./HistoryItem";

export default function History({
  history,
  search,
  setSearch,
  restaurarImagem,
  removerImagem,
  alternarFavorito,
  abrirModal,
}) {
  if (history.length === 0) {
    return null;
  }

  const filteredHistory = history.filter((item) =>
    item.prompt.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <section className="max-w-5xl mx-auto px-6 pb-10">
      <div className="flex items-center mb-5">
        <h2 className="text-xl font-bold">Histórico</h2>
        <div className="ml-auto text-sm text-slate-400">
          {history.length} imagem(ns)
        </div>
      </div>
      <input
        type="text"
        placeholder="🔎 Pesquisar..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-5 rounded-lg bg-slate-800 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
      />
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
          />
        ))}
      </div>
    </section>
  );
}
