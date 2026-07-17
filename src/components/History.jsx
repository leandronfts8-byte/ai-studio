import HistoryItem from "./HistoryItem";

export default function History({
  history,
  restaurarImagem,
  removerImagem,
  alternarFavorito,
}) {
  if (history.length === 0) {
    return null;
  }

  return (
    <section className="max-w-5xl mx-auto px-6 pb-10">
      <div className="flex items-center mb-5">
        <h2 className="text-xl font-bold">Histórico</h2>
        <div className="ml-auto text-sm text-slate-400">
          {history.length} imagem(ns)
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {history.map((item) => (
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
