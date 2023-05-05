import { API, graphqlOperation } from 'aws-amplify';
import AWS from 'aws-sdk';
import { createTicket } from '../graphql/mutations';
import { updateTypeTicket } from '../graphql/mutations';
import Swal from 'sweetalert2';
import sendEmailWithQR from './SendEmail';
import { v4 as uuid } from 'uuid';
import QRGenerator from './QRGenerator';

AWS.config.update({
    region: "us-east-1",
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
});

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const handleCheckout = async (data, cart, eventData) => {

    const emailUser = data.email;
    const dniUser = data.dni;

    try {
        const ticketPromises = cart.flatMap(async (item) => {
            return Array.from({ length: item.selectedQuantity }, async () => {
                const ticketId = uuid();
                const nameEvent = eventData.nameEvent;
                const eventId = eventData.id;
                const nameTT = item.nameTT;
                const key = await QRGenerator(eventId, ticketId, emailUser, nameEvent, nameTT);

                const ticketData = {
                    id: ticketId,
                    qrTicket: key.key,
                    validTicket: true,
                    dniTicket: dniUser,
                    emailTicket: emailUser,
                    typeticketID: item.id,
                };

                // await API.graphql(graphqlOperation(createTicket, { input: ticketData }));
                // return attachment;

                await dynamoDb.put({
                    TableName: 'Ticket-zn4tkt5eivea5af5egpjlychcm-dev',
                    Item: ticketData
                }).promise();

                // await dynamoDb.update({
                //     TableName: 'Payment-zn4tkt5eivea5af5egpjlychcm-dev',
                //     Key: { id: 'b383f9a7-8f97-4cf5-9eac-1109eb9153fa' },
                //     UpdateExpression: 'set paymentStatus = :q, updatedAt = :u',
                //     ExpressionAttributeValues: { ':q': 'COMPLETED', ':u': new Date().toISOString() },
                // }).promise();

            });
        });

        //const attachments = await Promise.all(ticketPromises);

        //await sendEmailWithQR(emailUser, eventData.nameEvent, attachments);

        await Promise.all(ticketPromises);

        for (const item of cart) {
            const itemID = item.id;
            const itemQuantity = item.quantityTT - item.selectedQuantity;

            // const updateTypeTicketInput = {
            //     id: itemID,
            //     quantityTT: itemQuantity,
            // };

            // await API.graphql({
            //     query: updateTypeTicket,
            //     variables: { input: updateTypeTicketInput }
            // });

            await dynamoDb.update({
                TableName: 'TypeTicket-zn4tkt5eivea5af5egpjlychcm-dev',
                Key: { id: itemID },
                UpdateExpression: 'set quantityTT = :q',
                ExpressionAttributeValues: { ':q': itemQuantity },
            }).promise();
        };

        Swal.fire({
            icon: 'success',
            title: 'Ticket(s) enviados correctamente! Revisa tu casilla de spam!',
            showConfirmButton: true,
            confirmButtonText: 'Aceptar'
        });

    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error creating ticket(s)',
        });
    }
};

export default handleCheckout;
