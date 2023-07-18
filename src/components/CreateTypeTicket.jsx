import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import CircularProgress from '@mui/material/CircularProgress';
import { Alert, AlertTitle } from '@mui/material';
import './CSS/TypeTicket.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

function CreateTypeTicket({ eventId, onTypeTicketCreated }) {

    //MUI ALERT
    //const [isSubmitting, setIsSubmitting] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [loading, setLoading] = useState(true);

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
        setIsSubmitting(true);

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
        try {
            const response = await axios.post('https://z3ugo4nnbix764rh7lnsymkb540sldrc.lambda-url.us-east-1.on.aws/', JSON.stringify({ createTypeTicketInput: createTypeTicketInput }), {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setSuccessAlert(true);

            setTimeout(() => {
                navigate(`/edit-event/${createEventInput.id}`);
            }, 1000);

        } catch (error) {

            setErrorAlert(true);

        } finally {
            setIsSubmitting(false);
        }
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

    return (
        <div>
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

            {isSubmitting && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.9)', zIndex: 999 }}>
                    <CircularProgress />
                </div>
            )}
            {successAlert && (
                <Alert variant="filled" severity="success">
                    <AlertTitle>Éxito!</AlertTitle>
                    Tipo Ticket creado con éxito!
                </Alert>
            )}
            {errorAlert && (
                <Alert variant="filled" severity="error">
                    <AlertTitle>Error!</AlertTitle>
                    Error al crear el Tipo Ticket!
                </Alert>
            )}
        </div>
    );
};

export default CreateTypeTicket;