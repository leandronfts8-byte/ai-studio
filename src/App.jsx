import { useState } from "react";
import Header from "./components/Header";
import PromptBox from "./components/PromptBox";
import { gerarImagemURL } from "./services/pollinations";
import ImageViewer from "./components/ImageViewer";
import DownloadButton from "./components/DownloadButton";
import { styles } from "./data/styles";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [style, setStyle] = useState(styles[0]);

  function finalizarCarregamento() {
    setLoading(false);
  }
  function gerarImagem() {
    if (!prompt.trim()) return;

    setLoading(true);

    const fullprompt = `${prompt} ${style.prompt}`;

    setImageUrl(gerarImagemURL(fullprompt));
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
          style={style}
          setStyle={setStyle}
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
