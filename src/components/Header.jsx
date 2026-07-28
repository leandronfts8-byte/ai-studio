import { useState, useEffect } from "react";

export default function Header({ totalGenerated = 0 }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light",
    );
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  function toggleTheme() {
    setIsDark((prev) => !prev);
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        isDark
          ? "glass border-slate-700/50"
          : "bg-white/70 backdrop-blur-xl border-slate-200/60 shadow-sm"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">AI Studio</h1>
          <p
            className={`text-sm mt-0.5 transition-colors duration-300 ${
              isDark ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Gere imagens incríveis
          </p>
        </div>
        <div className="flex items-center gap-3">
          {totalGenerated > 0 && (
            <span
              className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors duration-300 ${
                isDark
                  ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                  : "bg-blue-50 text-blue-600 border-blue-200"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isDark ? "bg-blue-400" : "bg-blue-500"
                }`}
              />
              {totalGenerated} geradas
            </span>
          )}

          <button
            onClick={toggleTheme}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 ${
              isDark
                ? "bg-slate-800/80 text-slate-300 border-slate-700/50 hover:bg-slate-700/80 hover:border-slate-600/50"
                : "bg-white/80 text-slate-600 border-slate-200/60 hover:bg-slate-100/80 hover:border-slate-300/60 shadow-sm"
            }`}
            title={isDark ? "Mudar para tema claro" : "Mudar para tema escuro"}
          >
            {isDark ? "☀️" : "🌙"}
          </button>

          <div
            className={`hidden sm:flex items-center gap-2 text-sm transition-colors duration-300 ${
              isDark ? "text-slate-500" : "text-slate-400"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full animate-pulse ${
                isDark ? "bg-green-400" : "bg-green-500"
              }`}
            />
            Online
          </div>
        </div>
      </div>
    </header>
  );
}
