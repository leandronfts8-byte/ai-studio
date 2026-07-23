import { aspectRatios } from "../utils/aspectRatios";

export function gerarImagemURL({
  prompt,
  resolution = "1024",
  aspectRatio = "1:1",
  model = "flux",
  seed,
  negativePrompt = "",
}) {
  // Seed
  const finalSeed =
    seed && seed !== "" ? Number(seed) : Math.floor(Math.random() * 2147483647);

  // Proporção escolhida
  const ratio = aspectRatios[aspectRatio] || aspectRatios["1:1"];

  const base = Number(resolution);

  let width;
  let height;

  if (ratio.w >= ratio.h) {
    width = base;
    height = Math.round((base * ratio.h) / ratio.w);
  } else {
    height = base;
    width = Math.round((base * ratio.w) / ratio.h);
  }

  // Prompt negativo
  const negative =
    negativePrompt.trim() !== ""
      ? `&negative_prompt=${encodeURIComponent(negativePrompt)}`
      : "";

  return (
    "https://image.pollinations.ai/prompt/" +
    encodeURIComponent(prompt) +
    "?width=" +
    width +
    "&height=" +
    height +
    "&model=" +
    model +
    "&seed=" +
    finalSeed +
    negative
  );
}
