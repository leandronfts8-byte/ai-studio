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
    <section className="mt-8 glass rounded-2xl overflow-hidden transition-all duration-300">
      {/* Cabeçalho */}
      <div className="flex items-center justify-center px-5 py-3 border-b border-slate-700/30">
        <h2 className="flex items-center gap-1 text-sm font-medium text-slate-300">
          <span>🖼️</span>
          <span>Visualização</span>
        </h2>
      </div>

      {/* Área principal */}
      <div className="min-h-[400px] p-5 flex items-center justify-center">
        {!imageUrl && !loading && (
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-700/40 bg-slate-800/40 shadow-inner">
              <span className="text-4xl opacity-80">🎨</span>
            </div>

            <h3 className="text-sm font-medium text-slate-400">
              Sua imagem aparecerá aqui
            </h3>

            <p className="mt-2 max-w-sm text-xs leading-relaxed text-slate-600">
              Descreva o que você deseja criar no campo abaixo e clique em
              <br /> <span className="text-slate-500">Gerar Imagem</span>
            </p>
          </div>
        )}

        {imageUrl && (
          <div
            className="relative w-full flex items-center justify-center animate-fade-in"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {/* Loading */}
            {loading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-slate-950/40 backdrop-blur-[2px]">
                <Loading />
              </div>
            )}

            {/* Imagem */}
            <img
              src={imageUrl}
              alt={prompt}
              onLoad={onImageLoad}
              onError={onImageError}
              className={`max-h-[500px] w-full rounded-xl object-contain shadow-2xl transition-all duration-300 ${
                loading ? "opacity-0 scale-[0.98]" : "opacity-100 scale-100"
              }`}
            />

            {/* Download */}
            {!loading && (
              <button
                type="button"
                onClick={baixarImagem}
                className={`absolute bottom-3 right-3 flex items-center gap-2 rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-xs font-medium text-white backdrop-blur-md transition-all duration-200 hover:border-white/20 hover:bg-black/80 ${
                  hovered
                    ? "translate-y-0 opacity-100"
                    : "translate-y-2 opacity-0"
                }`}
              >
                <span>📥</span>
                <span>Baixar imagem</span>
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
