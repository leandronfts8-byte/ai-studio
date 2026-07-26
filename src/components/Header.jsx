export default function Header() {
  return (
    <header className="glass border-b border-slate-700/50 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">AI Studio</h1>
          <p className="text-slate-400 text-sm mt-0.5">
            Gere imagens incríveis com Inteligência Artificial
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-slate-500 text-sm">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Online
        </div>
      </div>
    </header>
  );
}
