export function parseSpecialCharacters(textToParse: string): string {
  const textWithConvertedApostrophes = textToParse.replace(/[’'´`^~¨ˆ˜˘˙˚ˇ]/g, " ");

  // the normalize method breaks down accented characters (i.e. é becomes e').
  // the replace removes all the accents (that are now standalone).
  const textWithConvertedAccents = textWithConvertedApostrophes
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  const matches = textWithConvertedAccents.match(/[A-Za-z0-9 ]/g);

  return matches ? matches.join("") : "";
}
