// import { API, graphqlOperation } from "aws-amplify";
// import { createTicket } from "../graphql/mutations";
// import { updateTypeTicket } from "../graphql/mutations";
// import Swal from "sweetalert2";
// import { v4 as uuid } from 'uuid';
// import QRGenerator from "./QRGenerator";

// const handleCheckout = async (cart, eventData, email, dni, eventId, navigate) => {

//     if (cart.length === 0) {
//         alert("Tu carrito esta vacío");
//         return;
//     }

//     try {
//         const ticketPromises = cart.flatMap(async (item) => {
//             return Array.from({ length: item.selectedQuantity }, async () => {
//                 const ticketId = uuid();
//                 const nameEvent = eventData.nameEvent;
//                 const key = await QRGenerator(eventId, ticketId, email, nameEvent);
//                 const ticketData = {
//                     id: ticketId,
//                     qrTicket: key,
//                     validTicket: true,
//                     dniTicket: dni,
//                     emailTicket: email,
//                     typeticketID: item.id,
//                 };
//                 debugger;
//                 await API.graphql(graphqlOperation(createTicket, { input: ticketData }));
//             });
//         });

//         await Promise.all(ticketPromises);

//         for (const item of cart) {
//             const itemID = item.id;
//             const itemQuantity = item.quantityTT - item.selectedQuantity;

//             const updateTypeTicketInput = {
//                 id: itemID,
//                 quantityTT: itemQuantity,
//             };

//             await API.graphql({
//                 query: updateTypeTicket,
//                 variables: { input: updateTypeTicketInput },
//             });
//         }

//         Swal.fire({
//             icon: "success",
//             title: "Ticket(s) created successfully!",
//             showConfirmButton: true,
//             confirmButtonText: "Aceptar",
//         }).then(() => {
//             navigate("/");
//         });
//     } catch (error) {
//         Swal.fire({
//             icon: "error",
//             title: "Error creating ticket(s)",
//         });
//     }
// };

// export default handleCheckout;
