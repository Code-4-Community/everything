
export const GenerateQrCode = (original: string) => {
  const qrcodeContainer = document.getElementById('qrcodeContainer');

  // clear previous QR code
  if (qrcodeContainer) {
    qrcodeContainer.innerHTML = '';
  }

  return (
  );
};

export default GenerateQrCode;
