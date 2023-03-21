import { API } from 'aws-amplify';
import QRCode from 'qrcode';
import { createCanvas } from 'canvas';
import { Storage } from 'aws-amplify';

const qrGenerator = async (eventId, ticketId, userEmail) => {
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
        downloadLink.download = `${'qr'}.jpeg`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        const fileName = `events/${eventId}/tickets/${ticketId}.jpeg`;
        const storedQR = await Storage.put(fileName, blob, {
            contentType: "image/jpeg",
        });

        await sendEmailWithQR(
            'cooperativa.fort.llc@gmail.com',
            userEmail,
            'Your QR Code',
            eventId,
            ticketId,
            blob
        );

        return storedQR.key;

    } catch (error) {
        console.error('Failed to generate QR code as JPEG:', error);
    }
};

const sendEmailWithQR = async (from, to, subject, eventId, ticketId, qrBlob) => {
    try {
        const result = await API.post('apisendemail', '/sendemail', {
            body: { from, to, subject, eventId, ticketId, qrBlob: qrBlob.toString('base64') },
        });
        console.log('Email sent:', result);
    } catch (error) {
        console.error('Failed to send email:', error);
    }
};

export default qrGenerator;
