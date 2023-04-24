import QRCode from 'qrcode';
import { createCanvas } from 'canvas';
import { Storage } from 'aws-amplify';
import axios from 'axios';

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
        downloadLink.download = `${nameTT}.jpeg`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        const fileName = `events/${eventId}/tickets/${nameTT}.jpeg`;
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

        await sendEmailWithQR(
            userEmail,
            nameEvent,
            ticketId,
            base64QRCode,
            nameTT
        );
        debugger;
        return storedQR.key;

    } catch (error) {
        console.error('Failed to generate QR code as JPEG:', error);
    }
};

const sendEmailWithQR = async (userEmail, nameEvent, ticketId, base64QRCode, nameTT) => {
    try {
        const result = await axios.post('https://h456ccae4obnzd5xj2535byzk40pkrdf.lambda-url.us-east-1.on.aws/', {
            userEmail, nameEvent, ticketId, base64QRCode, nameTT
        });
        console.log('Email sent:', result);
    } catch (error) {
        console.error('Failed to send email:', error);
    }
};

export default qrGenerator;

