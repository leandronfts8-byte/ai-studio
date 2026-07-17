import { prompts } from "../data/prompts";

export function getRandomPrompt() {
  const index = Math.floor(Math.random() * prompts.length);
  return prompts[index];
}
