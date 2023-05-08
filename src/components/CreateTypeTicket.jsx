import { useState, useEffect } from "react";
import { createTypeTicket } from "../graphql/mutations";
import { v4 as uuid } from "uuid";
import { Amplify, API, graphqlOperation } from "aws-amplify";
import './CSS/TypeTicket.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import awsExports from "../aws-exports";

Amplify.configure(awsExports);

function CreateTypeTicket({ eventId, onTypeTicketCreated }) {

    const [typeTicketData, setTypeTicketData] = useState({});

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
            startDateTT: new Date(typeTicketData.startDateTT),
            endDateTT: new Date(typeTicketData.endDateTT),
            eventID: eventId
        };
        await API.graphql(
            graphqlOperation(createTypeTicket, { input: createTypeTicketInput })
        );
        if (onTypeTicketCreated) {
            onTypeTicketCreated(createTypeTicketInput);
        }
        setTypeTicketData({
            nameTT: "",
            priceTT: "",
            quantityTT: "",
            descriptionTT: "",
            activeTT: false,
            startDateTT: "",
            endDateTT: "",
        });
    };

    // return (
    //     <form onSubmit={handleSubmit}>
    //         <label className='labelTypeTicket'>
    //             Nombre:
    //             <input className='inputTypeTicket'
    //                 type="text"
    //                 name="nameTT"
    //                 value={typeTicketData.nameTT}
    //                 onChange={handleInputChange}
    //             />
    //         </label>
    //         <label className='labelTypeTicket'>
    //             Monto:
    //             <input className='inputTypeTicket'
    //                 type="int"
    //                 name="priceTT"
    //                 value={typeTicketData.priceTT}
    //                 onChange={handleInputChange}
    //             />
    //         </label>
    //         <label className='labelTypeTicket'>
    //             Descripcion:
    //             <input className='inputTypeTicket'
    //                 type="text"
    //                 name="descriptionTT"
    //                 value={typeTicketData.descriptionTT}
    //                 onChange={handleInputChange}
    //             />
    //         </label>
    //         <label className='labelTypeTicket'>
    //             Cantidad:
    //             <input className='inputTypeTicket'
    //                 type="int"
    //                 name="quantityTT"
    //                 value={typeTicketData.quantityTT}
    //                 onChange={handleInputChange}
    //             />
    //         </label>
    //         <label className='labelTypeTicket'>
    //             Activo:
    //             <input className='inputTypeTicket'
    //                 type="checkbox"
    //                 name="activeTT"
    //                 checked={typeTicketData.activeTT}
    //                 onChange={handleInputChangeBool}
    //             />
    //         </label>
    //         <label className='labelTypeTicket'>
    //             Fecha Inicio:
    //             <input className='inputTypeTicket'
    //                 type="date"
    //                 name="startDateTT"
    //                 value={typeTicketData.startDateTT}
    //                 onChange={handleInputChange}
    //             />
    //         </label>
    //         <label className='labelTypeTicket'>
    //             Fecha Fin:
    //             <input className='inputTypeTicket'
    //                 type="date"
    //                 name="endDateTT"
    //                 value={typeTicketData.endDateTT}
    //                 onChange={handleInputChange}
    //             />
    //         </label>

    //         <label className='labelTypeTicket'>
    //             <button className='buttonEvent' type="submit">Agregar Tipo Ticket</button>
    //         </label>
    //     </form>
    // );

    return (
        <div className="createTypeTicketContainer">
            <form onSubmit={handleSubmit} className="create-type-ticket-form">
                <div className="form-group row">
                    <label htmlFor="nameTT" className="col-sm-3 col-form-label">Nombre:</label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            name="nameTT"
                            className="form-control"
                            id="nameTT"
                            value={typeTicketData.nameTT}
                            placeholder="Nombre del tipo de entrada (obligatorio)"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <br />
                <div className="form-group row">
                    <label htmlFor="priceTT" className="col-sm-3 col-form-label">Monto:</label>
                    <div className="col-sm-9">
                        <input
                            type="int"
                            name="priceTT"
                            className="form-control"
                            id="priceTT"
                            value={typeTicketData.priceTT}
                            placeholder="Monto del tipo de entrada (obligatorio)"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <br />
                <div className="form-group row">
                    <label htmlFor="descriptionTT" className="col-sm-3 col-form-label">Descripción:</label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            name="descriptionTT"
                            className="form-control"
                            id="descriptionTT"
                            value={typeTicketData.descriptionTT}
                            placeholder="Descripción del tipo de entrada (opcional)"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <br />
                <div className="form-group row">
                    <label htmlFor="quantityTT" className="col-sm-3 col-form-label">Cantidad:</label>
                    <div className="col-sm-9">
                        <input
                            type="int"
                            name="quantityTT"
                            className="form-control"
                            id="quantityTT"
                            value={typeTicketData.quantityTT}
                            placeholder="Cantidad de entradas (obligatorio)"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <br />
                <div className="form-group row">
                    <label htmlFor="startDateTT" className="col-sm-3 col-form-label">Fecha Inicio:</label>
                    <div className="col-sm-9">
                        <input
                            type="date"
                            name="startDateTT"
                            className="form-control"
                            id="startDateTT"
                            value={typeTicketData.startDateTT}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <br />
                <div className="form-group row">
                    <label htmlFor="endDateTT" className="col-sm-3 col-form-label">Fecha Fin:</label>
                    <div className="col-sm-9">
                        <input
                            type="date"
                            name="endDateTT"
                            className="form-control"
                            id="endDateTT"
                            value={typeTicketData.endDateTT}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <br />
                <div className="form-group row justify-content-center">
                    <label htmlFor="activeTT" className="col-sm-3 col-form-label">Activo:</label>
                    <div className="col-sm-9 d-flex align-items-center">
                        <div className="form-check">
                            <input
                                type="checkbox"
                                name="activeTT"
                                className="form-check-input"
                                id="activeTT"
                                checked={typeTicketData.activeTT}
                                onChange={handleInputChangeBool}
                            />
                        </div>
                    </div>
                </div>


                <br />
                <div className="form-group row">
                    <div className="col-sm-12 text-center">
                        <button type="submit" className="btn-Buy">
                            Agregar Tipo Ticket
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateTypeTicket;