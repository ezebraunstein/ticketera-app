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
import { Route, Routes, Link } from 'react-router-dom';
import FooterCreateEvent from "./components/FooterCreateEvent";



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
    <div>
      <Routes>
        <Route path="/" element={
          <div>
            <Header onButtonClick={toggleEventsDisplay} displayEvents={displayEvents} />
            <Slider />
            <SearchBar />
            <EventsGrid />
            <FooterCreateEvent />
          </div>
        } />
        <Route path="/create-event" element={
          <div>
            <Header />
            <CreateEvent />
            <FooterCreateEvent />
          </div>
        } />
        <Route path="/create-typeticket" element={
          <div>
            <Header />
            <CreateTypeTicket />
            <FooterCreateEvent />
          </div>
        } />
        <Route path="/create-user" element={
          <div>
            <Header />
            <CreateUser />
            <FooterCreateEvent />
          </div>
        } />
        <Route path="/owner-events" element={
          <div>
            <Header />
            <OwnerEvents />
            <FooterCreateEvent />
          </div>
        } />
        <Route path="/events" element={
          <div>
            <Header />
            <OwnerEvents />
            <FooterCreateEvent />
          </div>
        } />
        <Route path="/events/:eventId" element={
          <div>
            <Header />
            <Event />
            <FooterCreateEvent />
          </div>
        } />
      </Routes>
    </div>
  );
}

export default App;



// // <div className="App">
// {/* <Header onButtonClick={toggleEventsDisplay} displayEvents={displayEvents} />
//   <ComponentWrapper optionDisplay={displayEvents}>
//     {displayCondition && <Slider />}
//     {displayCondition && <SearchBar />}
//     <EventsGrid /> */}
// {/* <OwnerEvents onButtonClick={toggleDisplayCondition}/> */ }
// {/* <Event /> */ }
// {/* <Footer />
//   </ComponentWrapper>
//   <ComponentWrapper optionDisplay={!displayEvents}>
//     <CreateEvent />
//   </ComponentWrapper> */}
// {/* <CreateTypeTicket />
// {/* <CreateUser />} */}
// // </div>

