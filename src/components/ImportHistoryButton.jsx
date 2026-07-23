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

    // Permite importar novamente o mesmo arquivo
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
        className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
      >
        ⬆ Importar Histórico
      </label>
    </>
  );
}
