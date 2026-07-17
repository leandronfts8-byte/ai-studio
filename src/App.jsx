import { useState } from "react";
import Header from "./components/Header";
import PromptBox from "./components/PromptBox";
import { gerarImagemURL } from "./services/pollinations";
import ImageViewer from "./components/ImageViewer";
import DownloadButton from "./components/DownloadButton";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  function finalizarCarregamento() {
    setLoading(false);
  }
  function gerarImagem() {
    if (!prompt.trim()) return;

    setLoading(true);
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
          loading={loading}
        />

        <ImageViewer
          imageUrl={imageUrl}
          prompt={prompt}
          loading={loading}
          onImageLoad={finalizarCarregamento}
        />
        <DownloadButton imageUrl={imageUrl} />
      </main>
    </div>
  );
}
