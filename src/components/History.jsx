import { useState, useEffect } from "react";
import HistoryItem from "./HistoryItem";
import ExportHistoryButton from "./ExportHistoryButton";
import ImportHistoryButton from "./ImportHistoryButton";
import Modal from "./Modal";

export default function History({
  history = [],
  setHistory,
  onRestoreImage,
  onLoadPrompt,
  onOpenLibrary,
}) {
  const [compareMode, setCompareMode] = useState(false);
  const [compareIds, setCompareIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [prevLength, setPrevLength] = useState(history.length);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [clearModalOpen, setClearModalOpen] = useState(false);

  // ── Filtros ──
  const filteredHistory = history.filter((item) => {
    const matchSearch =
      searchTerm === "" ||
      item.prompt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFavorite = !showFavorites || item.favorite;
    return matchSearch && matchFavorite;
  });

  const favoriteCount = history.filter((h) => h.favorite).length;

  // ── Paginação ──
  const ITEMS_PER_PAGE = 8;
  const totalPages = Math.ceil(filteredHistory.length / ITEMS_PER_PAGE);

  // React 19: ajustar estado durante o render
  if (prevLength !== history.length) {
    setPrevLength(history.length);
    setCurrentPage(1);
  }

  const page = totalPages > 0 ? Math.min(currentPage, totalPages) : 1;
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedHistory = filteredHistory.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  // ── Atalhos de teclado ──
  useEffect(() => {
    function handleKeyDown(e) {
      const tag = e.target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      if (e.key === "Escape") {
        if (clearModalOpen) {
          setClearModalOpen(false);
          return;
        }
      }

      if (e.key === "ArrowLeft" && page > 1) {
        setCurrentPage((p) => p - 1);
        return;
      }

      if (e.key === "ArrowRight" && page < totalPages) {
        setCurrentPage((p) => p + 1);
        return;
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [clearModalOpen, page, totalPages]);

  // ── Funções ──

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

  function toggleFavorite(id) {
    setHistory((prev) =>
      prev.map((h) => (h.id === id ? { ...h, favorite: !h.favorite } : h)),
    );
  }

  function confirmClearHistory() {
    setHistory([]);
    setCompareIds([]);
    setCompareMode(false);
    setCurrentPage(1);
    setSearchTerm("");
    setClearModalOpen(false);
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
      let start = Math.max(2, page - 1);
      let end = Math.min(totalPages - 1, page + 1);

      if (page <= 3) end = Math.min(4, totalPages - 1);
      if (page >= totalPages - 2) start = Math.max(totalPages - 3, 2);

      if (start > 2) pages.push("...");
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push("...");

      pages.push(totalPages);
    }

    return pages;
  }

  // ── Render: histórico vazio ──
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

  // ── Render: sem resultados no filtro ──
  if (filteredHistory.length === 0) {
    return (
      <section className="glass rounded-2xl p-6 mt-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-xl font-semibold text-slate-200">
              📜 Histórico
              <span className="text-sm font-normal text-slate-400 ml-2">
                ({history.length} {history.length === 1 ? "item" : "itens"})
              </span>
            </h2>
            <button
              onClick={() => {
                setShowFavorites(false);
                setSearchTerm("");
              }}
              className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-800/60 text-slate-400 border border-slate-700/30 hover:bg-slate-700/60 transition-all duration-200"
            >
              ← Voltar
            </button>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <ExportHistoryButton history={history} />
            <ImportHistoryButton setHistory={setHistory} />
          </div>
        </div>

        <div className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="🔍 Pesquisar no histórico..."
            className="w-full px-4 py-2.5 rounded-xl bg-slate-800/60 text-slate-200 text-sm border border-slate-700/40 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
          />
        </div>

        <p className="text-slate-400 text-sm text-center py-8">
          {showFavorites
            ? "Nenhuma imagem favoritada. Clique em ☆ para favoritar!"
            : "Nenhum resultado encontrado para esta busca."}
        </p>
      </section>
    );
  }

  // ── Render principal ──
  return (
    <section className="glass rounded-2xl p-6 mt-6">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 flex-wrap">
          <h2 className="text-xl font-semibold text-slate-200">
            📜 Histórico
            <span className="text-sm font-normal text-slate-400 ml-2">
              {filteredHistory.length === history.length
                ? `${history.length} ${history.length === 1 ? "item" : "itens"}`
                : `${filteredHistory.length} de ${history.length}`}
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
            {compareMode ? "✖ Sair" : "⚖️ Comparar"}
          </button>

          <button
            onClick={() => {
              setShowFavorites(!showFavorites);
              setCurrentPage(1);
            }}
            className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all duration-200 ${
              showFavorites
                ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                : "bg-slate-800/60 text-slate-400 border-slate-700/30 hover:bg-slate-700/60"
            }`}
          >
            {showFavorites ? "★ Todos" : "☆ Favoritos"}
            {favoriteCount > 0 && (
              <span className="ml-1 opacity-70">({favoriteCount})</span>
            )}
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
            onClick={() => setClearModalOpen(true)}
            className="px-3 py-1 rounded-lg text-xs font-medium bg-red-600/10 text-red-400 border border-red-500/20 hover:bg-red-600/20 transition-all duration-200"
          >
            🗑️ Limpar
          </button>
        </div>
      </div>

      {/* ── Barra de pesquisa ── */}
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="🔍 Pesquisar no histórico..."
            className="w-full px-4 py-2.5 rounded-xl bg-slate-800/60 text-slate-200 text-sm border border-slate-700/40 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm("");
                setCurrentPage(1);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-sm transition-colors"
            >
              ✕
            </button>
          )}
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

      {/* ── Compare view ── */}
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

      {/* ── Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {paginatedHistory.map((item) => (
          <HistoryItem
            key={item.id}
            item={item}
            onRestore={onRestoreImage}
            onLoadPrompt={onLoadPrompt}
            onDelete={deleteItem}
            onToggleFavorite={toggleFavorite}
            compareMode={compareMode}
            compareIds={compareIds}
            onToggleCompare={toggleCompare}
          />
        ))}
      </div>

      {/* ── Paginação ── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-slate-700/30">
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

      {totalPages > 1 && (
        <p className="text-center text-xs text-slate-500 mt-2">
          Página {page} de {totalPages} — Mostrando {startIndex + 1}-
          {Math.min(startIndex + ITEMS_PER_PAGE, filteredHistory.length)} de{" "}
          {filteredHistory.length}
        </p>
      )}

      {/* ── Modal de confirmação ── */}
      <Modal
        isOpen={clearModalOpen}
        title="Limpar histórico"
        message="Tem certeza que deseja limpar todo o histórico?"
        onConfirm={confirmClearHistory}
        onCancel={() => setClearModalOpen(false)}
      />
    </section>
  );
}
