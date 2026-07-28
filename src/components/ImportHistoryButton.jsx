import { importHistory } from "../utils/historyUtils";

export default function ImportHistoryButton({ setHistory, mostrarToast }) {
  async function handleImport(event) {
    const file = event.target.files[0];

    try {
      const history = await importHistory(file);
      setHistory(history);
      mostrarToast("Histórico importado com sucesso!");
    } catch (error) {
      mostrarToast(error);
    }

    event.target.value = "";
  }

  return (
    <>
      <input
        type="file"
        accept=".json,application/json"
        id="import-history"
        className="hidden"
        onChange={handleImport}
      />

      <label
        htmlFor="import-history"
        className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-emerald-600/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-600/20 hover:border-emerald-500/40 transition-all duration-200 cursor-pointer"
      >
        ⬆️ Importar
      </label>
    </>
  );
}
