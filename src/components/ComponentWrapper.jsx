import React from 'react';

const ComponentWrapper = ({ optionDisplay, children }) => {
  if (optionDisplay) {
    return <>{children}</>;
  } else {
    return null;
  }
};

export default ComponentWrapper;