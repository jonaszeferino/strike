// components/ScreenshotCapture.js
import html2canvas from 'html2canvas';
import { useState } from 'react';

const ScreenshotCapture = () => {
  const [screenshotUrl, setScreenshotUrl] = useState('');

  const handleCaptureClick = () => {
    html2canvas(document.body).then((canvas) => {
      const imgUrl = canvas.toDataURL('image/png');
      setScreenshotUrl(imgUrl);
    });
  };

  return (
    <div>
      <button onClick={handleCaptureClick}>Capturar Tela</button>
     URL: {screenshotUrl && <img src={screenshotUrl} alt="Captura de Tela" />}
    </div>
  );
};

export default ScreenshotCapture;
