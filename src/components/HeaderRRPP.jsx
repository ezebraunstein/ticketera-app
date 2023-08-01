import React, { useEffect, useState } from 'react';
import palaLogo from '../images/pala.png';
import ButtonLogout from './ButtonLogout';
import { Auth, Hub } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import './CSS/ButtonCreateEvent.css';
import './CSS/Header.css';

const HeaderRRPP = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const updateUser = async () => {
      try {
        const currentUser = await Auth.currentAuthenticatedUser();
        setUser(currentUser);
      } catch (error) {
        setUser(null);
      }
    };

    updateUser();

    const listener = (data) => {
      switch (data.payload.event) {
        case 'signIn':
        case 'signUp':
          updateUser();
          break;
        case 'signOut':
          setUser(null);
          break;
        default:
          break;
      }
    };

    Hub.listen('auth', listener);

  }, []);

  const url = window.location.pathname;


  return (
    <header>

      {/* Si estoy en /create-user, el logo NO puede redireccionarme a la homepage */}

      {url === '/create-user' && (
        <a>
          <img className="logo" src={palaLogo} alt="LA PALA" width="400px" />
        </a>)}

      {/* Caso contrario, si */}

      {url !== '/create-user' && (
        <a>
          <img className="logo" src={palaLogo} alt="LA PALA" width="400px" />
        </a>)}

      <div className='box-1'>
        {user && <ButtonLogout />}
      </div>
    </header>
  );
};

export default HeaderRRPP;



