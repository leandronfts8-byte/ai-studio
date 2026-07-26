const STORAGE_KEY = "promptLibrary";

export function loadPromptLibrary() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return [];
  }

  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
}

export function savePromptLibrary(prompts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts));
}

export function addPrompt(prompt) {
  const prompts = loadPromptLibrary();

  const newPrompt = {
    ...prompt,
    id: Date.now(),
    favorite: false,
    createdAt: new Date().toLocaleString("pt-BR"),
    userCreated: true,
  };

  prompts.unshift(newPrompt);

  savePromptLibrary(prompts);

  return newPrompt;
}

export function removePrompt(id) {
  const prompts = loadPromptLibrary().filter((prompt) => prompt.id !== id);

  savePromptLibrary(prompts);

  return prompts;
}

export function toggleFavorite(id) {
  const prompts = loadPromptLibrary().map((prompt) =>
    prompt.id === id
      ? {
          ...prompt,
          favorite: !prompt.favorite,
        }
      : prompt,
  );

  savePromptLibrary(prompts);

  return prompts;
}

export function updatePrompt(updatedPrompt) {
  const prompts = loadPromptLibrary().map((prompt) =>
    prompt.id === updatedPrompt.id ? updatedPrompt : prompt,
  );

  savePromptLibrary(prompts);

  return prompts;
}
