import { downloadImage } from "../utils/downloadImage";

export default function HistoryItem({
  item,
  restaurarImagem,
  removerImagem,
  alternarFavorito,
  mostrarToast,
}) {
  return (
    <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800">
      <img
        src={item.imageUrl}
        alt={item.prompt}
        className="w-full aspect-square object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
        onClick={() => restaurarImagem(item)}
      />

      <div className="p-3 space-y-3">
        <p className="text-sm line-clamp-2 min-h-[40px]">{item.prompt}</p>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => alternarFavorito(item.id)}
            className="px-3 py-1 rounded-lg text-sm bg-yellow-500 text-black hover:bg-yellow-400 transition-colors"
            title="Favoritar"
          >
            {item.favorite ? "★" : "☆"}
          </button>

          <button
            onClick={() => {
              downloadImage(item.imageUrl);
              mostrarToast("Download iniciado");
            }}
            className="px-3 py-1 rounded-lg text-sm bg-blue-600 hover:bg-blue-500 transition-colors"
          >
            📥
          </button>

          <button
            onClick={() => removerImagem(item.id)}
            className="px-3 py-1 rounded-lg text-sm bg-red-600 hover:bg-red-500 transition-colors"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
