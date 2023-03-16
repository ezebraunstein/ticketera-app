import "./App.css";
import { useState, useEffect } from "react";
import { listEventos } from "../graphql/queries";
import { createEvento } from "../graphql/mutations";
import { v4 as uuid } from "uuid";
import { Amplify, API, graphqlOperation } from "aws-amplify";
import awsExports from "../aws-exports";

Amplify.configure(awsExports);

function App() {

    const [events, setEvents] = useState([]);
    const [eventData, setEventsData] = useState({});
    const [bannerURL, setBannerURL] = useState('');

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const eventData = await API.graphql(graphqlOperation(listEventos));
            const eventList = eventData.data.listEventos.items;
            console.log("Lista de Eventos", eventList);
            setEvents(eventList);
        } catch (error) {
            console.log("error on fetching events", error);
        }
    };

    const uploadEvent = async () => {
        const createEventInput = {
            id: uuid(),
            nombreEvento: eventData.nombreEvento,
            fechaInicio: new Date(eventData.fechaInicio).toISOString(),
            fechaFin: new Date(eventData.fechaFin).toISOString(),
            fechaAlta: new Date().toISOString(),
            fechaBaja: new Date().toISOString(),
            descripcion: eventData.descripcion,
            imagenBanner: eventData.imagenBanner,
            imagenMini: eventData.imagenMini,
            usuarioID: eventData.usuarioID,

        };
        await API.graphql(
            graphqlOperation(createEvento, { input: createEventInput })
        );
    };

    const fetchBanner = async idx => {
        const bannerFilePath = events[idx].filePath;
        try {
            const fileAccessURL = await Storage.get(bannerFilePath, { expires: 60 });
            console.log('access url', fileAccessURL);
            setBannerURL(fileAccessURL);
            return;
        } catch (error) {
            console.error('error accessing the file from s3', error);
            setBannerURL('');
        }
    };

    return (
        <div className="App">
            <table></table>
            <h1>Lista de Usuarios</h1>
            <div className="eventList">
                {events.map((events, idx) => {
                    return (
                        <div className="event" key={`events${idx}`}>
                            <h2>{events.nombreEvento}</h2>
                            <h2>{events.fechaInicio}</h2>
                            <h2>{events.fechaFin}</h2>
                            <h2>{events.fechaAlta}</h2>
                            <h2>{events.fechaBaja}</h2>
                            <h2>{events.descripcion}</h2>
                            <h2>{() => fetchBanner(idx)}</h2>
                            <h2>{events.imagenMini}</h2>
                        </div>
                    );
                })}
            </div>
            <div className="newevent">
                <input
                    id="nombreEvento"
                    placeholder="Nombre Evento"
                    value={eventData.nombreEvento}
                    onChange={(e) =>
                        setEventsData({ ...eventData, nombreEvento: e.target.value })
                    }
                ></input>
                <input
                    id="fechaInicio"
                    placeholder="Fecha Inicio"
                    value={eventData.fechaInicio}
                    onChange={(e) =>
                        setEventsData({ ...eventData, fechaInicio: e.target.value })
                    }
                ></input>
                <input
                    id="fechaFin"
                    placeholder="Fecha Fin"
                    value={eventData.fechaFin}
                    onChange={(e) =>
                        setEventsData({ ...eventData, fechaFin: e.target.value })
                    }
                ></input>


                <input
                    id="descripcion"
                    placeholder="Descripcion"
                    value={eventData.descripcion}
                    onChange={(e) =>
                        setEventsData({ ...eventData, descripcion: e.target.value })
                    }
                ></input>
                <input
                    id="imagenBanner"
                    placeholder="Imagen Banner"
                    value={eventData.imagenBanner}
                    onChange={(e) => setEventsData({ ...eventData, imagenBanner: e.target.value })}
                ></input>
                <input
                    id="imagenMini"
                    placeholder="Imagen Mini"
                    value={eventData.imagenMini}
                    onChange={(e) =>
                        setEventsData({ ...eventData, imagenMini: e.target.value })
                    }
                ></input>
                <input
                    id="usuarioID"
                    placeholder="Usuario ID"
                    value={eventData.usuarioID}
                    onChange={(e) =>
                        setEventsData({ ...eventData, usuarioID: e.target.value })
                    }
                ></input>

                <button onClick={uploadEvent}>Agregar Evento</button>
            </div>
        </div>
    );
}

export default App;
