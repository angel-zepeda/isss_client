import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import { Redirect, Link } from 'react-router-dom';

const Pensioner = ({ pensioners, setUpdateRegisters }) => {

  const [idRegister, setIdRegister] = useState('');
  const [pdfVisibility, setPdfVisibility] = useState(false);

  const anexos = () => {
    setPdfVisibility(!pdfVisibility);
  }

  const editRegisterFn = () => {
    setIdRegister(pensioners._id);
  }

  if (idRegister !== '') {
    let route = `/secreataria-edit/${idRegister}`;
    return <Redirect to={route} />
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

  return (

    <tr className="text-center">
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
          <td>
            <a href={`http://localhost:5000/${pdf}`} target="_blank">{pdf}</a>
          </td>)
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
      <td>
        <Link
          className="btn btn-warning"
          title="Editar registro"
          onClick={editRegisterFn}
        ><i className="material-icons">border_color</i>
        </Link>
      </td>
      <td>
        <Link
          className="btn btn-danger"
          title="Borrar registro"
          onClick={deleteAlertRegister}
        ><i className="material-icons">delete</i>
        </Link>
      </td>      
    </tr>
  );
}

export default Pensioner;