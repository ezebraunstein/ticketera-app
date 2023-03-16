import { useState, useEffect } from "react";
import { createTipoEntrada } from "../graphql/mutations";
//import { listTipoEntradas } from "../graphql/queries";
import { v4 as uuid } from "uuid";
import { Amplify, API, graphqlOperation } from "aws-amplify";
import awsExports from "../aws-exports";

Amplify.configure(awsExports);

function CrearTipoEntrada({ eventId }) {

    //const [tipoEntradas, setTipoEntradas] = useState([]);
    const [tipoEntradaData, setTipoEntradaData] = useState({});

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
        setTipoEntradaData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleInputChangeBool = (typeTicket) => {
        const { name, value, type, checked } = typeTicket.target;
        const inputValue = type === "checkbox" ? checked : value;
        setTipoEntradaData((prevData) => ({
            ...prevData,
            [name]: inputValue
        }));
    };

    const handleSubmit = async (typeTicket) => {
        typeTicket.preventDefault();
        const createTipoEntradaInput = {
          id: uuid(),
          monto: parseInt(tipoEntradaData.monto),
          descripcion: tipoEntradaData.descripcion,
          cantidad: parseInt(tipoEntradaData.cantidad),
          activo: Boolean(tipoEntradaData.activo),
          fechaInicio: new Date(tipoEntradaData.fechaInicio).toISOString(),
          fechaFin: new Date(tipoEntradaData.fechaFin).toISOString(),
          eventoID: eventId,
        };
        const createdTipoEntrada = await API.graphql(
          graphqlOperation(createTipoEntrada, { input: createTipoEntradaInput })
        );
        const tipoEntradaId = createdTipoEntrada.data.createTipoEntrada.id;
        await API.graphql(
          graphqlOperation(updateEvento, {
            input: {
              id: eventId, 
              TipoEntradas: [...tipoEntradaData.TipoEntradas, tipoEntradaId],
            },
          })
        );
      };
      
    return (
        <form onSubmit={handleSubmit}>
            <label className='labelTypeTicket'>
                Monto Tipo Ticket:
                <input className='inputTypeTicket'
                    type="int"
                    name="monto"
                    value={tipoEntradaData.monto}
                    onChange={handleInputChange}
                />
            </label>
            <label className='labelTypeTicket'>
                Descripcion:
                <input className='inputTypeTicket'
                    type="text"
                    name="descripcion"
                    value={tipoEntradaData.descripcion}
                    onChange={handleInputChange}
                />
            </label>
            <label className='labelTypeTicket'>
                Cantidad:
                <input className='inputTypeTicket'
                    type="int"
                    name="cantidad"
                    value={tipoEntradaData.cantidad}
                    onChange={handleInputChange}
                />
            </label>
            <label className='labelTypeTicket'>
                Activo:
                <input className='inputTypeTicket'
                    type="checkbox"
                    name="activo"
                    checked={tipoEntradaData.activo}
                    onChange={handleInputChangeBool}
                />
            </label>

            <label className='labelTypeTicket'>
                Fecha Inicio:
                <input className='inputTypeTicket'
                    type="date"
                    name="fechaInicio"
                    value={tipoEntradaData.fechaInicio}
                    onChange={handleInputChange}
                />
            </label>
            <label className='labelTypeTicket'>
                Fecha Fin:
                <input className='inputTypeTicket'
                    type="date"
                    name="fechaFin"
                    value={tipoEntradaData.fechaFin}
                    onChange={handleInputChange}
                />
            </label>

            <label className='labelTypeTicket'>
                <button className='buttonEvent' type="submit">Agregar Tipo Ticket</button>
            </label>
        </form>
    );
}


export default CrearTipoEntrada;