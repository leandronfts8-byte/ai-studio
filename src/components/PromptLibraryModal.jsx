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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-full max-w-6xl rounded-2xl bg-slate-900 p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">📚 Biblioteca de Prompts</h2>

          <button onClick={onClose} className="text-2xl">
            ✕
          </button>
        </div>

        <input
          type="text"
          placeholder="Pesquisar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-6 w-full rounded-xl border border-slate-700 bg-slate-800 p-3"
        />

        <div className="grid grid-cols-5 gap-6">
          <div className="space-y-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`block w-full rounded-lg px-3 py-2 text-left transition ${
                  category === cat
                    ? "bg-cyan-600"
                    : "bg-slate-800 hover:bg-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="col-span-4 space-y-3 max-h-[500px] overflow-y-auto">
            {filteredPrompts.map((prompt) => (
              <PromptCard
                key={prompt.id}
                prompt={prompt}
                selected={selected?.id === prompt.id}
                onClick={() => setSelected(prompt)}
              />
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-700 px-5 py-2"
          >
            Cancelar
          </button>

          <button
            disabled={!selected}
            onClick={() => {
              onSelect(selected);
              onClose();
            }}
            className="rounded-xl bg-cyan-600 px-5 py-2 disabled:opacity-40"
          >
            Usar Prompt
          </button>
        </div>
      </div>
    </div>
  );
}
