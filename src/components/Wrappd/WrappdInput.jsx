import html2canvas from 'html2canvas';

const WrappdInput = ({ userName, elementRef, handleCustomTitle }) => {
  const captureScreenshot = async () => {
    if (!elementRef.current) return;
    try {
      const canvas = await html2canvas(elementRef.current, {
        useCORS: true, // Enables cross-origin handling
        allowTaint: false,
        // scale: 2, // Improves image resolution
      });
      const dataURL = canvas.toDataURL('image/png');

      // Dynamically create a download link
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = `tapped-export-${userName}.png`;
      link.click();
      link.remove();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error capturing screenshot:', error);
    }
  };

  return (
    <div className="flex w-full flex-col">
      <input
        type="text"
        className="mb-2 w-full appearance-none rounded border p-2 leading-tight text-gray-700 focus:outline-none"
        onChange={handleCustomTitle}
        placeholder="Give a custom title instead of a date range.."
      />
      <button
        onClick={captureScreenshot}
        className="mt-4 rounded border bg-black px-3 py-2 text-white"
      >
        Download PNG to share
      </button>
    </div>
  );
};

export default WrappdInput;
