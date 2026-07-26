export default function Header({ totalGenerated = 0 }) {
  return (
    <header className="glass border-b border-slate-700/50 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">AI Studio</h1>
          <p className="text-slate-400 text-sm mt-0.5">
            Gere imagens incríveis com Inteligência Artificial
          </p>
        </div>
        <div className="flex items-center gap-3">
          {totalGenerated > 0 && (
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              {totalGenerated} geradas
            </span>
          )}
          <div className="hidden sm:flex items-center gap-2 text-slate-500 text-sm">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Online
          </div>
        </div>
      </div>
    </header>
  );
}
