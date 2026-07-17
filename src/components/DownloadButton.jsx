export default function DownloadButton({ imageUrl }) {
  if (!imageUrl) return null;

  async function baixarImagem() {
    try {
      const response = await fetch(imageUrl);

      if (!response.ok) {
        throw new Error("Erro ao baixar a imagem.");
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `imagem-${Date.now()}.png`;

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Não foi possível baixar a imagem.");
    }
  }

  return (
    <div className="mt-6 flex justify-center">
      <button
        onClick={baixarImagem}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition"
      >
        📥 Baixar imagem
      </button>
    </div>
  );
}
