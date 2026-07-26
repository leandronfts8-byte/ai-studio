export default function PromptLibraryButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-purple-600/10 text-purple-400 border border-purple-500/20 hover:bg-purple-600/20 hover:border-purple-500/40 transition-all duration-200"
    >
      📚 Biblioteca
    </button>
  );
}
