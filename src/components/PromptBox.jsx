import { useState } from "react";

import PromptInput from "./PromptInput";
import GenerationSettings from "./GenerationSettings";
import GenerateButton from "./GenerateButton";

import PromptLibraryButton from "./PromptLibraryButton";
import PromptLibraryModal from "./PromptLibraryModal";

import { getRandomPrompt } from "../utils/randomPrompt";
import { styles } from "../data/styles";

import SavePromptButton from "./SavePromptButton";
import SavePromptModal from "./SavePromptModal";

import { addPrompt } from "../utils/promptLibrary";

export default function PromptBox({
  prompt,
  setPrompt,
  gerarImagem,
  loading,
  style,
  setStyle,
  resolution,
  setResolution,
  model,
  setModel,
  seed,
  setSeed,
  manualSeed,
  setManualSeed,
  negativePrompt,
  setNegativePrompt,
  aspectRatio,
  setAspectRatio,
}) {
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [savePromptOpen, setSavePromptOpen] = useState(false);

  function salvarPrompt(promptData) {
    addPrompt(promptData);
    setSavePromptOpen(false);
  }

  function aplicarPrompt(promptSelecionado) {
    if (!promptSelecionado) return;

    setPrompt(promptSelecionado.prompt);

    const selectedStyle = styles.find(
      (item) => item.id === promptSelecionado.style,
    );

    if (selectedStyle) {
      setStyle(selectedStyle);
    }
  }

  function surpreender() {
    aplicarPrompt(getRandomPrompt());
  }

  return (
    <>
      <div className="glass rounded-2xl p-6 animate-glow">
        <PromptInput
          prompt={prompt}
          setPrompt={setPrompt}
          surpreender={surpreender}
        />

        <div className="mt-4 flex gap-2">
          <PromptLibraryButton onClick={() => setLibraryOpen(true)} />
          <SavePromptButton onClick={() => setSavePromptOpen(true)} />
        </div>

        <GenerationSettings
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

        <GenerateButton gerarImagem={gerarImagem} loading={loading} />
      </div>

      <PromptLibraryModal
        isOpen={libraryOpen}
        onClose={() => setLibraryOpen(false)}
        onSelect={aplicarPrompt}
      />
      <SavePromptModal
        isOpen={savePromptOpen}
        onClose={() => setSavePromptOpen(false)}
        onSave={salvarPrompt}
        prompt={prompt}
        style={style}
      />
    </>
  );
}
