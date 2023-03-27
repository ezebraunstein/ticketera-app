import { API, graphqlOperation } from 'aws-amplify';
import { createTicket } from '../graphql/mutations';
import { updateTypeTicket } from '../graphql/mutations';
import Swal from 'sweetalert2';
import { v4 as uuid } from 'uuid';
import QRGenerator from './QRGenerator';

export const handleCheckout = async (data, cart, eventData) => {

    const emailUser = data.email;
    const dniUser = data.dni;
    debugger;
    try {
        const ticketPromises = cart.flatMap(async (item) => {
            return Array.from({ length: item.selectedQuantity }, async () => {
                const ticketId = uuid();
                const nameEvent = eventData.nameEvent;
                const eventId = eventData.id;
                const key = await QRGenerator(eventId, ticketId, emailUser, nameEvent);
                const ticketData = {
                    id: ticketId,
                    qrTicket: key,
                    validTicket: true,
                    dniTicket: dniUser,
                    emailTicket: emailUser,
                    typeticketID: item.id,
                };
                await API.graphql(graphqlOperation(createTicket, { input: ticketData }));
            });
        });

        await Promise.all(ticketPromises);

        for (const item of cart) {
            const itemID = item.id;
            const itemQuantity = item.quantityTT - item.selectedQuantity;

            const updateTypeTicketInput = {
                id: itemID,
                quantityTT: itemQuantity,
            };

            await API.graphql({
                query: updateTypeTicket,
                variables: { input: updateTypeTicketInput }
            });
        }

        Swal.fire({
            icon: 'success',
            title: 'Ticket(s) created successfully!',
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
