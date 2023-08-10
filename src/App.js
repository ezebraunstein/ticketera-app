import React from "react";
import { Route, Routes } from 'react-router-dom';
import Slider from "./components/Slider";
import HomeEvents from "./components/HomeEvents";
import CreateEvent from "./components/CreateEvent";
import CreateTypeTicket from "./components/CreateTypeTicket";
import CreateUser from "./components/CreateUser";
import OwnerEvents from "./components/OwnerEvents";
import Event from "./components/Event";
import EditEvent from "./components/EditEvent";
import Login from "./components/Login";
import BuyEvent from './components/BuyEvent';
import Layout from "./components/Layout";
import Charts from './components/Charts'
import RRPPEvents from "./components/RRPPEvents";
import RRPPEvent from "./components/RRPPEvent";
import RRPPData from "./components/RRPPData";
import './App.css';
import '@aws-amplify/ui-react/styles.css';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={
          <Layout>
            <Slider />
            <HomeEvents />
          </Layout>
        }
        />
        <Route path="/charts" element={
          <Layout>
            <Charts />
          </Layout>
        } />
        <Route path="/login" element={
          <Layout>
            <Login />
          </Layout>
        } />
        <Route path="/create-event" element={
          <Layout>
            <CreateEvent />
          </Layout>
        } />
        <Route path="/create-typeticket" element={
          <Layout>
            <CreateTypeTicket />
          </Layout>
        } />
        <Route path="/create-user" element={
          <Layout>
            <CreateUser />
          </Layout>
        } />
        <Route path="/owner-events" element={
          <Layout>
            <OwnerEvents />
          </Layout>
        } />
        <Route path="/events" element={
          <Layout>
            <OwnerEvents />
          </Layout>
        } />
        <Route path="/events/:eventId" element={
          <Layout>
            <Event />
          </Layout>
        } />
        <Route path="/events/:eventId/rrpp" element={
          <Layout>
            <RRPPData />
          </Layout>
        } />
        <Route path="/edit-event/:eventId" element={
          <Layout>
            <EditEvent />
          </Layout>
        } />
        <Route path="/buy-ticket/:eventId/:rrppEventId?" element={
          <Layout>
            <BuyEvent />
          </Layout>
        } />
        <Route path="/checkout/success" element={
          <Layout>
            <h1>Success!</h1>
          </Layout>
        } />
        <Route path="/checkout/failure" element={
          <Layout>
            <h1>Failure!</h1>
          </Layout>
        } />
        <Route path="/rrpp-events" element={
          <Layout>
            <RRPPEvents />
          </Layout>
        } />
        <Route path="/rrpp-events/:rrppEventId" element={
          <Layout>
            <RRPPEvent />
          </Layout>
        } />
      </Routes>
    </div>
  );
}

export default App;
