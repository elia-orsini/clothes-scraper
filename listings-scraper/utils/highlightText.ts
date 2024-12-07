export function highlightText(text: string, key: string, colour: string) {
  const regex = new RegExp(key, "gi");

  return text.replace(
    regex,
    (match) => `<span class="bg-${colour}">${match}</span>`
  );
}
