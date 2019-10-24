import React, { useState, useEffect } from 'react';
import Header from '../Header';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const EditSecretaria = ({ match }) => {

  const [saveStatus, setSaveStatus] = useState(false);
  const [register, setRegister] = useState({
    turno: "",
    numeroOficio: "",
    fechaOficio: "",
    numeroCorrespondencia: "",
    fechaRecepcion: "",
    promovente: "",
    numeroJuicio: "",
    turnado: ""
  })

  useEffect(() => {
    const getRegister = async () => {
      const response = await axios.get(global.server + `secretaria/${match.params.id}`);
      setRegister(response.data.pensioner);
    }
    getRegister();
  }, [match.params.id])

  const handleChange = e => {
    setRegister({
      ...register, [e.target.name]: e.target.value
    })
  }

  const handelOnSubmit = e => {
    e.preventDefault();
    saveRegister();
  }

  const saveRegister = async () => {
    const response = await axios.put(global.server + `secretaria/${match.params.id}`, register);
    console.log(response)
    setSaveStatus(true);
  }

  if (saveStatus) return <Redirect to="/secretaria/" />
  return (
    <div>
      <Header />
      <div className="container">
        <h2 className="text-center mt-0">Editar registro</h2>
        <div className="col-md-12 col-lg-12 card">
          <form onSubmit={handelOnSubmit} className="form-group card-body pt-5 row">
            <div className="col-md-4">
              <label htmlFor="turno">Turno: </label>
              <input
                type="text"
                name="turno"
                value={register.turno}
                onChange={handleChange}
                className="form-control col-md-12"
              />
              <label htmlFor="numeroOficio">Número de Oficio: </label>
              <input
                type="text"
                name="numeroOficio"
                value={register.numeroOficio}
                onChange={handleChange}
                className="form-control col-md-12"
              />
              <label htmlFor="fechaOficio">Fecha de Oficio: </label>
              <input
                type="date"
                name="fechaOficio"
                value={register.fechaOficio}
                onChange={handleChange}
                className="form-control col-md-12"
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="numeroCorrespondencia">Número de correspondencia: </label>
              <input
                type="text"
                name="numeroCorrespondencia"
                value={register.numeroCorrespondencia}
                onChange={handleChange}
                className="form-control col-md-12"
              />
              <label htmlFor="fechaRecepcion">Fecha de recepción: </label>
              <input
                type="date"
                name="fechaRecepcion"
                value={register.fechaRecepcion}
                onChange={handleChange}
                className="form-control col-md-12"
              />
              <label htmlFor="promovente">Promovente: </label>
              <input
                type="text"
                name="promovente"
                value={register.promovente}
                onChange={handleChange}
                className="form-control col-md-12"
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="numeroJuicio">Número de juicio: </label>
              <input
                type="text"
                name="numeroJuicio"
                value={register.numeroJuicio}
                onChange={handleChange}
                className="form-control col-md-12"
              />
              <label htmlFor="turnado">Turnado: </label>
              <input
                type="text"
                name="turnado"
                value={register.turnado}
                onChange={handleChange}
                className="form-control col-md-12"
              />
            </div>
            <input
              type="submit"
              className="btn btn-success col-md-6 mx-auto mt-3"
              value="GUARDAR"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditSecretaria;