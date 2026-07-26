import { useState } from "react";
import HistoryItem from "./HistoryItem";
import ExportHistoryButton from "./ExportHistoryButton";
import ImportHistoryButton from "./ImportHistoryButton";

export default function History({
  history = [],
  setHistory,
  onRestoreImage,
  onLoadPrompt,
  onOpenLibrary,
}) {
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [compareMode, setCompareMode] = useState(false);
  const [compareIds, setCompareIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [prevLength, setPrevLength] = useState(history.length);

  // ── Paginação ──
  const ITEMS_PER_PAGE = 8;
  const totalPages = Math.ceil(history.length / ITEMS_PER_PAGE);

  // React 19: ajustar estado durante o render (sem useEffect)
  if (prevLength !== history.length) {
    setPrevLength(history.length);
    setCurrentPage(1);
  }

  // Garantir que a página está dentro do range válido
  const page = totalPages > 0 ? Math.min(currentPage, totalPages) : 1;
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedHistory = history.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  // ── Funções ──
  function handleImageClick(item) {
    setFullscreenImage(item);
  }

  function toggleCompare(id) {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((i) => i !== id);
      if (prev.length >= 2) return prev;
      return [...prev, id];
    });
  }

  function compareItems() {
    return compareIds
      .map((id) => history.find((h) => h.id === id))
      .filter(Boolean);
  }

  function clearHistory() {
    if (history.length === 0) return;
    if (window.confirm("Tem certeza que deseja limpar todo o histórico?")) {
      setHistory([]);
      setCompareIds([]);
      setCompareMode(false);
      setCurrentPage(1);
    }
  }

  function deleteItem(id) {
    setHistory((prev) => prev.filter((h) => h.id !== id));
    setCompareIds((prev) => prev.filter((cid) => cid !== id));
  }

  // ── Gerar números das páginas ──
  function getPageNumbers() {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        end = Math.min(4, totalPages - 1);
      }
      if (currentPage >= totalPages - 2) {
        start = Math.max(totalPages - 3, 2);
      }

      if (start > 2) pages.push("...");

      for (let i = start; i <= end; i++) pages.push(i);

      if (end < totalPages - 1) pages.push("...");

      pages.push(totalPages);
    }

    return pages;
  }

  // ── Render ──
  if (history.length === 0) {
    return (
      <section className="glass rounded-2xl p-6 mt-6">
        <h2 className="text-xl font-semibold text-slate-200 mb-2">
          📜 Histórico
        </h2>
        <p className="text-slate-400 text-sm">
          Nenhuma imagem gerada ainda. Comece criando sua primeira imagem!
        </p>
      </section>
    );
  }

  return (
    <section className="glass rounded-2xl p-6 mt-6">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 flex-wrap">
          <h2 className="text-xl font-semibold text-slate-200">
            📜 Histórico
            <span className="text-sm font-normal text-slate-400 ml-2">
              ({history.length} {history.length === 1 ? "item" : "itens"})
            </span>
          </h2>

          <button
            onClick={() => setCompareMode(!compareMode)}
            className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all duration-200 ${
              compareMode
                ? "bg-purple-600/20 text-purple-400 border-purple-500/30"
                : "bg-slate-800/60 text-slate-400 border-slate-700/30 hover:bg-slate-700/60"
            }`}
          >
            {compareMode ? "✖ Sair comparação" : "⚖️ Comparar"}
          </button>

          <button
            onClick={onOpenLibrary}
            className="px-3 py-1 rounded-lg text-xs font-medium bg-purple-600/10 text-purple-400 border border-purple-500/20 hover:bg-purple-600/20 transition-all duration-200"
          >
            📚 Biblioteca
          </button>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <ExportHistoryButton history={history} />
          <ImportHistoryButton setHistory={setHistory} />
          <button
            onClick={clearHistory}
            className="px-3 py-1 rounded-lg text-xs font-medium bg-red-600/10 text-red-400 border border-red-500/20 hover:bg-red-600/20 transition-all duration-200"
          >
            🗑️ Limpar
          </button>
        </div>
      </div>

      {/* ── Compare banner ── */}
      {compareMode && (
        <div className="mb-4 p-3 rounded-xl bg-purple-600/10 border border-purple-500/20 animate-slide-up">
          <p className="text-purple-400 text-sm">
            {compareIds.length < 2
              ? `Selecione ${2 - compareIds.length} imagem(ns) para comparar`
              : "✅ 2 imagens selecionadas! Veja a comparação abaixo."}
          </p>
        </div>
      )}

      {/* ── Compare view (lado a lado) ── */}
      {compareMode && compareIds.length === 2 && (
        <div className="grid grid-cols-2 gap-4 mb-6 animate-fade-in">
          {compareItems().map((item) => (
            <div key={item.id} className="text-center">
              <img
                src={item.imageUrl}
                alt={item.prompt}
                className="w-full rounded-xl border border-slate-700/30 object-contain max-h-80"
              />
              <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                {item.prompt}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ── Grid de imagens (paginado) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {paginatedHistory.map((item) => (
          <HistoryItem
            key={item.id}
            item={item}
            onRestore={onRestoreImage}
            onLoadPrompt={onLoadPrompt}
            onImageClick={handleImageClick}
            onDelete={deleteItem}
            compareMode={compareMode}
            compareIds={compareIds}
            onToggleCompare={toggleCompare}
          />
        ))}
      </div>

      {/* ── Paginação ── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-slate-700/30">
          {/* Botão anterior */}
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all duration-200 ${
              page === 1
                ? "opacity-30 cursor-not-allowed bg-slate-800/40 text-slate-500 border-slate-700/20"
                : "bg-slate-800/60 text-slate-300 border-slate-700/40 hover:bg-slate-700/60 hover:text-white"
            }`}
          >
            ◀
          </button>

          {/* Números das páginas */}
          {getPageNumbers().map((num, i) =>
            num === "..." ? (
              <span
                key={`dots-${i}`}
                className="px-2 text-slate-500 text-sm select-none"
              >
                …
              </span>
            ) : (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`min-w-[36px] h-9 rounded-lg text-sm font-medium border transition-all duration-200 ${
                  page === num
                    ? "bg-blue-600/20 text-blue-400 border-blue-500/40 shadow-sm shadow-blue-500/10"
                    : "bg-slate-800/40 text-slate-400 border-slate-700/30 hover:bg-slate-700/60 hover:text-white"
                }`}
              >
                {num}
              </button>
            ),
          )}

          {/* Botão próximo */}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all duration-200 ${
              page === totalPages
                ? "opacity-30 cursor-not-allowed bg-slate-800/40 text-slate-500 border-slate-700/20"
                : "bg-slate-800/60 text-slate-300 border-slate-700/40 hover:bg-slate-700/60 hover:text-white"
            }`}
          >
            ▶
          </button>
        </div>
      )}

      {/* ── Indicador de posição ── */}
      {totalPages > 1 && (
        <p className="text-center text-xs text-slate-500 mt-2">
          Página {page} de {totalPages} — Mostrando {startIndex + 1}-
          {Math.min(startIndex + ITEMS_PER_PAGE, history.length)} de{" "}
          {history.length}
        </p>
      )}

      {/* ── Fullscreen Modal ── */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setFullscreenImage(null)}
        >
          <button
            onClick={() => setFullscreenImage(null)}
            className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl font-bold transition-colors z-10"
          >
            ✕
          </button>

          <img
            src={fullscreenImage.imageUrl}
            alt={fullscreenImage.prompt}
            className="max-w-full max-h-[85vh] rounded-xl object-contain animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          />

          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 max-w-2xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-slate-900/90 backdrop-blur-md rounded-xl p-4 border border-slate-700/50">
              <p className="text-white text-sm line-clamp-2 mb-2">
                {fullscreenImage.prompt}
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                {fullscreenImage.model && (
                  <span>Modelo: {fullscreenImage.model}</span>
                )}
                {fullscreenImage.seed != null && (
                  <span>Seed: {fullscreenImage.seed}</span>
                )}
                {fullscreenImage.aspectRatio && (
                  <span>Tamanho: {fullscreenImage.aspectRatio}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
