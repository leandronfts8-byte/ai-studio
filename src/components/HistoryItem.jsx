import { downloadImage } from "../utils/downloadImage";

export default function HistoryItem({
  item,
  onRestore,
  onDelete,
  onToggleFavorite,
  compareMode,
  compareIds,
  onToggleCompare,
}) {
  return (
    <div className="group bg-slate-900/60 rounded-xl overflow-hidden border border-slate-800/50 hover:border-slate-700/80 transition-all duration-300 card-shine">
      <div className="relative overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.prompt}
          className="w-full aspect-square object-cover cursor-pointer transition-all duration-500 group-hover:scale-110"
          onClick={() => onRestore(item)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-2 left-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRestore(item);
            }}
            className="px-2 py-1 rounded-md text-xs bg-black/60 text-white backdrop-blur-sm border border-white/10"
          >
            👁️ Visualizar
          </button>
        </div>

        {item.favorite && (
          <div className="absolute top-2 right-2 text-yellow-400 text-lg drop-shadow-lg pointer-events-none">
            ★
          </div>
        )}
      </div>

      <div className="p-3 space-y-3">
        <p
          className="text-sm text-slate-300 line-clamp-2 min-h-[40px] cursor-pointer hover:text-blue-400 transition-colors"
          onClick={() => onRestore && onRestore(item)}
        >
          {item.prompt}
        </p>

        <div className="flex items-center gap-1.5">
          {compareMode && (
            <button
              onClick={() => onToggleCompare && onToggleCompare(item.id)}
              className={`flex-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                compareIds && compareIds.includes(item.id)
                  ? "bg-purple-600/20 text-purple-400 border border-purple-500/30"
                  : "bg-slate-800/80 text-slate-400 border border-slate-700/50 hover:bg-slate-700/80"
              }`}
            >
              {compareIds && compareIds.includes(item.id)
                ? "✓ Selecionado"
                : "☐ Selecionar"}
            </button>
          )}

          <button
            onClick={() => onToggleFavorite && onToggleFavorite(item.id)}
            className={`px-2.5 py-1.5 rounded-lg text-xs border transition-all duration-200 ${
              item.favorite
                ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/30"
                : "bg-slate-800/80 text-slate-400 border border-slate-700/50 hover:bg-yellow-500/20 hover:text-yellow-400 hover:border-yellow-500/30"
            }`}
            title={
              item.favorite
                ? "Remover dos favoritos"
                : "Adicionar aos favoritos"
            }
          >
            {item.favorite ? "★" : "☆"}
          </button>

          <button
            onClick={() => downloadImage(item.imageUrl)}
            className="px-2.5 py-1.5 rounded-lg text-xs bg-slate-800/80 text-slate-400 border border-slate-700/50 hover:bg-blue-600/20 hover:text-blue-400 hover:border-blue-500/30 transition-all duration-200"
            title="Download"
          >
            📥
          </button>

          <button
            onClick={() => onDelete && onDelete(item.id)}
            className="px-2.5 py-1.5 rounded-lg text-xs bg-slate-800/80 text-slate-400 border border-slate-700/50 hover:bg-red-600/20 hover:text-red-400 hover:border-red-500/30 transition-all duration-200"
            title="Remover"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
