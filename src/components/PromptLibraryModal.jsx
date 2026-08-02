import { useMemo, useState } from "react";
import { prompts } from "../data/prompts";
import PromptCard from "./PromptCard";
import { loadPromptLibrary } from "../utils/promptLibrary";

export default function PromptLibraryModal({ isOpen, onClose, onSelect }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const [selected, setSelected] = useState(null);
  const [savedPrompts] = useState(() => loadPromptLibrary());

  const allPrompts = useMemo(() => {
    return [...savedPrompts, ...prompts];
  }, [savedPrompts]);

  const categories = ["Todos", ...new Set(allPrompts.map((p) => p.category))];

  const filteredPrompts = useMemo(() => {
    return allPrompts.filter((prompt) => {
      const matchesCategory =
        category === "Todos" || prompt.category === category;

      const matchesSearch =
        prompt.title.toLowerCase().includes(search.toLowerCase()) ||
        prompt.prompt.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [search, category, allPrompts]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-6">
      <div className="flex max-h-[95vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-slate-900 shadow-2xl">
        {/* Cabeçalho */}
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-slate-700/30 p-4 sm:p-6">
          <h2 className="text-lg font-bold text-white sm:text-2xl">
            📚 Biblioteca de Prompts
          </h2>

          <button
            onClick={onClose}
            aria-label="Fechar biblioteca"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xl text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Conteúdo */}
        <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
          <input
            type="text"
            placeholder="Pesquisar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-5 w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-sm outline-none transition focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 sm:mb-6"
          />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-5 md:gap-6">
            {/* Categorias */}
            <div className="space-y-2 md:col-span-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                    category === cat
                      ? "bg-cyan-600 text-white"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Lista de prompts */}
            <div className="min-w-0 space-y-3 md:col-span-4">
              {filteredPrompts.length > 0 ? (
                filteredPrompts.map((prompt) => (
                  <PromptCard
                    key={prompt.id}
                    prompt={prompt}
                    selected={selected?.id === prompt.id}
                    onClick={() => setSelected(prompt)}
                  />
                ))
              ) : (
                <div className="rounded-xl border border-slate-700/40 bg-slate-800/40 p-6 text-center">
                  <p className="text-sm text-slate-500">
                    Nenhum prompt encontrado.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Rodapé */}
        <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-slate-700/30 p-4 sm:flex-row sm:justify-end sm:p-6">
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-slate-700 px-5 py-2.5 text-sm transition hover:bg-slate-600 sm:w-auto"
          >
            Cancelar
          </button>

          <button
            disabled={!selected}
            onClick={() => {
              onSelect(selected);
              onClose();
            }}
            className="w-full rounded-xl bg-cyan-600 px-5 py-2.5 text-sm transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
          >
            Usar Prompt
          </button>
        </div>
      </div>
    </div>
  );
}
