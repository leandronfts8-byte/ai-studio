export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div className="glass rounded-xl px-5 py-3 shadow-2xl border border-slate-700/30">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <p className="text-sm text-slate-200 font-medium">{message}</p>
        </div>
      </div>
    </div>
  );
}
