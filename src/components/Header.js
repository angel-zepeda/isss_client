import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

  const [user, setUser] = useState('usuario');
  useEffect(() => {
    setUser(localStorage.getItem('user'));
  }, []);

  const logout = e => {
    e.preventDefault();
    setUser('');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.reload();
  }

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
          {
            localStorage.getItem('user') !== null ?
              <div>
                <span className="text-white mr-2">{user}</span>
                <button
                  type="submit"
                  onClick={logout}
                  className="btn btn-primary"
                >
                  <i className="material-icons">logout</i>
                </button>
              </div>
              :
              <Link
                className="btn-link text-white"
                to="/">
                Iniciar sesión
              </Link>

          }

        </div>
      </nav>
    </div>
  );
}

export default Header;
