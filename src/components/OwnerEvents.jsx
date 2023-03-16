// import { API, graphqlOperation, Storage } from "aws-amplify";
// import { listEventos } from "../graphql/queries";
// import { useState, useEffect } from "react";
// import "./EventsGrid.css";
// import Event from "./Event"

// const OwnerEvents = () => {

//     const [events, setEvents] = useState([]);
//     const fetchEvents = async () => {
//         try {
//             const eventsData = await API.graphql(graphqlOperation(listEventos));
//             const eventsList = eventsData.data.listEventos.items;
//             const filterEventsList = eventsList.filter(event => event.usuarioID === "8173738281");
//             const eventsWithImages = await Promise.all(
//                 filterEventsList.map(async (event) => {
//                     const imageUrl = await Storage.get(event.imagenBanner, { expires: 60 });
//                     event.imageUrl = imageUrl;
//                     return event;
//                 })
//             );
//             setEvents(eventsWithImages);
//         } catch (error) {
//             console.log("", error);
//         }
//     };

//     useEffect(() => {
//         fetchEvents();
//     }, []);

//     return (
//         <div id="boxes">
//             <h1 className="featuredEvents">🎉Mis Eventos🎉</h1>
//             <div className="container" style={{ display: "flex", flexWrap: "wrap" }}>
//                 {events.map((event) => (
//                     <div key={event.id} className="box" style={{ flexBasis: "25%", marginBottom: "20px" }}>
//                         <img src={event.imageUrl} alt={event.nombreEvento} />
//                         <h3>{event.nombreEvento}</h3>
//                         <p>{event.descripcion}</p>
//                         <button onClick={null} className="btnBuy">
//                             <i className="icon-ticket"></i>Acceder
//                         </button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default OwnerEvents;

import "./EventsGrid.css";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { listEvents } from "../graphql/queries";
import { useState, useEffect } from "react";
import Event from "./Event";

const OwnerEvents = () => {

  const [events, setEvents] = useState([]);
  const [showNewComponent, setShowNewComponent] = useState(false);

  const fetchEvents = async () => {
    try {
      const eventsData = await API.graphql(graphqlOperation(listEvents));
      const eventsList = eventsData.data.listEvents.items;
      const filterEventsList = eventsList.filter(
        (event) => event.userID === "87986687687"
      );
      const eventsWithImages = await Promise.all(
        filterEventsList.map(async (event) => {
          const imageUrl = await Storage.get(event.bannerEvent, {
            expires: 60,
          });
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

  function handleButtonClick() {
    setShowNewComponent(true); // set showNewComponent to true when button is clicked
  }

  const [eventAux, setEventAux] = useState({});

  function getEvent(event) {
    setEventAux(event);
  }

  return (
    <div id="boxes">
      <h1 className="featuredEvents">🎉Mis Eventos🎉</h1>
      <div className="container" style={{ display: "flex", flexWrap: "wrap" }}>
        {events.map((event) => (
          <div
            key={event.id}
            className="box"
            style={{ flexBasis: "25%", marginBottom: "20px" }}
          >
            <img src={event.imageUrl} alt={event.nameEvent} />
            <h3>{event.nameEvent}</h3>
            <p>{event.descriptionEvent}</p>
            <button
              onClick={function () {
                handleButtonClick();
                getEvent(event);
              }}
              className="btnBuy"
            >
              <i className="icon-ticket"></i>Acceder</button>
          </div>
        ))}
      </div>
      {showNewComponent && <Event data={eventAux} />}
    </div>
  );
};

export default OwnerEvents;
