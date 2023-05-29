import { API, graphqlOperation, Storage } from "aws-amplify";
import { listEvents } from "../graphql/queries";
import { useState, useEffect } from "react";
import "./CSS/Slider.css";

const Slider = () => {

  const cloudFrontUrl = 'https://d1vjh7v19d1zbm.cloudfront.net';
  const [events, setEvents] = useState([]);
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
      setEvents(eventsWithImages.slice(-4));
    } catch (error) {
      console.log("", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="slider-frame">
      <ul>
        {events.slice(0, 4).map((event) => {
          return (
            <li>
              <img className="sliderImg" src={event.imageUrl} alt="" />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Slider;


