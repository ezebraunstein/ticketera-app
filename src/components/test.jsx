return (
    <>
        {showYourComponent && < CreateUser />}
        <div className='eventClass'>
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
                <div className="label-container">
                    <div>
                        <label className='labelEvent'>
                            Imagen Flyer Grande:
                            <input className='inputEvent'
                                type="file"
                                accept=".jpg,.jpeg,.png"
                                name="bannerEvent"
                                onChange={handleBannerChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label className='labelEvent'>
                            Imagen Flyer Chica:
                            <input className='inputEvent'
                                type="file"
                                accept=".jpg,.jpeg,.png"
                                name="miniBannerEvent"
                                onChange={handleMiniChange}
                            />
                        </label>
                    </div>
                </div>
                <br />
                <label className='labelEvent'>
                    <button className='btnMain' type="submit" disabled={!eventData.nameEvent || !eventData.startDateE || !bannerFile || isSubmitting}>Agregar Evento</button>
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