export default function sortStandardListings(arrays) {
  const flattenedArray = arrays.flat();

  return flattenedArray.sort((a, b) => b.created - a.created);
}
