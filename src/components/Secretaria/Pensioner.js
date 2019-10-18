import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';

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
    const response = await axios.delete(`http://localhost:5000/api/v1/secretaria/${pensioners._id}`)
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
              <a href={`http://localhost:5000/${pdf}`} target="_blank" rel="noopener noreferrer">{pdf}</a>
            </td>)
          : null
      }
      {
        window.location.href.includes('integrador') ?
          <td>
            <Link
              className="btn btn-primary"
              title="Complementar registro"
              to={`/integrador-new/${pensioners._id}`}
            ><i className="material-icons">add</i>
            </Link>
          </td>
          : null
      }
      <td>
        <button
          type="button"
          className="btn btn-info"
          title="Anexos"
          onClick={anexos}
        ><i className="material-icons">attach_file</i>
        </button>
      </td>
      {
        window.location.href.includes('secretaria') ?
          <td>
            <Link
              className="btn btn-warning"
              title="Editar registro"
              to={`/secretaria-edit/${pensioners._id}`}
            ><i className="material-icons">border_color</i>
            </Link>
          </td>
          : <td>
            <Link
              style={btnShow}
              className="btn btn-success btn-show"
              title="Mostar"
              to={`/integrador-show/${pensioners._id}`}
            >
              <i className="material-icons">find_in_page</i>
            </Link>
          </td>
      }

      <td>
        <button
          className="btn btn-danger"
          title="Borrar registro"
          onClick={deleteAlertRegister}
        ><i className="material-icons">delete</i>
        </button>
      </td>
    </tr>
  );
}

export default Pensioner;