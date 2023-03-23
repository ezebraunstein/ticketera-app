const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: 'us-east-1' });

exports.handler = async (event) => {
    debugger;
    const { from, to, subject, eventId, ticketId, qrBlob } = event;

    const params = {
        Source: from,
        Destination: {
            ToAddresses: [to],
        },
        Message: {
            Subject: {
                Data: subject,
            },
            Body: {
                Html: {
                    Data: `
            <html>
            <head></head>
            <body>
              <h1>Your QR Code</h1>
              <p>Here is your QR code for event ID ${eventId} and ticket ID ${ticketId}:</p>
              <img src="cid:qr-code-image" />
            </body>
            </html>
          `,
                },
            },
        },
        Attachments: [
            {
                Name: 'qr-code.jpeg',
                ContentType: 'image/jpeg',
                ContentDisposition: 'inline',
                ContentId: 'qr-code-image',
                Content: qrBlob.toString('base64'),
            },
        ],
    };

    try {
        const response = await ses.sendEmail(params).promise();
        console.log('Email sent:', response);
    } catch (error) {
        console.error('Failed to send email:', error);
    }
};
