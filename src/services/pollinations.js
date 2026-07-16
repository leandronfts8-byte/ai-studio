export function gerarImagemURL(prompt) {
  return (
    "https://image.pollinations.ai/prompt/" +
    encodeURIComponent(prompt) +
    "?width=1024&height=1024&seed=" +
    Date.now()
  );
}