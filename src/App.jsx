import { useState } from "react";
import Header from "./components/Header";
import PromptBox from "./components/PromptBox";
import { gerarImagemURL } from "./services/pollinations";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  function gerarImagem() {
    if (!prompt.trim()) return;

    setImageUrl(gerarImagemURL(prompt));
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <main className="max-w-5xl mx-auto px-6 py-10">
         <PromptBox
          prompt={prompt}
          setPrompt={setPrompt}
          gerarImagem={gerarImagem}
        />

         
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