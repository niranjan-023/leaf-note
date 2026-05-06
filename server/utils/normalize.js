const normalizeText = (text) => {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
};

export default normalizeText;