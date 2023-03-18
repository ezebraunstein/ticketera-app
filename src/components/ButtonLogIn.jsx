import React from 'react';
import './ButtonCreateEvent.css';
import { useNavigate } from 'react-router-dom';

const ButtonLogin = () => {

  const navigate = useNavigate();

  function onclick() {
    navigate('/login');
  };

  return (
    <div className="box-1">
      <button className="btn btn-one" onClick={onclick} style={{width: '150px', height: '50px'}}>
        <span>Log In</span>
      </button>
    </div>
  );
};

export default ButtonLogin;
