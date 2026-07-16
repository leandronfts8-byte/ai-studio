import Loading from "./Loading";

export default function ImageViewer({
  imageUrl,
  prompt,
  loading,
  onImageLoad,
}) {
  return (
    <div className="mt-10 bg-slate-900 rounded-2xl p-6 min-h-[500px] flex items-center justify-center">
      {!imageUrl && <p className="text-slate-500">A imagem aparecerá aqui.</p>}

      {imageUrl && (
        <div className="relative flex items-center justify-center">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/70 rounded-xl z-10">
              <Loading />
            </div>
          )}

          <img
            src={imageUrl}
            alt={prompt}
            onLoad={onImageLoad}
            className={`rounded-xl max-h-[500px] transition-opacity duration-300 ${
              loading ? "opacity-0" : "opacity-100"
            }`}
          />
        </div>
      )}
    </div>
  );
}
