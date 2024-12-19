import { useState } from 'react';
import html2canvas from 'html2canvas';

const WrappdInput = ({ userName, elementRef, handleChange }) => {
  const [screenshot, setScreenshot] = useState(null);

  console.log('data', userName);

  // const captureScreenshot = async () => {
  //   if (!elementRef.current) return;

  //   try {
  //     const canvas = await html2canvas(elementRef.current, {
  //       useCORS: true, // Enables cross-origin handling
  //       // scale: 2, // Improves image resolution
  //     });
  //     const dataURL = canvas.toDataURL('image/png');

  //     // Dynamically create a download link
  //     const link = document.createElement('a');
  //     link.href = dataURL;
  //     link.download = `tapped-export-${userName}.png`;
  //     link.click();
  //     link.remove();
  //   } catch (error) {
  //     console.error('Error capturing screenshot:', error);
  //   }
  // };

  const captureScreenshot = async () => {
    if (!elementRef.current) return;

    try {
      const canvas = await html2canvas(elementRef.current, {
        useCORS: true, // Enables cross-origin handling
        // scale: 2, // Improves image resolution
      });
      const dataURL = canvas.toDataURL('image/png');
      setScreenshot(dataURL); // Set the screenshot in the state
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error capturing screenshot:', error);
    }
  };

  // const shareOnWhatsApp = async () => {
  //   if (!elementRef.current) return;
  //   try {
  //     const canvas = await html2canvas(elementRef.current);
  //     const dataURL = canvas.toDataURL('image/png');

  //     // Convert the image to a Blob
  //     const response = await fetch(dataURL);
  //     const blob = await response.blob();
  //     const file = new File([blob], `tapped-export-${userName}.png`, {
  //       type: 'image/png',
  //     });

  //     if (navigator.canShare && navigator.canShare({ files: [file] })) {
  //       await navigator.share({
  //         files: [file],
  //         title: `Tapped Stats for ${userName}`,
  //         text: 'Check out my beer stats!',
  //       });
  //     } else {
  //       // Fallback: Use WhatsApp Web with a message
  //       const message = encodeURIComponent('Check out my beer stats!');
  //       const whatsappURL = `https://wa.me/?text=${message}`;
  //       window.open(whatsappURL, '_blank');
  //     }
  //   } catch (error) {
  //     // eslint-disable-next-line no-console
  //     console.error('Error sharing on WhatsApp:', error);
  //   }
  // };

  return (
    <div className="w-full">
      <input
        type="text"
        className="w-[400px] appearance-none rounded border p-2 leading-tight text-gray-700 focus:outline-none"
        onChange={handleChange}
        placeholder="Give a custom title instead of a date range.."
      />
      <button
        onClick={captureScreenshot}
        className="mb-10 ml-4 mt-4 rounded border px-3 py-2"
      >
        Download PNG to share
      </button>
      {screenshot && (
        <div>
          <h2>Screenshot Result:</h2>
          <img
            src={screenshot}
            alt="Rendered Screenshot"
            style={{
              border: '1px solid #ccc',
              maxWidth: '100%',
              marginTop: '10px',
            }}
          />
        </div>
      )}
      {/* <button
        onClick={shareOnWhatsApp}
        className="mb-10 ml-4 mt-4 rounded border bg-green-500 px-3 py-2 text-white"
      >
        Share on WhatsApp
      </button> */}
    </div>
  );
};

export default WrappdInput;