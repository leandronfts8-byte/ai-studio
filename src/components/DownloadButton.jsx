export default function DownloadButton({ imageUrl, mostrarToast }) {
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
      mostrarToast("Download iniciado");
    } catch (error) {
      console.error(error);
      mostrarToast("Erro ao baixar imagem");
    }
  }

  return (
    <div className="mt-6 flex justify-center">
      <button
        onClick={baixarImagem}
        className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 p-[1px] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
      >
        <div className="relative flex items-center gap-3 rounded-xl bg-slate-900 px-8 py-3 transition-all duration-300 group-hover:bg-slate-900/80">
          <span className="text-lg">📥</span>
          <span className="font-semibold text-white">Baixar imagem</span>
        </div>
      </button>
    </div>
  );
}
