import "./CSS/EventBox.css";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { listEvents } from "../graphql/queries";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import SearchBar from "./SearchBar";
import Fuse from "fuse.js";
import { CircularProgress } from "@mui/material";

const HomeEvents = () => {

    //CLOUDFRONT URL
    const cloudFrontUrl = 'https://d1vjh7v19d1zbm.cloudfront.net';

    //PARAMS
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);

    //MUI LOADING
    const [loading, setLoading] = useState(true);


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
                    const imagePath = `${event.bannerEvent}`;
                    const imageUrl = `${cloudFrontUrl}/${imagePath}`;
                    event.imageUrl = imageUrl;
                    return event;
                })
            );
            setEvents(eventsWithImages);
            setFilteredEvents(eventsWithImages);
            setLoading(false);
        } catch (error) {
            console.log("", error);
            setLoading(false);
        }
    };

    const goToBuyEvent = (eventId) => {
        navigate(`/buy-ticket/${eventId}`);
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <>
            {/* {loading && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.5)', zIndex: 999 }}>
                    <CircularProgress />
                </div>
            )} */}
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
        </>
    );
};

export default HomeEvents;
