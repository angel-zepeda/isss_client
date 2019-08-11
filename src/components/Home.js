import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

const Home = () => {

  const [user, setUser] = useState({ email: '', password: '' });
  const [responseLogin, setResponseLogin] = useState('');
  const [access, setAccess] = useState(false);
  const [error, setError] = useState('');
  const [role, setRole] = useState('');

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    const login = async () => {
      const response = await axios.post('http://localhost:5000/api/v1/user/login', user);
      setResponseLogin(response.data);
    }
    login();
  }, [user]);


  const handleOnSubmit = e => {
    e.preventDefault();

    if (responseLogin.code === 200) {
      setRole(responseLogin.user.role);
      setAccess(true);
    }
    if (responseLogin.code === 404) setError(responseLogin.message);
  }

  if (access) {
    if (role === 'Integrador') {
      return <Redirect from="/" to="/integrador" />
    }
    if (role === 'Secretaria' || 'admin') {
      return <Redirect from="/" to="/secretaria" />
    }
    if (role === 'coordinador') {
      return <Redirect from="/" to="/coordinador" />
    }

  }
  return (
    <Fragment>
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
            type="email"
            name="email"
            className="form-control"
            onChange={handleChange}
          />
          <label htmlFor="password">Contraseña</label>
          <input
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
    </Fragment>
  );
}

export default Home;