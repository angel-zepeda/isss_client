import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';
import global from '../../global';

const Pensioner = ({ pensioners, setUpdateRegisters }) => {

  const [pdfVisibility, setPdfVisibility] = useState(false);
  const anexos = () => {
    setPdfVisibility(!pdfVisibility);
  }


  const deleteAlertRegister = () => {
    Swal.fire({
      title: 'Estas seguro?',
      text: '',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then((result) => {
      if (result.value) {
        deleteRegister();
      }
    })
  }

  const deleteRegister = async () => {
    const response = await axios.delete(global.server + `secretaria/${pensioners._id}`)
    if (response.data.code === 200) setUpdateRegisters(true);
  }

  let classBorder = {};
  let btnShow = {};
  if (pensioners.complement) {
    if (window.location.href.includes('integrador')) {
      classBorder = {
        color: 'green',
        fontWeight: 'bold '
      }
    }
  } else {
    btnShow = {
      pointerEvents: 'none'
    }
  }

  return (
    <tr className="text-center rounded" style={classBorder}>
      <td>{pensioners.turno}</td>
      <td>{pensioners.numeroOficio}</td>
      <td>{pensioners.fechaOficio}</td>
      <td>{pensioners.numeroCorrespondencia}</td>
      <td>{pensioners.fechaRecepcion}</td>
      <td>{pensioners.promovente}</td>
      <td>{pensioners.numeroJuicio}</td>
      <td>{pensioners.turnado}</td>

      {
        pdfVisibility ?
          pensioners.anexo.map(pdf =>
            <td key={pdf}>
              <a href={global.host + `${pdf}`} target="_blank" rel="noopener noreferrer">{pdf}</a>
              <button
                onClick={e => {
                  e.preventDefault();
                  axios.post(global.server + `/deleteFile/${pdf}`);
                }}
                className="badge badge-danger ml-3">X</button>
            </td>)

          : null
      }
      {
        window.location.href.includes('integrador') ?
          <div>

            <td>
              <Link
                // style={pensioners.complement ? { pointerEvents: 'none' } : null}
                className="btn btn-success"
                title="Complementar registro"
                to={`/integrador-new/${pensioners._id}`}
              ><i className="material-icons p-2">add</i>
              </Link>
            </td>
            <td>
              <button
                onClick={deleteAlertRegister}
                className="btn btn-danger">
                <div className="row p-2">
                  ELIMINAR
                </div>
              </button>
            </td>
          </div>
          : null
      }
      <td>
        <button
          type="button"
          className="btn btn-primary"
          title="Anexos"
          onClick={anexos}
        >
          <div className="row p-2">
            ANEXOS
          </div>
        </button>
      </td>
      {
        window.location.href.includes('secretaria') ?
          <td>
            <Link
              className="btn btn-warning"
              title="Editar registro"
              to={`/secretaria-edit/${pensioners._id}`}
            >
              <div className="row p-2">
                EDITAR
              </div>
            </Link>
          </td>
          : <td>
            <Link
              style={btnShow}
              className="btn btn-warning btn-show"
              title="Mostar"
              to={`/integrador-show/${pensioners._id}`}
            >
              <div className="row p-2">
                MOSTRAR
              </div>
            </Link>
          </td>
      }

      {/*<td>
        <button
          className="btn btn-danger"
          title="Borrar registro"
          onClick={deleteAlertRegister}
        ><i className="material-icons">delete</i>
        </button>
      </td>*/}
    </tr >
  );
}

export default Pensioner;