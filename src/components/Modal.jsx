export default function Modal({ isOpen, title, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative glass rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-slate-700/30 animate-slide-up">
        <div className="text-center mb-6">
          <div className="text-4xl mb-3">⚠️</div>
          <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
          <p className="text-sm text-slate-400">{message}</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium bg-slate-800/80 text-slate-300 border border-slate-700/50 hover:bg-slate-700/80 transition-all duration-200"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium bg-red-600/20 text-red-400 border border-red-500/30 hover:bg-red-600/30 transition-all duration-200"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
