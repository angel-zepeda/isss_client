import React from 'react';
import { Redirect } from 'react-router-dom';

const Coordinador = () => {
  if (localStorage.getItem('token') === null) return <Redirect to="" />
  return (
    <h1>Coordinador</h1>
  );
}

export default Coordinador;