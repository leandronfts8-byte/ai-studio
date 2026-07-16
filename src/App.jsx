import { useState } from "react";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  function gerarImagem() {
    if (!prompt.trim()) return;

    const url =
      "https://image.pollinations.ai/prompt/" +
      encodeURIComponent(prompt) +
      "?width=1024&height=1024&seed=" +
      Date.now();

    setImageUrl(url);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-6 py-5">
          <h1 className="text-3xl font-bold">🚀 AI Studio</h1>
          <p className="text-slate-400">
            Gere imagens com inteligência artificial
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="bg-slate-900 p-6 rounded-2xl">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Descreva a imagem..."
            className="w-full h-36 rounded-xl bg-slate-800 p-4 border border-slate-700"
          />

          <button
            onClick={gerarImagem}
            className="mt-4 bg-blue-600 px-6 py-3 rounded-xl hover:bg-blue-700"
          >
            Gerar Imagem
          </button>
        </div>

        <div className="mt-10 bg-slate-900 rounded-2xl p-6 min-h-[500px] flex items-center justify-center">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={prompt}
              className="rounded-xl max-h-[500px]"
            />
          ) : (
            <p className="text-slate-500">
              A imagem aparecerá aqui.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}