export function gerarImagemURL(
  prompt,
  resolution = "1024",
  model = "flux",
  seed,
  negativePrompt = "",
) {
  const finalSeed =
    seed && seed !== "" ? Number(seed) : Math.floor(Math.random() * 2147483647);

  const negative =
    negativePrompt.trim() !== ""
      ? `&negative_prompt=${encodeURIComponent(negativePrompt)}`
      : "";
  return (
    "https://image.pollinations.ai/prompt/" +
    encodeURIComponent(prompt) +
    "?width=" +
    resolution +
    "&height=" +
    resolution +
    "&model=" +
    model +
    "&seed=" +
    finalSeed +
    negative
  );
}
