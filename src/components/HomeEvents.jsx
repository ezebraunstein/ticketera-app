import "./CSS/EventBox.css";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { listEvents } from "../graphql/queries";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import SearchBar from "./SearchBar";
import Fuse from "fuse.js";

const HomeEvents = () => {
    const cloudFrontUrl = 'https://d3bs2q3jr96pao.cloudfront.net';
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);

    const handleSearch = (searchQuery) => {
        if (searchQuery === "") {
            setFilteredEvents(events);
        } else {
            const fuse = new Fuse(events, {
                keys: ["nameEvent"],
                threshold: 0.3,
            });
            const results = fuse.search(searchQuery);
            setFilteredEvents(results.map((result) => result.item));
        }
    };

    const fetchEvents = async () => {
        try {
            const eventsData = await API.graphql(graphqlOperation(listEvents));
            const eventsList = eventsData.data.listEvents.items;
            const eventsWithImages = await Promise.all(
                eventsList.map(async (event) => {
                    const imagePath = `public/${event.bannerEvent}`;
                    const imageUrl = `${cloudFrontUrl}/${imagePath}`;
                    event.imageUrl = imageUrl;
                    return event;
                })
            );
            setEvents(eventsWithImages);
            setFilteredEvents(eventsWithImages);
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
            <SearchBar onSearch={handleSearch} />
            <div className="container" style={{ display: "flex", flexWrap: "wrap" }}>
                {filteredEvents.map((event) => (
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
