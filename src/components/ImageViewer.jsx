export default function ImageViewer({ 
    imageUrl,
    prompt,
    onImageLoad,
 }) {
   return (
    <div className="mt-10 bg-slate-900 rounded-2xl p-6 min-h-[500px] flex items-center justify-center">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={prompt}
          onLoad={onImageLoad}
          className="rounded-xl max-h-[500px]"
        />
      ) : (
        <p className="text-slate-500">
          A imagem aparecerá aqui.
        </p>
      )}
    </div>
  );
}