import QRCode from 'qrcode';
import { createCanvas } from 'canvas';
import { Storage } from 'aws-amplify';
import sendEmailWithQR from './SendEmail';

const qrGenerator = async (eventId, ticketId, userEmail, nameEvent, nameTT) => {
    try {
        const canvas = createCanvas(290, 290);
        await QRCode.toCanvas(canvas, ticketId, {
            errorCorrectionLevel: 'H',
        });

        const dataUrl = canvas.toDataURL("image/jpeg");
        const response = await fetch(dataUrl);
        const blob = await response.blob();

        let downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = `${nameEvent}-${nameTT}.jpeg`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        const fileName = `events/${eventId}/tickets/${nameEvent}-${nameTT}.jpeg`;
        const storedQR = await Storage.put(fileName, blob, {
            contentType: "image/jpeg",
        });

        const blobToBase64 = (blob) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
        };

        const base64QRCode = await blobToBase64(blob);

        const attachment = {
            filename: `${nameEvent}-${nameTT}.jpeg`,
            content: base64QRCode.split('base64,')[1],
            contentType: 'image/jpeg',
            contentDisposition: 'attachment',
        };

        await sendEmailWithQR(userEmail, nameEvent, ticketId, base64QRCode, nameTT);

        return {
            attachment,
            key: storedQR.key,
        };

    } catch (error) {
        console.error('Failed to generate QR code as JPEG:', error);
    }

};

export default qrGenerator;

