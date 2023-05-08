import './CSS/CreateEvent.css';
import { useState, useEffect, useLayoutEffect } from "react";
import { Storage } from 'aws-amplify';
import { createEvent } from "../graphql/mutations";
import { v4 as uuid } from "uuid";
import { API, graphqlOperation } from "aws-amplify";
import Swal from 'sweetalert2';
import { withAuthenticator } from '@aws-amplify/ui-react';
import checkUser from './CheckUser';
import { useNavigate } from 'react-router-dom';
import CreateUser from './CreateUser';
import { GoogleMap, LoadScript, Marker, StandaloneSearchBox } from "@react-google-maps/api";
import '@aws-amplify/ui-react/styles.css';

function AddEvent({ user }) {

  const [eventData, setEventData] = useState({});
  const [bannerFile, setBannerFile] = useState(null);
  const [miniBannerFile, setMiniBannerFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [mapsApiLoaded, setMapsApiLoaded] = useState(true); //FALSE?
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapRef, setMapRef] = useState(null);
  const googleMapsLibraries = ["places"];

  const [showYourComponent, setShowYourComponent] = useState(false);

  const navigate = useNavigate();

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setSelectedLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useLayoutEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    setMapsApiLoaded(true);
  }, []);

  useEffect(() => {
    const checkUserExistence = async () => {
      const userExists = await checkUser(user);
      if (userExists) {
        setShowYourComponent(false);
      } else {
        setShowYourComponent(true);
      }
    };
    checkUserExistence();
  }, [user]);

  const handleBannerChange = (event) => {
    const file = event.target.files[0];
    setBannerFile(file);
  };

  const handleMiniChange = (event) => {
    const file = event.target.files[0];
    setMiniBannerFile(file);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    Swal.fire({
      title: 'Creando evento...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });

    const createEventInput = {
      id: uuid(),
      nameEvent: eventData.nameEvent,
      locationEvent: JSON.stringify(selectedLocation),
      descriptionEvent: eventData.descriptionEvent,
      bannerEvent: "",
      miniBannerEvent: "",
      startDateE: new Date(eventData.startDateE),
      endDateE: new Date(eventData.endDateE),
      upDateE: new Date(),
      downDateE: new Date(),
      userID: user.username

    };

    if (bannerFile) {
      const bannerKey = `events/${createEventInput.id}/banner`;
      await Storage.put(bannerKey, bannerFile, {
        contentType: 'image/jpeg'
      });
      createEventInput.bannerEvent = bannerKey;
    }

    if (miniBannerFile) {
      const miniBannerKey = `events/${createEventInput.id}/miniBanner`;
      await Storage.put(miniBannerKey, miniBannerFile, {
        contentType: 'image/jpeg'
      });
      createEventInput.miniBannerEvent = miniBannerKey;
    }

    try {

      await API.graphql(
        graphqlOperation(createEvent, { input: createEventInput }))

      Swal.fire({
        icon: 'success',
        title: 'Evento creado con éxito.',
        showConfirmButton: true,
        confirmButtonText: 'Aceptar'
      }).then(() => {
        navigate(`/edit-event/${createEventInput.id}`)
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al crear el evento.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {showYourComponent && < CreateUser />}
      <div>
        <form className="eventForm" onSubmit={handleSubmit}>
          <label className='labelEvent'>
            Nombre Evento:
            <input
              className="inputEvent"
              type="text"
              name="nameEvent"
              value={eventData.nameEvent}
              onChange={handleInputChange}
              placeholder={!eventData.nameEvent ? "Campo obligatorio" : ""}
            />
          </label>
          <label className='labelEvent'>
            Ubicación:
            {mapsApiLoaded && (
              <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS} libraries={googleMapsLibraries}>
                <StandaloneSearchBox
                  onLoad={(ref) => setMapRef(ref)}
                  onPlacesChanged={() => {
                    const place = mapRef.getPlaces()[0];
                    if (place) {
                      setSelectedLocation({
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng(),
                      });
                    }
                  }}
                >
                  <input
                    type="text"
                    placeholder="(opcional)"
                    className="inputEvent"
                    style={{ width: "100%" }}
                  />
                </StandaloneSearchBox>
                <GoogleMap
                  mapContainerStyle={{
                    width: "100%",
                    height: "300px",
                  }}
                  zoom={10}
                  center={selectedLocation || { lat: -34.397, lng: 150.644 }}
                  onClick={(e) =>
                    setSelectedLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() })
                  }
                >
                  {selectedLocation && (
                    <Marker position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }} />
                  )}
                </GoogleMap>
              </LoadScript>
            )}
          </label>
          <label className='labelEvent'>
            Descripción:
            <input className='inputEvent'
              type="text"
              name="descriptionEvent"
              value={eventData.descriptionEvent}
              onChange={handleInputChange}
              placeholder={!eventData.nameEvent ? "(opcional)" : ""}
            />
          </label>
          <label className='labelEvent'>
            Fecha Inicio:
            <input className='inputEvent'
              type="date"
              name="startDateE"
              value={eventData.startDateE}
              onChange={handleInputChange}
              placeholder={!eventData.nameEvent ? "Campo obligatorio" : ""}
            />
          </label>
          {/* <label className="endDateE">
            Fecha Fin:
            <input className='inputEvent'
              type="date"
              name="endDateE"
              value={eventData.endDateE}
              onChange={handleInputChange}
            />
          </label> */}
          <label className='labelEvent'>
            Imagen Flyer Grande:
            <input className='inputEvent'
              type="file"
              accept=".jpg,.jpeg,.png"
              name="bannerEvent"
              onChange={handleBannerChange}
            />
          </label>
          <label className='labelEvent'>
            Imagen Flyer Chica:
            <input className='inputEvent'
              type="file"
              accept=".jpg,.jpeg,.png"
              name="miniBannerEvent"
              onChange={handleMiniChange}
            />
          </label>
          <label className='labelEvent'>
            <button className='btn-Buy' type="submit" disabled={!eventData.nameEvent || !eventData.startDateE || !bannerFile || isSubmitting}>Agregar Evento</button>
          </label>
        </form>
      </div>
    </>
  );
};

export default withAuthenticator(AddEvent);