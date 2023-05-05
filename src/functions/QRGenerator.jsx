import QRCode from 'qrcode';
import AWS from 'aws-sdk';
import { createCanvas } from 'canvas';
import { Storage } from 'aws-amplify';
import sendEmailWithQR from './SendEmail';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.REACT_APP_ACCESS_KEY,
        secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
    }
});


const qrGenerator = async (eventId, ticketId, userEmail, nameEvent, nameTT) => {
    try {
        const canvas = createCanvas(1000, 1000);
        await QRCode.toCanvas(canvas, ticketId, {
            errorCorrectionLevel: 'H',
        });

        const dataUrl = canvas.toDataURL("image/jpeg");
        const response = await fetch(dataUrl);
        const blob = await response.blob();
        const arrayBuffer = await new Response(blob).arrayBuffer();

        let downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = `${nameEvent}-${nameTT}.jpeg`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        const fileName = `public/events/${eventId}/tickets/${ticketId}.jpeg`;
        // const storedQR = await Storage.put(fileName, blob, {
        //     contentType: "image/jpeg",
        // });

        const uploadParams = {
            Bucket: 'ticketeraapp-bucket-main110931-dev',
            Key: fileName,
            Body: arrayBuffer,
            ContentType: 'image/jpeg'
        };

        try {
            const response = await s3Client.send(new PutObjectCommand(uploadParams));
            console.log("Success", response);
        } catch (err) {
            console.log("Error", err);
        }

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
            key: fileName,
        };

    } catch (error) {
        console.error('Failed to generate QR code as JPEG:', error);
    }

};

export default qrGenerator;

