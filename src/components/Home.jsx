import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { URLS } from '../global';
import Spinner from './Spinner';

const Home = () => {
  const [user, setUser] = useState({ email: '', password: '', getToken: true });
  const [access, setAccess] = useState(false);
  const [error, setError] = useState('');
  const [role, setRole] = useState('');
  const [showSpinner, setShowSpinner] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const login = async () => {
    setShowSpinner(true);
    const response = await axios.post(`${URLS.server}/login`, user);
    localStorage.setItem('token', response.data.token);
    if (response.data.code === 200) {
      setRole(response.data.user.role);
      localStorage.setItem('user', response.data.user.email);
      setShowSpinner(false);
      setAccess(true);
    }
    if (response.data.code === 404) {
      setShowSpinner(false);
      setError(response.data.message);
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    login();
  };

  if (access) return <Redirect to={`/${role}`} />;

  return (
    <div>
      {error ? (
        <div className="alert alert-dismissible alert-danger col-md-4 mx-auto">
          <button type="button" className="close" data-dismiss="alert">
            &times;
          </button>
          <strong>Oops!</strong>
          <p className="alert-link">{error}</p>
        </div>
      ) : null}
      <div className="card col-md-4 col-sm-12 mx-auto bg-white p-4">
        <h2 className="text-center">Iniciar sesión</h2>
        <form onSubmit={handleOnSubmit} className="form-group card-body p-2">
          <label htmlFor="email">Email: </label>
          <input
            value={user.email}
            type="email"
            name="email"
            className="form-control mb-4"
            onChange={handleChange}
            placeholder="Correo electrónico"
          />
          <label htmlFor="password">Contraseña</label>
          <input
            value={user.password}
            type="password"
            name="password"
            className="form-control mb-4"
            onChange={handleChange}
            placeholder="Contraseña"
          />
          <button
            disabled={showSpinner}
            type="submit"
            className="btn btn-primary text-white col-md-12 col-sm-12 mt-3"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
      {showSpinner ? <Spinner /> : null}
    </div>
  );
};

export default Home;
