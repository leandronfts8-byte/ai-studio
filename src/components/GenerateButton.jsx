export default function GenerateButton({ gerarImagem, loading }) {
  return (
    <button
      onClick={gerarImagem}
      disabled={loading}
      className="bg-purple-600 px-4 py-2 rounded-xl hover:bg-purple-700 transition"
    >
      {loading ? "Gerando..." : "🚀 Gerar Imagem"}
    </button>
  );
}
