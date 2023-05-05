import axios from 'axios';

async function sendEmailWithQR(userEmail, nameEvent, ticketId, base64QRCode, nameTT) {
    try {
        const result = await axios.post('https://h456ccae4obnzd5xj2535byzk40pkrdf.lambda-url.us-east-1.on.aws/', {
            userEmail, nameEvent, ticketId, base64QRCode, nameTT
        });
        console.log('Email sent:', result);
    } catch (error) {
        console.error('Failed to send email:', error);
    }
};

export default sendEmailWithQR;

// import axios from 'axios';

// async function sendEmailWithQR(userEmail, nameEvent, attachments) {
//     try {
//         const result = await axios.post('https://h456ccae4obnzd5xj2535byzk40pkrdf.lambda-url.us-east-1.on.aws/', {
//             userEmail, nameEvent, attachments
//         });
//         console.log('Email sent:', result);
//     } catch (error) {
//         console.error('Failed to send email:', error);
//     }
// };

// export default sendEmailWithQR;