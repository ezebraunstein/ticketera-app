import "./App.css";
import Header from "./components/Header";
import Slider from "./components/Slider";
import SearchBar from "./components/SearchBar";
import EventsGrid from "./components/EventsGrid";
import CreateEvent from "./components/CreateEvent";
import CreateTypeTicket from "./components/CreateTypeTicket";
import CreateUser from "./components/CreateUser";
import OwnerEvents from "./components/OwnerEvents";
import Event from "./components/Event";
import EditEvent from "./components/EditEvent";
import Login from "./components/Login";
import awsExports from "./aws-exports";
import { Amplify } from "aws-amplify";
import { Route, Routes } from 'react-router-dom';
import FooterCreateEvent from "./components/FooterCreateEvent";
import '@aws-amplify/ui-react/styles.css';



Amplify.configure(awsExports);

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={
          <div>
            <Header />
            <Slider />
            <SearchBar />
            <EventsGrid />
            <FooterCreateEvent />
          </div>
        } />
        <Route path="/login" element={
          <div>
            <Header />
            <Login />
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
        <Route path="/edit-event/:eventId" element={
          <div>
            <Header />
            <EditEvent />
            <FooterCreateEvent />
          </div>
        } />
      </Routes>
    </div>
  );
}

export default App;


