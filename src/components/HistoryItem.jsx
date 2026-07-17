export default function HistoryItem({
  item,
  restaurarImagem,
  removerImagem,
  alternarFavorito,
}) {
  async function baixarImagem(url) {
    try {
      const response = await fetch(url);

      const blob = await response.blob();

      const link = document.createElement("a");

      link.href = URL.createObjectURL(blob);

      link.download = "imagem-gerada.png";

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="bg-slate-900 rounded-xl overflow-hidden">
      <img
        src={item.imageUrl}
        alt={item.prompt}
        className="w-full aspect-square object-cover cursor-pointer"
        onClick={() => restaurarImagem(item)}
      />

      <div className="p-3 space-y-2">
        <p className="text-sm line-clamp-2">{item.prompt}</p>

        <div className="flex gap-2">
          <button
            onClick={() => baixarImagem(item.imageUrl)}
            className="bg-blue-600 px-3 py-1 rounded text-sm"
          >
            Baixar
          </button>

          <button
            onClick={() => removerImagem(item.id)}
            className="bg-red-600 px-3 py-1 rounded text-sm"
          >
            Excluir
          </button>

          <button
            onClick={() => alternarFavorito(item.id)}
            className="bg-yellow-500 px-3 py-1 rounded text-sm"
          >
            {item.favorite ? "★" : "☆"}
          </button>
        </div>
      </div>
    </div>
  );
}
