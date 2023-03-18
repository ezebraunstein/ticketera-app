import React from 'react';
import './ButtonCreateEvent.css';
import { Auth } from 'aws-amplify';

const ButtonLogout = ({ onSignOut }) => {
  
  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      if (onSignOut) {
        onSignOut();
      }
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <div className="box-1">
      <button className="btn btn-one" onClick={handleSignOut}>
        <span>Logout</span>
      </button>
    </div>
  );
};

export default ButtonLogout;
