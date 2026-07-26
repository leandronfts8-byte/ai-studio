import { useState } from "react";
import Loading from "./Loading";

export default function ImageViewer({
  imageUrl,
  prompt,
  loading,
  onImageLoad,
  onImageError,
  mostrarToast,
}) {
  const [hovered, setHovered] = useState(false);

  async function baixarImagem() {
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error();
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
    } catch {
      mostrarToast("Erro ao baixar imagem");
    }
  }

  return (
    <div className="glass rounded-2xl p-6 min-h-[400px] flex items-center justify-center transition-all duration-300">
      {!imageUrl && !loading && (
        <div className="flex flex-col items-center gap-3 text-slate-500">
          <span className="text-5xl">🎨</span>
          <p className="text-sm">A imagem gerada aparecerá aqui</p>
          <p className="text-xs text-slate-600">
            Escreva um prompt e clique em "Gerar Imagem"
          </p>
        </div>
      )}

      {imageUrl && (
        <div
          className="relative w-full flex items-center justify-center animate-fade-in"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <Loading />
            </div>
          )}

          <img
            src={imageUrl}
            alt={prompt}
            onLoad={onImageLoad}
            onError={onImageError}
            className={`rounded-xl max-h-[500px] w-full object-contain shadow-2xl transition-opacity duration-300 ${loading ? "opacity-0" : "opacity-100"}`}
          />

          {!loading && (
            <button
              onClick={baixarImagem}
              className={`absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-black/60 text-white backdrop-blur-sm border border-white/10 hover:bg-black/80 hover:border-white/20 transition-all duration-200 ${
                hovered
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2"
              }`}
            >
              📥 Baixar
            </button>
          )}
        </div>
      )}
    </div>
  );
}
