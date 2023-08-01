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
import LayoutPublica from "./components/LayoutPublica";
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
        <Route path="/edit-event/:eventId" element={
          <Layout>
            <EditEvent />
          </Layout>
        } />
        <Route path="/buy-ticket/:eventId" element={
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
        <Route path="/publica-events" element={
          <LayoutPublica>
            <h1>RRPP</h1>
          </LayoutPublica>
        } />
      </Routes>
    </div>
  );
}

export default App;
