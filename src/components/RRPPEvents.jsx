import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listRRPPEvents } from '../graphql/queries';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import ModalRRPPEvent from './ModalRRPPEvent';
import './CSS/EventBox.css';

const cloudFrontUrl = 'https://d1vjh7v19d1zbm.cloudfront.net';

const RRPPEvents = ({ user }) => {

    const navigate = useNavigate();
    const [rrppEvents, setRrppEvents] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        fetchRrppEvents();
    }, [refreshKey]);

    const handleEventLinked = () => {
        setRefreshKey(oldKey => oldKey + 1);
    };

    const fetchRrppEvents = async () => {
        try {
            const rrppEventsData = await API.graphql(
                graphqlOperation(listRRPPEvents, {
                    filter: { rrppID: { eq: user.username } },
                })
            );

            const rrppEventsList = rrppEventsData.data.listRRPPEvents.items;
            const rrppEventsWithImages = await Promise.all(
                rrppEventsList.map(async (rrppEvent) => {
                    const event = rrppEvent.Event;
                    const imagePath = `${event.bannerEvent}`;
                    const imageUrl = `${cloudFrontUrl}/${imagePath}`;
                    rrppEvent.Event.imageUrl = imageUrl;
                    return rrppEvent;
                })
            );
            setRrppEvents(rrppEventsWithImages);
        } catch (error) {
            console.error('Error fetching rrpp events', error);
        }
    };

    const handleButtonClick = (rrppEventId) => {
        navigate(`/publica-events/${rrppEventId}`);
    };

    return (
        <div id="boxes">
            <h1 className="featuredEvents">Eventos RRPP</h1>
            <ModalRRPPEvent onEventLinked={handleEventLinked} user={user} />
            <div className="container" style={{ display: 'flex', flexWrap: 'wrap' }}>
                {rrppEvents.map((rrppEvent) => (
                    <div
                        key={rrppEvent.id}
                        className="box"
                        style={{ flexBasis: '25%', marginBottom: '20px' }}
                    >
                        <img src={rrppEvent.Event.imageUrl} alt={rrppEvent.Event.nameEvent} />
                        <h3>{rrppEvent.Event.nameEvent}</h3>
                        <button onClick={() => handleButtonClick(rrppEvent.id)} className="btnBuy">
                            <i className="icon-ticket"></i>Acceder
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default withAuthenticator(RRPPEvents);
