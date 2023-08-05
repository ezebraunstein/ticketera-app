import './CSS/CreateEvent.css';
import { useState, useEffect, useLayoutEffect } from "react";
import { v4 as uuid } from "uuid";
import { withAuthenticator } from '@aws-amplify/ui-react';
import checkUser from './CheckUser';
import { useNavigate } from 'react-router-dom';
import CreateUser from './CreateUser';
import { GoogleMap, LoadScriptNext, Marker, StandaloneSearchBox } from "@react-google-maps/api";
import CircularProgress from '@mui/material/CircularProgress';
import { Alert, AlertTitle } from '@mui/material';
import '@aws-amplify/ui-react/styles.css';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import axios from 'axios';

const s3Client = new S3Client({
    region: "sa-east-1",
    credentials: {
        accessKeyId: process.env.REACT_APP_ACCESS_KEY,
        secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
    }
});

function AddEvent({ user }) {

    //PARAMS
    const [eventData, setEventData] = useState({});
    const [bannerFile, setBannerFile] = useState(null);
    const [miniBannerFile, setMiniBannerFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const [showYourComponent, setShowYourComponent] = useState(false);

    //MUI ALERT
    const [successAlert, setSuccessAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [loading, setLoading] = useState(true);

    //API GOOGLE MAPS
    const [mapsApiLoaded, setMapsApiLoaded] = useState(true);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [mapRef, setMapRef] = useState(null);
    const googleMapsLibraries = ["places"];
    const [locationName, setLocationName] = useState("");

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

        const createEventInput = {
            id: uuid(),
            nameEvent: eventData.nameEvent,
            locationEvent: JSON.stringify(selectedLocation),
            descriptionEvent: eventData.descriptionEvent,
            bannerEvent: "",
            miniBannerEvent: "",
            startDateE: new Date(eventData.startDateE),
            upDateE: new Date(),
            downDateE: new Date(),
            nameLocationEvent: locationName,
            userID: user.username
        };

        if (bannerFile) {
            const bannerKey = `events/${createEventInput.id}/banner`;
            const uploadParams = {
                Bucket: 'melo-tickets-bucket',
                Key: bannerKey,
                Body: bannerFile,
                ContentType: 'image/jpeg'
            };
            await s3Client.send(new PutObjectCommand(uploadParams));
            createEventInput.bannerEvent = bannerKey;
        }

        if (miniBannerFile) {
            const miniBannerKey = `events/${createEventInput.id}/miniBanner`;
            const uploadParams = {
                Bucket: 'melo-tickets-bucket',
                Key: miniBannerKey,
                Body: miniBannerFile,
                ContentType: 'image/jpeg'
            };
            await s3Client.send(new PutObjectCommand(uploadParams));
            createEventInput.miniBannerEvent = miniBannerKey;
        }

        try {
            const response = await axios.post('https://z5wba3v4bvkxdytxba23ma2ajm0qcjed.lambda-url.us-east-1.on.aws/', JSON.stringify({ createEventInput: createEventInput }), {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setSuccessAlert(true);

            setTimeout(() => {
                navigate(`/edit-event/${createEventInput.id}`);
            }, 1000);

        } catch (error) {

            setErrorAlert(true);

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
                            <LoadScriptNext
                                googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS}
                                libraries={googleMapsLibraries}
                                onLoad={() => setMapsApiLoaded(true)}>
                                <StandaloneSearchBox
                                    onLoad={(ref) => setMapRef(ref)}
                                    onPlacesChanged={() => {
                                        const place = mapRef.getPlaces()[0];
                                        if (place) {
                                            setSelectedLocation({
                                                lat: place.geometry.location.lat(),
                                                lng: place.geometry.location.lng(),
                                            });
                                            setLocationName(place.name);
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
                            </LoadScriptNext>
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
                {isSubmitting && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.9)', zIndex: 999 }}>
                        <CircularProgress />
                    </div>
                )}
                {successAlert && (
                    <Alert variant="filled" severity="success">
                        <AlertTitle>Éxito!</AlertTitle>
                        Evento creado con éxito!
                    </Alert>
                )}
                {errorAlert && (
                    <Alert variant="filled" severity="error">
                        <AlertTitle>Error!</AlertTitle>
                        Error al crear el evento!
                    </Alert>
                )}
            </div>
        </>
    );
};

export default withAuthenticator(AddEvent);