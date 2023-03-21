import "./HomeEvents.css";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { listEvents } from "../graphql/queries";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const HomeEvents = () => {

    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const fetchEvents = async () => {
        try {
            const eventsData = await API.graphql(graphqlOperation(listEvents));
            const eventsList = eventsData.data.listEvents.items;
            const eventsWithImages = await Promise.all(
                eventsList.map(async (event) => {
                    const imageUrl = await Storage.get(event.bannerEvent, { expires: 60 });
                    event.imageUrl = imageUrl;
                    return event;
                })
            );
            setEvents(eventsWithImages);
        } catch (error) {
            console.log("", error);
        }
    };

    const goToBuyEvent = (eventId) => {
        navigate(`/buy-ticket/${eventId}`);
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
                        <img src={event.imageUrl} alt={event.nameEvent} />
                        <h3>{event.nameEvent}</h3>
                        <p>{event.descriptionEvent}</p>
                        <button onClick={() => goToBuyEvent(event.id)} className="btnBuy">Comprar Tickets</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeEvents;
