import { useState, useEffect } from "react";

import Header from "./components/Header";
import PromptBox from "./components/PromptBox";
import { gerarImagemURL } from "./services/pollinations";
import ImageViewer from "./components/ImageViewer";
import DownloadButton from "./components/DownloadButton";
import { styles } from "./data/styles";
import History from "./components/History";
import Modal from "./components/Modal";
import Toast from "./components/Toast";
import ImageInfo from "./components/ImageInfo";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [style, setStyle] = useState(styles[0]);
  const [search, setSearch] = useState("");
  const [resolution, setResolution] = useState("1024");
  const [model, setModel] = useState("flux");
  const [seed, setSeed] = useState("auto");
  const [manualSeed, setManualSeed] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [sortBy, setSortBy] = useState("favorites");
  const [aspectRatio, setAspectRatio] = useState("1:1");

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
      resolution,
      model,
      aspectRatio,
      seed,
      manualSeed,
      negativePrompt,
      createdAt: new Date().toLocaleString("pt-BR"),
      favorite: false,
    };

    setHistory((prevHistory) => [newImage, ...prevHistory]);
  }

  function erroAoCarregarImagem() {
    setLoading(false);
    setError("Não foi possível gerar a imagem. Tente novamente.");
  }

  function mostrarToast(mensagem) {
    setToast(mensagem);
    setTimeout(() => {
      setToast("");
    }, 3000);
  }

  function gerarImagem() {
    if (!prompt.trim()) return;

    setError("");
    setLoading(true);

    const fullprompt = `${prompt} ${style.prompt}`;

    const url = gerarImagemURL({
      prompt: fullprompt,
      resolution,
      aspectRatio,
      model,
      seed: seed === "manual" ? manualSeed : undefined,
      negativePrompt,
    });

    setImageUrl(url);
  }

  function restaurarImagem(item) {
    setImageUrl(item.imageUrl);
    setPrompt(item.prompt);

    const selectedStyle = styles.find((s) => s.name === item.style);
    if (selectedStyle) {
      setStyle(selectedStyle);
      setResolution(item.resolution || "1024");
      setModel(item.model || "flux");
      setSeed(item.seed || "auto");
      setManualSeed(item.manualSeed || "");
      setNegativePrompt(item.negativePrompt || "");
    }
    mostrarToast("Imagem restaurada");
  }

  function removerImagem(id) {
    setHistory((prevHistory) => prevHistory.filter((item) => item.id !== id));
    mostrarToast("Imagem removida");
  }

  function fecharModal() {
    setModalOpen(false);
  }

  function limparHistorico() {
    setHistory([]);
    setImageUrl("");
    mostrarToast("Histórico limpo com sucesso!");
    setModalOpen(false);
  }

  function alternarFavorito(id) {
    const item = history.find((item) => item.id === id);
    if (!item) return;
    const novoFavorito = !item.favorite;
    setHistory((prevHistory) =>
      prevHistory.map((item) =>
        item.id === id ? { ...item, favorite: !item.favorite } : item,
      ),
    );
    mostrarToast(
      novoFavorito
        ? "Imagem adicionada aos favoritos!"
        : "Imagem removida dos favoritos!",
    );
  }

  const imageSettings = {
    prompt,
    style,
    model,
    resolution,
    aspectRatio,
    seed: seed === "manual" ? manualSeed : "Auto",
    negativePrompt,
    createdAt:
      history.length > 0
        ? history[0].createdAt
        : new Date().toLocaleString("pt-BR"),
  };

  return (
    <div className="min-h-screen text-white">
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
        <PromptBox
          prompt={prompt}
          setPrompt={setPrompt}
          gerarImagem={gerarImagem}
          loading={loading}
          style={style}
          setStyle={setStyle}
          resolution={resolution}
          setResolution={setResolution}
          model={model}
          setModel={setModel}
          seed={seed}
          setSeed={setSeed}
          manualSeed={manualSeed}
          setManualSeed={setManualSeed}
          negativePrompt={negativePrompt}
          setNegativePrompt={setNegativePrompt}
          aspectRatio={aspectRatio}
          setAspectRatio={setAspectRatio}
        />

        <ImageViewer
          imageUrl={imageUrl}
          prompt={prompt}
          loading={loading}
          onImageLoad={finalizarCarregamento}
          onImageError={erroAoCarregarImagem}
        />

        {error && (
          <div className="glass rounded-xl border border-red-500/30 bg-red-900/20 px-5 py-4 animate-slide-up">
            <div className="flex items-center gap-2 text-red-300">
              <span>❌</span>
              <p className="text-sm font-medium">{error}</p>
            </div>
          </div>
        )}

        <ImageInfo settings={imageSettings} />

        <DownloadButton imageUrl={imageUrl} mostrarToast={mostrarToast} />
      </main>

      <History
        history={history}
        search={search}
        setSearch={setSearch}
        restaurarImagem={restaurarImagem}
        removerImagem={removerImagem}
        alternarFavorito={alternarFavorito}
        limparHistorico={limparHistorico}
        abrirModal={() => setModalOpen(true)}
        mostrarToast={mostrarToast}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <Modal
        isOpen={modalOpen}
        title="Limpar histórico"
        message="Deseja realmente apagar todo o histórico?"
        onConfirm={limparHistorico}
        onCancel={fecharModal}
      />

      <Toast message={toast} />
    </div>
  );
}
