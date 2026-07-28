import { useState, useEffect } from "react";

export default function Modal({ isOpen, title, message, onConfirm, onCancel }) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const check = () =>
      setIsDark(
        document.documentElement.getAttribute("data-theme") !== "light",
      );
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div
        className={`relative rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-slide-up ${
          isDark
            ? "glass border border-slate-700/30"
            : "bg-white/90 backdrop-blur-xl border border-slate-200/60"
        }`}
      >
        <div className="text-center mb-6">
          <div className="text-4xl mb-3">⚠️</div>
          <h3
            className={`text-lg font-semibold mb-1 ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            {title}
          </h3>
          <p
            className={
              isDark ? "text-sm text-slate-400" : "text-sm text-slate-500"
            }
          >
            {message}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 ${
              isDark
                ? "bg-slate-800/80 text-slate-300 border-slate-700/50 hover:bg-slate-700/80"
                : "bg-slate-100/80 text-slate-600 border-slate-200/60 hover:bg-slate-200/80"
            }`}
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 ${
              isDark
                ? "bg-red-600/20 text-red-400 border-red-500/30 hover:bg-red-600/30"
                : "bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
            }`}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
