import { useState, useEffect } from "react";

import Header from "./components/Header";
import PromptBox from "./components/PromptBox";
import { gerarImagemURL } from "./services/pollinations";
import ImageViewer from "./components/ImageViewer";
import DownloadButton from "./components/DownloadButton";
import { styles } from "./data/styles";
import History from "./components/History";
import Modal from "./components/Modal";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [style, setStyle] = useState(styles[0]);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("");

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

  function erroAoCarregarImagem() {
    setLoading(false);
    setError("Não foi possível gerar a imagem. Tente novamente.");
  }

  function gerarImagem() {
    if (!prompt.trim()) return;
    setError("");
    setLoading(true);

    const fullprompt = `${prompt} ${style.prompt}`;
    const url = gerarImagemURL(fullprompt);
    console.log(url);
    setImageUrl(url);
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
  function abrirModal() {
    setModalOpen(true);
  }

  function fecharModal() {
    setModalOpen(false);
  }

  function limparHistorico() {
    setHistory([]);
    setImageUrl("");
    fecharModal();
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
          onImageError={erroAoCarregarImagem}
        />

        <DownloadButton imageUrl={imageUrl} />
      </main>
      {error && (
        <div className="mt-4 rounded-lg bg-red-900/40 border border-red-500 text-red-200 px-4 py-3">
          ❌ {error}
        </div>
      )}

      <History
        history={history}
        search={search}
        setSearch={setSearch}
        restaurarImagem={restaurarImagem}
        removerImagem={removerImagem}
        alternarFavorito={alternarFavorito}
        limparHistorico={limparHistorico}
        abrirModal={abrirModal}
      />

      <Modal
        isOpen={modalOpen}
        title="Limpar histórico"
        message="Deseja realmente apagar todo o histórico?"
        onConfirm={limparHistorico}
        onCancel={fecharModal}
      />
    </div>
  );
}
