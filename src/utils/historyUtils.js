export function exportHistory(history) {
  if (!history.length) {
    return false;
  }

  const json = JSON.stringify(history, null, 2);

  const blob = new Blob([json], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  const data = new Date().toLocaleDateString("pt-BR").replace(/\//g, "-");

  link.href = url;
  link.download = `historico-ai-studio-${data}.json`;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);

  return true;
}

export function importHistory(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("Nenhum arquivo selecionado.");
      return;
    }

    if (file.type !== "application/json") {
      reject("Selecione um arquivo JSON válido.");
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);

        if (!Array.isArray(data)) {
          reject("Arquivo inválido.");
          return;
        }

        const valido = data.every(
          (item) => item.id && item.imageUrl && item.prompt && item.style,
        );

        if (!valido) {
          reject("O arquivo não pertence ao AI Studio.");
          return;
        }

        resolve(data);
      } catch {
        reject("Erro ao ler o arquivo.");
      }
    };

    reader.readAsText(file);
  });
}
