/**
 * Converts Markdown formatting to HTML
 * Currently handles: bold (**text** or __text__)
 */
export const markdownToHtml = (markdown) => {
  if (!markdown) return markdown;

  let html = markdown;

  // Convert bold: **text** or __text__ to <strong>text</strong>
  // Use regex with word boundaries to avoid issues
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');

  return html;
};
