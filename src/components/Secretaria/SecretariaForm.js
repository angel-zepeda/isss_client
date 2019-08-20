import React, { useState } from 'react';
import Header from '../Header';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';

const SecretariaForm = () => {

  const [saveStatus, setSaveStatus] = useState(false);
  const [file, setFiles] = useState({
    files: []
  });

  const [register, setRegister] = useState({
    turno: "",
    numeroOficio: "",
    fechaOficio: "",
    numeroCorrespondencia: "",
    fechaRecepcion: "",
    promovente: "",
    numeroJuicio: "",
    turnado: "",
    anexo: []
  })

  const handleChange = e => {
    setRegister({
      ...register, [e.target.name]: e.target.value
    })
    if (e.target.files) {
      setRegister({ // SAVE FILE NAMES FOR REGISTER
        ...register, anexo: [...register.anexo, e.target.files[0].name]
      })

      setFiles({ // SAVE FILES TO SEND TO SERVER
        files: [...file.files, e.target.files[0]]
      })
    }
  }

  const handelOnSubmit = e => {
    e.preventDefault();
    saveRegister();
  }


  const saveRegister = async () => {
    const response = await axios.post('http://localhost:5000/api/v1/secretaria', register);
    if (response.data.code === 200) {
      sendFiles();
      setSaveStatus(true);
      Swal.fire({
        type: 'success',
        title: 'Guardado correctamente!',
        showConfirmButton: false,
      })
    } else {
      Swal.fire({
        type: 'warning',
        title: 'Oops hubo un error!',
        showConfirmButton: false,
      })
    }
  }

  const sendFiles = async () => {
    var data = new FormData();

    for (let i = 0; i <= file.files.length; i++) {
      data.append('files', file.files[i])
      await axios.post('http://localhost:5000/api/v1/files', data)
    }
  }

  if (saveStatus) return <Redirect to="/secretaria/" />
  return (
    <div>
      <Header />
      <div className="container">
        <h2 className="text-center mt-0">Nuevo registro</h2>
        <div className="col-md-12 col-lg-12 card">
          <form onSubmit={handelOnSubmit} className="form-group card-body pt-5 row">
            <div className="col-md-4">
              <label htmlFor="turno">Turno: </label>
              <input
                type="text"
                name="turno"
                onChange={handleChange}
                className="form-control col-md-12"
              />
              <label htmlFor="numeroOficio">Número de Oficio: </label>
              <input
                type="text"
                name="numeroOficio"
                onChange={handleChange}
                className="form-control col-md-12"
              />
              <label htmlFor="fechaOficio">Fecha de Oficio: </label>
              <input
                type="date"
                name="fechaOficio"
                onChange={handleChange}
                className="form-control col-md-12"
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="numeroCorrespondencia">Número de correspondencia: </label>
              <input
                type="text"
                name="numeroCorrespondencia"
                onChange={handleChange}
                className="form-control col-md-12"
              />
              <label htmlFor="fechaRecepcion">Fecha de recepción: </label>
              <input
                type="date"
                name="fechaRecepcion"
                onChange={handleChange}
                className="form-control col-md-12"
              />
              <label htmlFor="promovente">Promovente: </label>
              <input
                type="text"
                name="promovente"
                onChange={handleChange}
                className="form-control col-md-12"
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="numeroJuicio">Número de juicio: </label>
              <input
                type="text"
                name="numeroJuicio"
                onChange={handleChange}
                className="form-control col-md-12"
              />
              <label htmlFor="turnado">Turnado: </label>
              <input
                type="text"
                name="turnado"
                onChange={handleChange}
                className="form-control col-md-12"
              />
            </div>
            <h2 className="mt-4 mx-auto">Anexos: </h2>
            <div className="col-md-12 row mt-3">
              <div className="col-md-4 mb-2">
                <input
                  type="file"
                  name="files"
                  onChange={handleChange}
                  className="form-control pb-2"
                />
              </div>
              <div className="col-md-4 mb-4">
                <input
                  type="file"
                  name="files"
                  onChange={handleChange}
                  className="form-control pb-2"
                />
              </div>
              <div className="col-md-4 mb-4">
                <input
                  type="file"
                  name="files"
                  onChange={handleChange}
                  className="form-control pb-2"
                />
              </div>
              <div className="col-md-4 mb-4">
                <input
                  type="file"
                  name="files"
                  onChange={handleChange}
                  className="form-control pb-2"
                />
              </div>
              <div className="col-md-4 mb-4">
                <input
                  type="file"
                  name="files"
                  onChange={handleChange}
                  className="form-control pb-2"
                />
              </div>
              <div className="col-md-4 mb-4">
                <input
                  type="file"
                  name="files"
                  onChange={handleChange}
                  className="form-control pb-2"
                />
              </div>
            </div>
            <input
              type="submit"
              className="btn btn-success col-md-6 mx-auto"
              value="GUARDAR"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default SecretariaForm;