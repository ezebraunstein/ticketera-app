import React from 'react';
import { useState, useEffect } from "react";
import { createTypeTicket } from "../graphql/mutations";
//import { listTypeTickets } from "../graphql/queries";
import { v4 as uuid } from "uuid";
import { Amplify, API, graphqlOperation } from "aws-amplify";
import awsExports from "../aws-exports";

Amplify.configure(awsExports);

function CreateTypeTicket({ }) {

    //const [tipoEntradas, setTipoEntradas] = useState([]);
    const [typeTicketData, setTypeTicketData] = useState({});

    // const fetchTipoEntrada = async () => {
    //     try {
    //         const typeticketsData = await API.graphql(graphqlOperation(listTipoEntradas));
    //         const typeticketList = typeticketsData.data.listEventos.items;
    //         console.log("Lista de TipoEntradas", typeticketList);
    //         setTipoEntradas(typeticketList);
    //     } catch (error) {
    //         console.log("error on fetching type tickets", error);
    //     }
    // };

    // useEffect(() => {
    //     fetchTipoEntrada();
    // }, []);

    const handleInputChange = (typeTicket) => {
        const { name, value } = typeTicket.target;
        setTypeTicketData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleInputChangeBool = (typeTicket) => {
        const { name, value, type, checked } = typeTicket.target;
        const inputValue = type === "checkbox" ? checked : value;
        setTypeTicketData((prevData) => ({
            ...prevData,
            [name]: inputValue
        }));
    };

    const handleSubmit = async (typeTicket) => {
        typeTicket.preventDefault();
        const createTypeTicketInput = {
            id: uuid(),
            nameTT: typeTicketData.nameTT,
            priceTT: parseInt(typeTicketData.priceTT),
            quantityTT: parseInt(typeTicketData.quantityTT),
            descriptionTT: typeTicketData.descriptionTT,
            activeTT: Boolean(typeTicketData.activeTT),
            startDateTT: new Date(typeTicketData.startDateTT).toISOString(),
            endDateTT: new Date(typeTicketData.endDateTT).toISOString(),
            eventID: "65265442363626"
        };
        await API.graphql(
            graphqlOperation(createTypeTicket, { input: createTypeTicketInput })
        );
    };

    return (
        <form onSubmit={handleSubmit}>
            <label className='labelTypeTicket'>
                Nombre:
                <input className='inputTypeTicket'
                    type="text"
                    name="nameTT"
                    value={typeTicketData.nameTT}
                    onChange={handleInputChange}
                />
            </label>
            <label className='labelTypeTicket'>
                Monto:
                <input className='inputTypeTicket'
                    type="int"
                    name="priceTT"
                    value={typeTicketData.priceTT}
                    onChange={handleInputChange}
                />
            </label>
            <label className='labelTypeTicket'>
                Descripcion:
                <input className='inputTypeTicket'
                    type="text"
                    name="descriptionTT"
                    value={typeTicketData.descriptionTT}
                    onChange={handleInputChange}
                />
            </label>
            <label className='labelTypeTicket'>
                Cantidad:
                <input className='inputTypeTicket'
                    type="int"
                    name="quantityTT"
                    value={typeTicketData.quantityTT}
                    onChange={handleInputChange}
                />
            </label>
            <label className='labelTypeTicket'>
                Activo:
                <input className='inputTypeTicket'
                    type="checkbox"
                    name="activeTT"
                    checked={typeTicketData.activeTT}
                    onChange={handleInputChangeBool}
                />
            </label>
            <label className='labelTypeTicket'>
                Fecha Inicio:
                <input className='inputTypeTicket'
                    type="date"
                    name="startDateTT"
                    value={typeTicketData.startDateTT}
                    onChange={handleInputChange}
                />
            </label>
            <label className='labelTypeTicket'>
                Fecha Fin:
                <input className='inputTypeTicket'
                    type="date"
                    name="fechaFin"
                    value={typeTicketData.endDateTT}
                    onChange={handleInputChange}
                />
            </label>

            <label className='labelTypeTicket'>
                <button className='buttonEvent' type="submit">Agregar Tipo Ticket</button>
            </label>
        </form>
    );
}


export default CreateTypeTicket;