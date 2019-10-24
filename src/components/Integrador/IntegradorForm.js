import React, { useState } from 'react';
import Header from '../Header';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';

const IntegradorForm = ({ match }) => {

  const [saveStatus, setSaveStatus] = useState(false);
  const [file, setFiles] = useState({
    files: []
  });
  const [register, setRegister] = useState({
    pensioner1_id: match.params.id,
    numero_pension: '',
    sala: '',
    tipo_expediente: '',
    numero_expediente: '',
    observaciones: '',
    letra: '',
    termino_sentencia: '',
    envio_juridico: '',
    monto_cheque: '',
    ajuste_cuota: '',
    mes_instalacion: '',
    estatus_expediente: '',
    clasificacion: '',
    anexo: []
  })

  const handleOnSubmit = e => {
    e.preventDefault();
    saveRegister();
  }

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

  const saveRegister = async () => {
    const response = await axios.post('http://localhost:5000/api/v1/integrador', register);
    await axios.put(`http://localhost:5000/api/v1/secretaria/${match.params.id}`, { complement: true });
    console.log(response)
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

  if (saveStatus) return <Redirect to="/integrador" />
  return (
    <div>
      <Header />

      <div className="container">
        <h2 className="text-center">Agregar registros</h2>
        <div className="card col-md-12 p-5">
          <form
            className="form-group row"
            onSubmit={handleOnSubmit}
          >
            <div className="col-md-4 col-sm-12">
              <label htmlFor="numero_pension">Número de pensión</label>
              <input
                type="text"
                name="numero_pension"
                onChange={handleChange}
                className="form-control col-md-12"
              />
              <label htmlFor="sala">Sala</label>
              <input
                type="text"
                name="sala"
                onChange={handleChange}
                className="form-control col-md-12"
              />
              <label htmlFor="tipo_expediente">Tipo de expediente</label>
              <input
                type="text"
                name="tipo_expediente"
                onChange={handleChange}
                className="form-control col-md-12"
              />
              <label htmlFor="numero_expediente">Número de expediente</label>
              <input
                type="text"
                name="numero_expediente"
                onChange={handleChange}
                className="form-control col-md-12"
              />

            </div>
            <div className="col-md-4">

              <label htmlFor="letra">Letra</label>
              <input
                type="text"
                onChange={handleChange}
                name="letra"
                className="form-control col-md-12"
              />
              <label htmlFor="termino_sentencia">Término de la sentencia</label>
              <input
                type="date"
                name="termino_sentencia"
                onChange={handleChange}
                className="form-control col-md-12"
              />
              <label htmlFor="envio_juridico">Envio a jurídico</label>
              <input
                type="date"
                name="envio_juridico"
                onChange={handleChange}
                className="form-control col-md-12"
              />
              <label htmlFor="observaciones">Observaciones</label>
              <textarea
                type="area"
                name="observaciones"
                onChange={handleChange}
                className="form-control col-md-12"
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="monto_cheque">Monto Cheque</label>
              <input
                type="number"
                name="monto_cheque"
                onChange={handleChange}
                className="form-control col-md-12"
              />
              <label htmlFor="ajuste_cuota">Ajuste cuota</label>
              <input
                type="number"
                name="ajuste_cuota"
                onChange={handleChange}
                className="form-control col-md-12"
              />
              <label htmlFor="mes_instalacion">Mes de instalación</label>
              <input
                type="number"
                name="mes_instalacion"
                onChange={handleChange}
                className="form-control col-md-12"
              />
              <label htmlFor="estatus_expediente">Estatus del expediente</label>
              <select
                name="estatus_expediente"
                className="form-control"
                onChange={handleChange}
              >
                <option> --Seleccione-- </option>
                <option>Integración</option>
                <option>Liquidación</option>
                <option>Atendido</option>
              </select>

              <label htmlFor="clasificacion">Clasificación</label>
              <select
                name="clasificacion"
                className="form-control"
                onChange={handleChange}
              >
                <option> --Seleccione-- </option>
                <option>Nulidad</option>
                <option>Queja</option>
                <option>Amparo</option>
                <option>Manifestación</option>
              </select>
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

export default IntegradorForm;