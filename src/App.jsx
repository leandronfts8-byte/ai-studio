import { useState, useEffect, useRef } from "react";

import Header from "./components/Header";
import PromptBox from "./components/PromptBox";
import { gerarImagemURL } from "./services/pollinations";
import ImageViewer from "./components/ImageViewer";
import { styles } from "./data/styles";
import History from "./components/History";
import Modal from "./components/Modal";
import Toast from "./components/Toast";
import ImageInfo from "./components/ImageInfo";
import PromptLibraryModal from "./components/PromptLibraryModal";
import { addPrompt } from "./utils/promptLibrary";
import Footer from "./components/Footer";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const actualSeedRef = useRef(null);
  const [style, setStyle] = useState(() => {
    const saved = localStorage.getItem("aiStudio_style");
    if (saved) {
      const found = styles.find((s) => s.id === saved);
      if (found) return found;
    }
    return styles[0];
  });
  const [resolution, setResolution] = useState(() => {
    return localStorage.getItem("aiStudio_resolution") || "1024";
  });
  const [model, setModel] = useState(() => {
    return localStorage.getItem("aiStudio_model") || "flux";
  });
  const [seed, setSeed] = useState(() => {
    return localStorage.getItem("aiStudio_seed") || "auto";
  });
  const [manualSeed, setManualSeed] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [aspectRatio, setAspectRatio] = useState(() => {
    return localStorage.getItem("aiStudio_aspectRatio") || "1:1";
  });
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [libraryKey, setLibraryKey] = useState(0);
  const isRestoring = useRef(false);

  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem("history");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem("aiStudio_style", style.id);
    localStorage.setItem("aiStudio_resolution", resolution);
    localStorage.setItem("aiStudio_model", model);
    localStorage.setItem("aiStudio_seed", seed);
    localStorage.setItem("aiStudio_aspectRatio", aspectRatio);
  }, [style, resolution, model, seed, aspectRatio]);

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
      seed: actualSeedRef.current,
      manualSeed,
      negativePrompt,
      createdAt: new Date().toLocaleString("pt-BR"),
      favorite: false,
    };

    setHistory((prevHistory) => [newImage, ...prevHistory]);

    addPrompt({
      title: prompt.length > 30 ? prompt.substring(0, 30) + "..." : prompt,
      category: "Geral",
      prompt,
      style: style.id,
    });
  }

  function erroAoCarregarImagem() {
    setLoading(false);
    setError("Não foi possível gerar a imagem. Tente novamente.");
  }

  function mostrarToast(mensagem) {
    setToast(mensagem);
    setTimeout(() => setToast(""), 3000);
  }

  function gerarImagem() {
    if (!prompt.trim()) return;
    setError("");
    setLoading(true);
    const fullprompt = `${prompt} ${style.prompt}`;

    const isManual = seed === "manual";
    const numericSeed = isManual
      ? manualSeed || Math.floor(Math.random() * 999999999)
      : Math.floor(Math.random() * 999999999);
    actualSeedRef.current = numericSeed;

    const url = gerarImagemURL({
      prompt: fullprompt,
      resolution,
      aspectRatio,
      model,
      seed: numericSeed,
      negativePrompt,
    });
    setImageUrl(url);
  }

  const gerarImagemRef = useRef(gerarImagem);

  useEffect(() => {
    gerarImagemRef.current = gerarImagem;
  });

  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        gerarImagemRef.current();
        return;
      }

      if (e.key === "Escape") {
        if (libraryOpen) {
          setLibraryOpen(false);
          return;
        }
        if (modalOpen) {
          setModalOpen(false);
          return;
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [libraryOpen, modalOpen]);

  function restaurarImagem(item) {
    isRestoring.current = true;
    setImageUrl(item.imageUrl);
    setPrompt(item.prompt);
    const selectedStyle = styles.find((s) => s.name === item.style);
    if (selectedStyle) {
      setStyle(selectedStyle);
      setResolution(item.resolution || "1024");
      setModel(item.model || "flux");
      setSeed("manual");
      setManualSeed(String(item.seed || ""));
      setNegativePrompt(item.negativePrompt || "");
      setAspectRatio(item.aspectRatio || "1:1");
    }
    mostrarToast("Imagem restaurada com todas as configurações");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function carregarPrompt(item) {
    setPrompt(item.prompt);
    const selectedStyle = styles.find((s) => s.name === item.style);
    if (selectedStyle) setStyle(selectedStyle);
    mostrarToast("Prompt carregado!");
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  function openLibrary() {
    setLibraryKey((prev) => prev + 1);
    setLibraryOpen(true);
  }

  function aplicarPrompt(promptSelecionado) {
    if (!promptSelecionado) return;
    setPrompt(promptSelecionado.prompt);
    const selectedStyle = styles.find(
      (item) => item.id === promptSelecionado.style,
    );
    if (selectedStyle) setStyle(selectedStyle);
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
    <div className="min-h-screen text-white flex flex-col">
      <Header totalGenerated={history.length} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6 flex-1 w-full">
        <ImageViewer
          imageUrl={imageUrl}
          prompt={prompt}
          loading={loading}
          onImageLoad={finalizarCarregamento}
          onImageError={erroAoCarregarImagem}
          mostrarToast={mostrarToast}
        />

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

        {error && (
          <div className="glass rounded-xl border border-red-500/30 bg-red-900/20 px-5 py-4 animate-slide-up">
            <div className="flex items-center gap-2 text-red-300">
              <span>❌</span>
              <p className="text-sm font-medium">{error}</p>
            </div>
          </div>
        )}

        <ImageInfo settings={imageSettings} />

        <History
          history={history}
          setHistory={setHistory}
          onRestoreImage={restaurarImagem}
          onLoadPrompt={carregarPrompt}
          onOpenLibrary={openLibrary}
        />
      </main>

      <PromptLibraryModal
        key={libraryKey}
        isOpen={libraryOpen}
        onClose={() => setLibraryOpen(false)}
        onSelect={aplicarPrompt}
      />

      <Modal
        isOpen={modalOpen}
        title="Limpar histórico"
        message="Deseja realmente apagar todo o histórico?"
        onConfirm={limparHistorico}
        onCancel={fecharModal}
      />

      <Toast message={toast} />

      <Footer />
    </div>
  );
}
