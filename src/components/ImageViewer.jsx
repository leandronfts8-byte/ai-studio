import Loading from "./Loading";

export default function ImageViewer({
  imageUrl,
  prompt,
  loading,
  onImageLoad,
  onImageError,
}) {
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

      {/* Sempre monta a tag <img> quando houver imageUrl para que onLoad/onError sejam chamados.
          Mostra o Loading como overlay enquanto loading for true. */}
      {imageUrl && (
        <div className="relative w-full flex items-center justify-center animate-fade-in">
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
        </div>
      )}
    </div>
  );
}
