export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 py-8">
      <div className="relative w-14 h-14">
        <div className="absolute inset-0 rounded-full border-4 border-slate-700/50" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 animate-spin" />
        <div
          className="absolute inset-2 rounded-full border-4 border-transparent border-t-purple-500 animate-spin"
          style={{ animationDirection: "reverse", animationDuration: "0.8s" }}
        />
      </div>
      <div className="text-center">
        <p className="text-sm text-slate-300 font-medium">Gerando imagem...</p>
        <p className="text-xs text-slate-500 mt-1">
          A IA está criando sua imagem
        </p>
      </div>
    </div>
  );
}
