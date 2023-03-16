import React from 'react';
import palaLogo from '../images/pala.png';
import CreateEventButton from './ButtonCreateEvent';

const Header = ({ onButtonClick, displayEvents }) => {
  
  return (
    <header>
      <a href="/">
        <img className="logo" src={palaLogo} alt="LA PALA" width="70px" />
      </a>
      <CreateEventButton onClick={onButtonClick} displayEvents={displayEvents}/>
    </header>
  );
};

export default Header;

