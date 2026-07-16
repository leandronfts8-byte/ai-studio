export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 rounded-full border-4 border-slate-700 border-t-blue-500 animate-spin"></div>

      <p className="text-slate-400">
        Gerando imagem...
      </p>
    </div>
  );
}