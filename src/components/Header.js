import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

const Header = () => {

  const [logoutValue, setLogoutValue] = useState(false);

  if (logoutValue) return <Redirect to="/" />

  return (
    <div className="mb-4">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="/">CONTROL DE GESTIÓN</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">
          <div className="navbar-nav mr-auto">
          </div>
          <button
            onClick={() => setLogoutValue(true)}
            className="btn btn-primary"
          >
            <i className="material-icons">logout</i>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Header;