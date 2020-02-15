import React from 'react';
import Secretaria from '../Secretaria/Secretaria';
import { Redirect } from 'react-router-dom';

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
