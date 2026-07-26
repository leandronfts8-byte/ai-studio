export default function PromptCard({ prompt, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-xl border p-4 text-left transition ${
        selected
          ? "border-cyan-500 bg-cyan-900/40"
          : "border-slate-700 bg-slate-800 hover:bg-slate-700"
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{prompt.title}</h3>

        <span className="text-xs rounded-full bg-slate-700 px-2 py-1">
          {prompt.category}
        </span>
      </div>

      <p className="mt-2 text-sm text-slate-300 line-clamp-2">
        {prompt.prompt}
      </p>
    </button>
  );
}
