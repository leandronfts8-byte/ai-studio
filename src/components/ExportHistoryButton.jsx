export default function ExportHistoryButton({ history, mostrarToast }) {
  async function exportarHistorico() {
    if (history.length === 0) {
      mostrarToast("Nenhum histórico para exportar");
      return;
    }

    const dataStr = JSON.stringify(history, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `historico-ai-studio-${new Date().toLocaleDateString("pt-BR").replace(/\//g, "-")}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    mostrarToast("Histórico exportado com sucesso!");
  }

  return (
    <button
      onClick={exportarHistorico}
      className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-blue-600/10 text-blue-400 border border-blue-500/20 hover:bg-blue-600/20 hover:border-blue-500/40 transition-all duration-200"
    >
      ⬇️ Exportar
    </button>
  );
}
