import { useState, useEffect } from "react";

import Header from "./components/Header";
import PromptBox from "./components/PromptBox";
import { gerarImagemURL } from "./services/pollinations";
import ImageViewer from "./components/ImageViewer";
import DownloadButton from "./components/DownloadButton";
import { styles } from "./data/styles";
import History from "./components/History";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [style, setStyle] = useState(styles[0]);

  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem("history");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  function finalizarCarregamento() {
    setLoading(false);

    const newImage = {
      id: Date.now(),
      imageUrl,
      prompt,
      style: style.name,
      favorite: false,
    };

    setHistory((prevHistory) => [newImage, ...prevHistory]);
  }

  function gerarImagem() {
    if (!prompt.trim()) return;

    setLoading(true);

    const fullprompt = `${prompt} ${style.prompt}`;
    setImageUrl(gerarImagemURL(fullprompt));
  }

  function restaurarImagem(item) {
    setImageUrl(item.imageUrl);
    setPrompt(item.prompt);

    const selectedStyle = styles.find((s) => s.name === item.style);

    if (selectedStyle) {
      setStyle(selectedStyle);
    }
  }

  function removerImagem(id) {
    setHistory((prevHistory) => prevHistory.filter((item) => item.id !== id));
  }

  // ⭐ Favoritar / desfavoritar
  function alternarFavorito(id) {
    setHistory((prevHistory) =>
      prevHistory.map((item) =>
        item.id === id ? { ...item, favorite: !item.favorite } : item,
      ),
    );
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

      <History
        history={history}
        restaurarImagem={restaurarImagem}
        removerImagem={removerImagem}
        alternarFavorito={alternarFavorito}
      />
    </div>
  );
}
