import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import global from '../global.js';

const Home = () => {

  const [user, setUser] = useState({ email: '', password: '' });
  const [access, setAccess] = useState(false);
  const [error, setError] = useState('');
  const [role, setRole] = useState('');

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleOnSubmit = e => {
    e.preventDefault();
    login();
  }

  const login = async () => {
    const response = await axios.post(global.server + '/login', user);
    if (response.data.code === 200) {
      setRole(response.data.user.role);
      setAccess(true);
    }
    if (response.data.code === 404) setError(response.data.message);
  }

  if (access) {
    localStorage.setItem('role', role);
    return <Redirect to={`/${role}`} />
  }

  return (
    <div>
      {error ?
        <div className="alert alert-dismissible alert-danger col-md-4 mx-auto">
          <button type="button" className="close" data-dismiss="alert">&times;</button>
          <strong>Oops!</strong> <p className="alert-link">{error}</p>
        </div>
        : null
      }
      <div className="col-md-4 col-sm-12 mx-auto card">
        <h2 className="text-center">Iniciar sesión</h2>
        <form onSubmit={handleOnSubmit} className="form-group card-body p-2">
          <label htmlFor="email">Email: </label>
          <input
            value={user.email}
            type="email"
            name="email"
            className="form-control"
            onChange={handleChange}
          />
          <label htmlFor="password">Contraseña</label>
          <input
            value={user.password}
            type="password"
            name="password"
            className="form-control"
            onChange={handleChange}
          />
          <input
            type="submit"
            className="btn btn-primary text-white col-md-12 col-sm-12 mt-3"
            defaultValue="Iniciar"
          />
        </form>
      </div>
    </div>
  );
}

export default Home;