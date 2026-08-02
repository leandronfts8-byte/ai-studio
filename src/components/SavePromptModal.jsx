import { useState } from "react";

export default function SavePromptModal({
  isOpen,
  onClose,
  onSave,
  prompt,
  style,
}) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Geral");

  if (!isOpen) return null;

  function handleSave() {
    if (!title.trim()) return;

    onSave({
      title: title.trim(),
      category: category.trim() || "Geral",
      prompt,
      style: style.id,
    });

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-md rounded-2xl bg-slate-900 p-6 shadow-2xl">
        <h2 className="mb-6 text-xl font-bold text-white">💾 Salvar Prompt</h2>

        <label className="mb-2 block text-sm text-slate-300">Título</label>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-5 w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-sm text-white outline-none transition focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20"
          placeholder="Ex.: Samurai Cyberpunk"
        />

        <label className="mb-2 block text-sm text-slate-300">Categoria</label>

        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-sm text-white outline-none transition focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20"
          placeholder="Ex.: Personagens"
        />

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-slate-700 px-5 py-2 text-sm transition hover:bg-slate-600"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={!title.trim()}
            className="rounded-xl bg-green-600 px-5 py-2 text-sm transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
