// import QRCode from 'qrcode';
// import { createCanvas } from 'canvas';

// const qrGenerator = async (eventId, ticketId) => {
//     try {

//         const canvas = createCanvas(290, 290);
//         await QRCode.toCanvas(canvas, ticketId, {
//             errorCorrectionLevel: 'H',
//         });

//         const dataUrl = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
//         let downloadLink = document.createElement("a");
//         downloadLink.href = dataUrl;
//         downloadLink.download = `${'qr'}.jpeg`;
//         document.body.appendChild(downloadLink);
//         downloadLink.click();
//         document.body.removeChild(downloadLink);

//         const fileName = `events/${eventId}/tickets/${ticketId}.jpeg`;
//         const storedQR = await Storage.put(fileName,  hereGoesTheQrFile, {
//             contentType: "image/jpeg",
//         });

//         return storedQR.key;

//     } catch (error) {
//         console.error('Failed to generate QR code as JPEG:', error);
//     }
// };

// export default qrGenerator;


import QRCode from 'qrcode';
import { createCanvas } from 'canvas';
import { Storage } from 'aws-amplify';

const qrGenerator = async (eventId, ticketId) => {
    try {
        const canvas = createCanvas(290, 290);
        await QRCode.toCanvas(canvas, ticketId, {
            errorCorrectionLevel: 'H',
        });

        const dataUrl = canvas.toDataURL("image/jpeg");
        const response = await fetch(dataUrl);
        const blob = await response.blob(); // Blob object datos binarios tipados

        // Create download link and trigger download
        // let downloadLink = document.createElement("a");
        // downloadLink.href = URL.createObjectURL(blob);
        // downloadLink.download = `${'qr'}.jpeg`;
        // document.body.appendChild(downloadLink);
        // downloadLink.click();
        // document.body.removeChild(downloadLink);
        
        const fileName = `events/${eventId}/tickets/${ticketId}.jpeg`;
        const storedQR = await Storage.put(fileName, blob, {
            contentType: "image/jpeg",
        });

        return storedQR.key;

    } catch (error) {
        console.error('Failed to generate QR code as JPEG:', error);
    }
};

export default qrGenerator;




