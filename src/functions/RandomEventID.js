import { API, graphqlOperation } from "aws-amplify";
import { listEventos } from "../graphql/queries";

const RandomEventId = async () => {
    try {
      const eventsData = await API.graphql(graphqlOperation(listEventos));
      const eventsList = eventsData.data.listEventos.items.map((event) => event.id);
      const randomEventId = eventsList[Math.floor(Math.random() * eventsList.length)];
      return randomEventId;
    } catch (error) {
      console.log("", error);
    }
  };
  

export default RandomEventId;