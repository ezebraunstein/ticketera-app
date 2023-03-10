import { API, graphqlOperation, Storage } from "aws-amplify";
import { listEventos } from "../graphql/queries";
import { useState, useEffect } from "react";
import "./EventsGrid.css";

const EventsGrid = () => {
    const [events, setEvents] = useState([]);
    const fetchEvents = async () => {
        try {
            const eventsData = await API.graphql(graphqlOperation(listEventos));
            const eventsList = eventsData.data.listEventos.items;
            const eventsWithImages = await Promise.all(
                eventsList.map(async (event) => {
                    const imageUrl = await Storage.get(event.imagenBanner, { expires: 60 });
                    event.imageUrl = imageUrl;
                    return event;
                })
            );
            setEvents(eventsWithImages);
        } catch (error) {
            console.log("", error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div id="boxes">
            <h1 className="featuredEvents">🎉Eventos Destacados🎉</h1>
            <div className="container" style={{ display: "flex", flexWrap: "wrap" }}>
                {events.map((event) => (
                    <div key={event.id} className="box" style={{ flexBasis: "25%", marginBottom: "20px" }}>
                        <img src={event.imageUrl} alt={event.nombreEvento} />
                        <h3>{event.nombreEvento}</h3>
                        <p>{event.descripcion}</p>
                        <button href={event.link} className="btnBuy">
                            <i className="icon-ticket"></i>Comprar Tickets
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventsGrid;
