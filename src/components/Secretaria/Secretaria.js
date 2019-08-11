import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Header';
import Pensioner from './Pensioner';
import { Link } from 'react-router-dom';

const myCustomScrollbar = {
  position: 'relative',
  height: '65vh',
  overflow: 'auto',
  width: '100%'
}

const Secretaria = () => {
  const [registers, setRegisters] = useState('');
  const [updateRegisters, setUpdateRegisters] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const response = await axios('http://localhost:5000/api/v1/secretaria');
      setRegisters(response.data);
    }
    getData();
    setUpdateRegisters(false);
  }, [updateRegisters])

  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div className="card mb-3 p-3">
          <div className="mb-2">
            <Link
              title="Agregar nuevo registro"
              className="btn btn-info"
              to="/secretaria-form">
              <i className="material-icons">note_add</i>
            </Link>
          </div>

          <div style={myCustomScrollbar}>
            <table className="table table-hover table-sm">
              <thead>
                <tr className="text-center">
                  <th scope="col">Turno</th>
                  <th scope="col">Número de oficio</th>
                  <th scope="col">Fecha de oficio</th>
                  <th scope="col">Número de correspondencia</th>
                  <th scope="col">Fecha de recepción</th>
                  <th scope="col">Promovente</th>
                  <th scope="col">Número de juicio</th>
                  <th scope="col">Turnado</th>
                  <th scope="col">Anexos</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {registers.pensioners1 ?
                  registers.pensioners1.map(pensioner => (
                    <Pensioner
                      key={pensioner._id}
                      pensioners={pensioner}
                      setUpdateRegisters={setUpdateRegisters}
                    />
                  ))
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Secretaria;