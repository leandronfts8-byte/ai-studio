export default function SavePromptButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-xl bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
    >
      💾 Salvar Prompt
    </button>
  );
}
