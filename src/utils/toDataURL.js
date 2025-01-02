export const toDataURL = async (src) => {
  const blob = await fetch(src).then((r) => r.blob());
  const dataUrl = await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
  return dataUrl;
};
