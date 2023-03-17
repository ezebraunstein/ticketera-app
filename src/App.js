import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import Slider from "./components/Slider";
import SearchBar from "./components/SearchBar";
import EventsGrid from "./components/EventsGrid";
import ComponentWrapper from "./components/ComponentWrapper";
import CreateEvent from "./components/CreateEvent";
import CreateTypeTicket from "./components/CreateTypeTicket";
import CreateUser from "./components/CreateUser";
import Footer from "./components/Footer";
import OwnerEvents from "./components/OwnerEvents";
import Event from "./components/Event";
import awsExports from "./aws-exports";
import { Amplify } from "aws-amplify";


Amplify.configure(awsExports);

function App() {

  const [displayEvents, setShouldDisplayEvents] = useState(true);
  const [displayCondition, setDisplayCondition] = useState(true);

  const toggleEventsDisplay = () => {
    setShouldDisplayEvents(!displayEvents);
  };

  function toggleDisplayCondition() {
    setDisplayCondition(!displayCondition);
  };

  return (
    <div className="App">
      <Header onButtonClick={toggleEventsDisplay} displayEvents={displayEvents} />
      <ComponentWrapper optionDisplay={displayEvents}>
        {displayCondition && <Slider />}
        {displayCondition && <SearchBar />}
        <EventsGrid />
        {/* <OwnerEvents onButtonClick={toggleDisplayCondition}/> */}
        {/* <Event /> */}
        <Footer />
      </ComponentWrapper>
      <ComponentWrapper optionDisplay={!displayEvents}>
        <CreateEvent />
      </ComponentWrapper>
      {/* <CreateTypeTicket />
      {/* <CreateUser />} */}
    </div>
  );
}

export default App;

