export default function Footer() {
  return (
    <footer
      className={`mt-8 py-6 text-center border-t transition-colors duration-300 ${"border-slate-800/50"}`}
    >
      <p className="text-slate-500 text-xs">
        AI Studio v1.0.0 — Feito com <span className="text-red-400">♥</span>{" "}
        usando{" "}
        <a
          href="https://pollinations.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
        >
          Pollinations AI
        </a>
      </p>
    </footer>
  );
}
