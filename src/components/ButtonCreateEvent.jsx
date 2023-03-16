import React from 'react';
import './ButtonCreateEvent.css';

const CreateEventButton = ({ onClick, displayEvents }) => {

  const btnText = displayEvents ? 'Crear Evento' : 'Volver';

  return (
    <div className="box-1">
      <button className="btn btn-one" onClick={onClick}>
        <span>{btnText}</span>
      </button>
    </div>
  );
};

export default CreateEventButton;

