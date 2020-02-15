import React from 'react';
import { Redirect } from 'react-router-dom';

import Secretaria from '../Secretaria/Secretaria';

const Integrador = () => {
  if (localStorage.getItem('token') === null) {
    return <Redirect to="" />;
  }

  return (
    <div>
      <Secretaria />
    </div>
  );
};

export default Integrador;
