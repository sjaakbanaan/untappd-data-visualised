export const formatAnalysisHtml = (analysis) =>
  analysis
    .split('\n')
    .filter((paragraph) => paragraph.trim())
    .map((paragraph) => `<p class="mb-3">${paragraph.trim()}</p>`)
    .join('');
