export default function Loading() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-blue-500"></div>

      <p className="text-slate-400">
        Gerando imagem...
      </p>
    </div>
  );
}