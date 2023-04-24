import React from 'react';
import './CSS/ButtonCreateEvent.css';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';

const ButtonLogout = ({ onSignOut }) => {

  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      navigate(`/`);
      if (onSignOut) {
        onSignOut();
      }
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <div className="box-1">
      <button className="btnLogout" onClick={handleSignOut}>
        <span>Log Out</span>
      </button>
    </div>
  );
};

export default ButtonLogout;
