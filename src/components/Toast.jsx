export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-slate-800 border border-slate-700 px-5 py-3 shadow-xl">
      {message}
    </div>
  );
}
