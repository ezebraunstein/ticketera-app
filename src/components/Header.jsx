import React from 'react';
import palaLogo from '../images/pala.png';
import ButtonCreateEvent from './ButtonCreateEvent';
import ButtonReturn from './ButtonReturn';

const Header = () => {

  const url = window.location.pathname;

  return (
    <header>
      <a href="/">
        <img className="logo" src={palaLogo} alt="LA PALA" width="70px" />
      </a>
      {url === '/' ? <ButtonCreateEvent /> : <ButtonReturn />}
    </header>
  );
};

export default Header;

