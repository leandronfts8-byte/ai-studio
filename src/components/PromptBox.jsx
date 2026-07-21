import PromptInput from "./PromptInput";
import GenerationSettings from "./GenerationSettings";
import GenerateButton from "./GenerateButton";

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
}) {
  return (
    <div className="bg-slate-900 p-6 rounded-2xl">
      <PromptInput prompt={prompt} setPrompt={setPrompt} />

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
      />

      <GenerateButton gerarImagem={gerarImagem} loading={loading} />
    </div>
  );
}
