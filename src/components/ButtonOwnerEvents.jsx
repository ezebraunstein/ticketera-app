import React from 'react';
import './ButtonCreateEvent.css';
import { useNavigate } from 'react-router-dom';

const ButtonOwnerEvents = () => {

  const navigate = useNavigate();

  function onclick() {
    navigate('/owner-events');
  };

  return (
    <div className="box-1">
      <button className="btn btn-one" onClick={onclick}>
        <span>Mis Eventos</span>
      </button>
    </div>
  );
};

export default ButtonOwnerEvents;