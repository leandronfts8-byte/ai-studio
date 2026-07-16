export default function PromptBox({
  prompt,
  setPrompt,
  gerarImagem,
}) {
  return (
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
  );
}