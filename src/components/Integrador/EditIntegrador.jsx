import React, { useState, useEffect } from 'react';
import Header from '../Header';
import axios from 'axios';
import { SERVER } from '../../global';
import Swal from 'sweetalert2';

const EditIntegrador = ({ match, history }) => {
  const [register, setRegister] = useState({});
  const [file, setFiles] = useState({
    files: [],
  });

  useEffect(() => {
    const getRegister = async () => {
      const response = await axios.get(
        `${SERVER}/integrador/edit/${match.params.id}`
      );
      setRegister(response.data.pensioner2);
    };
    getRegister();
  }, [match.params.id]);

  const handleOnSubmit = e => {
    e.preventDefault();
    updateRegister();
  };

  const handleChange = e => {
    setRegister({
      ...register,
      [e.target.name]: e.target.value,
    });
    if (e.target.files) {
      setRegister({
        // SAVE FILE NAMES FOR REGISTER
        ...register,
        anexo: [...register.anexo, e.target.files[0].name],
      });

      setFiles({
        // SAVE FILES TO SEND TO SERVERzº
        files: [...file.files, e.target.files[0]],
      });
    }
  };

  const sendFiles = async () => {
    var data = new FormData();
    for (let i = 0; i <= file.files.length; i++) {
      data.append('files', file.files[i]);
      await axios.post(`${SERVER}/files`, data);
    }
  };

  const updateRegister = async () => {
    const response = await axios.put(
      `${SERVER}/integrador/${register._id}`,
      register
    );
    if (response.data.code === 200) {
      sendFiles();
      history.push('/integrador');
      Swal.fire({
        type: 'success',
        title: 'Guardado correctamente!',
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        type: 'warning',
        title: 'Oops hubo un error!',
        showConfirmButton: false,
      });
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
        <h2>Editar registro</h2>
        <div className="card col-md-12 p-5">
          <form className="form-group row" onSubmit={handleOnSubmit}>
            <div className="col-md-4 col-sm-12">
              <label htmlFor="numero_pension">Número de pensión</label>
              <input
                required
                value={register.numero_pension}
                type="text"
                name="numero_pension"
                onChange={handleChange}
                className="form-control col-md-12"
              />
              <label htmlFor="sala">Sala</label>
              <input
                required
                value={register.sala}
                type="text"
                name="sala"
                onChange={handleChange}
                className="form-control col-md-12"
              />
              <label htmlFor="tipo_expediente">Tipo de expediente</label>
              <input
                required
                value={register.tipo_expediente}
                type="text"
                name="tipo_expediente"
                onChange={handleChange}
                className="form-control col-md-12"
              />
              <label htmlFor="numero_expediente">Número de expediente</label>
              <input
                required
                value={register.numero_expediente}
                type="text"
                name="numero_expediente"
                onChange={handleChange}
                className="form-control col-md-12"
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="letra">Letra</label>
              <input
                required
                value={register.letra}
                type="text"
                onChange={handleChange}
                name="letra"
                className="form-control col-md-12"
              />
              <label htmlFor="termino_sentencia">Término de la sentencia</label>
              <input
                required
                value={register.termino_sentencia}
                type="date"
                name="termino_sentencia"
                onChange={handleChange}
                className="form-control col-md-12"
              />
              <label htmlFor="envio_juridico">Envio a jurídico</label>
              <input
                required
                value={register.envio_juridico}
                type="date"
                name="envio_juridico"
                onChange={handleChange}
                className="form-control col-md-12"
              />
              <label htmlFor="observaciones">Observaciones</label>
              <textarea
                required
                type="area"
                value={register.observaciones}
                name="observaciones"
                onChange={handleChange}
                className="form-control col-md-12"
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="monto_cheque">Monto Cheque</label>
              <input
                required
                value={register.monto_cheque}
                type="text"
                name="monto_cheque"
                onChange={handleChange}
                className="form-control col-md-12"
              />
              <label htmlFor="ajuste_cuota">Ajuste cuota</label>
              <input
                required
                value={register.ajuste_cuota}
                type="text"
                name="ajuste_cuota"
                onChange={handleChange}
                className="form-control col-md-12"
              />
              <label htmlFor="mes_instalacion">Mes de instalación</label>
              <input
                required
                value={register.mes_instalacion}
                type="date"
                name="mes_instalacion"
                onChange={handleChange}
                className="form-control col-md-12"
              />
              <label htmlFor="estatus_expediente">Estatus del expediente</label>
              <select
                required
                value={register.estatus_expediente}
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
                required
                value={register.clasificacion}
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
            <button
              type="submit"
              className="btn btn-primary col-md-6 mx-auto mt-5"
            >
              <i className="material-icons">save</i> GUARDAR
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditIntegrador;
