import { useState } from "react";

import PromptInput from "./PromptInput";
import GenerationSettings from "./GenerationSettings";
import GenerateButton from "./GenerateButton";

import { getRandomPrompt } from "../utils/randomPrompt";
import { styles } from "../data/styles";

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
  const [savePromptOpen, setSavePromptOpen] = useState(false);

  function salvarPrompt(promptData) {
    addPrompt(promptData);
    setSavePromptOpen(false);
  }

  function surpreender() {
    const randomPromptItem = getRandomPrompt();
    setPrompt(randomPromptItem.prompt);

    const selectedStyle = styles.find(
      (item) => item.id === randomPromptItem.style,
    );

    if (selectedStyle) {
      setStyle(selectedStyle);
    }
  }

  return (
    <>
      <div className="glass rounded-2xl p-6 animate-glow">
        <PromptInput
          prompt={prompt}
          setPrompt={setPrompt}
          surpreender={surpreender}
          onSavePrompt={() => setSavePromptOpen(true)}
        />

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
