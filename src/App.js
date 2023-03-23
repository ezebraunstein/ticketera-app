import "./App.css";
import '@aws-amplify/ui-react/styles.css';
import { Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import Slider from "./components/Slider";
import SearchBar from "./components/SearchBar";
import HomeEvents from "./components/HomeEvents";
import CreateEvent from "./components/CreateEvent";
import CreateTypeTicket from "./components/CreateTypeTicket";
import CreateUser from "./components/CreateUser";
import OwnerEvents from "./components/OwnerEvents";
import Event from "./components/Event";
import EditEvent from "./components/EditEvent";
import Login from "./components/Login";
import BuyEvent from './components/BuyEvent';
import FooterCreateEvent from "./components/FooterCreateEvent";

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={
          <div>
            <Header />
            <Slider />
            <SearchBar />
            <HomeEvents />
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
        <Route path="/buy-ticket/:eventId" element={
          <div>
            <Header />
            <BuyEvent />
            <FooterCreateEvent />
          </div>
        } />
      </Routes>
    </div>
  );
}

export default App;


