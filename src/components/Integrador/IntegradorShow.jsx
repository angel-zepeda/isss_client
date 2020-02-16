import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Header from '../Header';
import { URLS } from '../../global';
// import Swal from 'sweetalert2'

const IntegradorShow = ({ match, history }) => {
  const [register, setRegister] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        `${URLS.server}integrador/show/${match.params.id}`
      );
      setRegister(response.data.pensioner2);
    };
    getData();
  }, [match.params.id]);
  // const deleteAlertRegister = () => {
  //     Swal.fire({
  //         title: 'Estas seguro?',
  //         text: '',
  //         type: 'warning',
  //         showCancelButton: true,
  //         confirmButtonText: 'Borrar',
  //         cancelButtonText: 'Cancelar',
  //         confirmButtonColor: '#d33',
  //         cancelButtonColor: '#3085d6'
  //     }).then((result) => {
  //         if (result.value) {
  //             deleteRegister();
  //         }
  //     })
  // }

  // const deleteRegister = async () => {
  //     // const response = await axios.delete(global.server + `integrador/${register._id}`)
  //     // const response2 = await axios.delete(global.server + `secretaria/${register.pensioner1._id}`)
  //     // if (response.data.code === 200 && response2.data.code === 200) history.push('/integrador');
  //     console.log()
  // }

  const myCustomScrollbar = {
    position: 'relative',
    height: '30vh',
    overflow: 'auto',
    width: '100%',
  };

  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div className="mx-auto" style={myCustomScrollbar}>
          <table className="table">
            <thead className="thead text-primary">
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
                <th scope="col">Número de pensión</th>
                <th scope="col">Sala</th>
                <th scope="col">Tipo de expediente</th>
                <th scope="col">Número de expediente</th>
                <th scope="col">Observaciones</th>
                <th scope="col">Letra</th>
                <th scope="col">Termino de sentencia</th>
                <th scope="col">Envio Juridico</th>
                <th scope="col">Monto cheque</th>
                <th scope="col">Ajute cuota</th>
                <th scope="col">Mes de instalación</th>
                <th scope="col">Estatus del expediente</th>
                <th scope="col">Clasificación</th>
                <th scope="col">Anexos</th>
              </tr>
            </thead>
            <tbody>
              {register !== ''
                ? register.map((r, index) => (
                    <tr key={index} className="text-center">
                      <td>{r.pensioner1.turno}</td>
                      <td>{r.pensioner1.numeroOficio}</td>
                      <td>{r.pensioner1.fechaOficio}</td>
                      <td>{r.pensioner1.numeroCorrespondencia}</td>
                      <td>{r.pensioner1.fechaRecepcion}</td>
                      <td>{r.pensioner1.promovente}</td>
                      <td>{r.pensioner1.numeroJuicio}</td>
                      <td>{r.pensioner1.turnado}</td>
                      <td>
                        {r.pensioner1.anexo.map((anexo) => (
                          <a
                            key={anexo}
                            target="_blank"
                            rel="noopener noreferrer"
                            href={global.host + `${anexo}`}
                          >{`"${anexo}"\n`}</a>
                        ))}
                      </td>
                      <td>{r.numero_pension}</td>
                      <td>{r.sala}</td>
                      <td>{r.tipo_expediente}</td>
                      <td>{r.numero_expediente}</td>
                      <td>{r.observaciones}</td>
                      <td>{r.letra}</td>
                      <td>{r.termino_sentencia}</td>
                      <td>{r.envio_juridico}</td>
                      <td>{r.monto_cheque}</td>
                      <td>{r.ajuste_cuota}</td>
                      <td>{r.mes_instalacion}</td>
                      <td>{r.estatus_expediente}</td>
                      <td>{r.clasificacion}</td>
                      <td>
                        {r.anexo.map((anexo) => (
                          <a
                            key={anexo}
                            target="_blank"
                            rel="noopener noreferrer"
                            href={global.host + `${anexo}`}
                          >{`"${anexo}"\n`}</a>
                        ))}
                      </td>
                      {localStorage.getItem('role') === 'consultor' ? null : (
                        <>
                          <td>
                            <Link
                              className="btn btn-warning"
                              to={`/integrador/edit/${r._id}`}
                            >
                              {' '}
                              EDITAR
                            </Link>
                          </td>
                          <td>
                            <button
                              onClick={async () => {
                                const response = await axios.delete(
                                  `${URLS.server}/integrador/${r._id}`
                                );
                                // const response2 = await axios.delete(global.server + `secretaria/${r.pensioner1._id}`)
                                if (response.data.code === 200)
                                  history.push('/integrador');
                              }}
                              className="btn btn-danger ml-2"
                            >
                              ELIMINAR
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IntegradorShow;
