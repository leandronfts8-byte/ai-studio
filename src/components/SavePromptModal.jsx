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
  const [prevIsOpen, setPrevIsOpen] = useState(false);

  // Ajusta o estado durante a renderização (padrão oficial do React 19)
  // em vez de usar useEffect para resetar quando isOpen muda
  if (isOpen && !prevIsOpen) {
    setTitle("");
    setCategory("Geral");
    setPrevIsOpen(true);
  } else if (!isOpen && prevIsOpen) {
    setPrevIsOpen(false);
  }

  if (!isOpen) return null;

  function handleSave() {
    if (!title.trim()) return;

    onSave({
      title,
      category,
      prompt,
      style: style.id,
    });

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-full max-w-md rounded-2xl bg-slate-900 p-6">
        <h2 className="mb-6 text-xl font-bold">💾 Salvar Prompt</h2>

        <label className="mb-2 block text-sm">Título</label>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-5 w-full rounded-xl bg-slate-800 p-3"
          placeholder="Ex.: Samurai Cyberpunk"
        />

        <label className="mb-2 block text-sm">Categoria</label>

        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-xl bg-slate-800 p-3"
          placeholder="Ex.: Personagens"
        />

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-700 px-5 py-2"
          >
            Cancelar
          </button>

          <button
            onClick={handleSave}
            className="rounded-xl bg-green-600 px-5 py-2 hover:bg-green-700"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
