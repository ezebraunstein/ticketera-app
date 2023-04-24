import React from 'react';
import './CSS/ButtonCreateEvent.css';
import { useNavigate } from 'react-router-dom';

const ButtonReturn = () => {

  const navigate = useNavigate();

  function onclick() {
    navigate(`/`);
  };

  return (
    <div className="box-1">
      <button className="btn btn-one" onClick={onclick}>
        <span>Volver</span>
      </button>
    </div>
  );
};

export default ButtonReturn;

