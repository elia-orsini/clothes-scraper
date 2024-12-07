import { COLOURS } from "constants/highlightColours";
import { highlightText } from "./highlightText";
import { sanitize } from "dompurify";

export function toHTML(text = "", keys: string[]) {
  if (!text) return;

  // add line breaks
  text = text.replace(/%/g, "\n");

  // hightlight search keys
  for (let i = 0; i < keys.length; i++) {
    text = highlightText(text, keys[i], COLOURS[i]);
  }

  return `<p>${sanitize(text)}</p>`;
}
