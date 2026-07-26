export default function SavePromptButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-cyan-600/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-600/20 hover:border-cyan-500/40 transition-all duration-200"
    >
      💾 Salvar Prompt
    </button>
  );
}
