import { exportHistory } from "../utils/historyUtils";

export default function ExportHistoryButton({ history, mostrarToast }) {
  function handleExport() {
    const exported = exportHistory(history);

    if (exported) {
      mostrarToast("Histórico exportado com sucesso!");
    } else {
      mostrarToast("Não há histórico para exportar.");
    }
  }

  return (
    <button
      onClick={handleExport}
      className="rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white transition hover:bg-emerald-700"
    >
      ⬇ Exportar Histórico
    </button>
  );
}
