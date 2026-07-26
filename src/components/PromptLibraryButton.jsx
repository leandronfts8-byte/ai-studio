export default function PromptLibraryButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="mt-3 ml-3 rounded-xl bg-cyan-600 px-4 py-2 text-white transition hover:bg-cyan-700"
    >
      📚 Biblioteca
    </button>
  );
}
