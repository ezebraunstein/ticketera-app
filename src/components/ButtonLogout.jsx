import React from 'react';
import './ButtonCreateEvent.css';
import { useNavigate } from 'react-router-dom';
import Logout from './Logout';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Auth } from '@aws-amplify/auth';

const ButtonLogout = ({signOut}) => {

  const navigate = useNavigate();

  // function onclick() {
  //   navigate('/');
  // };

  return (
    <div className="box-1">
      <button className="btn btn-one" onClick={Auth.signOut}>
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Logout;