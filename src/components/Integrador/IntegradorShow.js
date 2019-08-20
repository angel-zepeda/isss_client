import React, { useEffect } from 'react';
import Header from '../Header';
import axios from 'axios';

const IntegradorShow = ({ match }) => {

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`http://localhost:5000/api/v1/integrador/show/${match.params.id}`);
      console.log(response);
    }
    getData();

  }, [match.params.id])

  const myCustomScrollbar = {
    position: 'relative',
    height: '30vh',
    overflow: 'auto',
    width: '100%'
  }


  return (
    <div>
      <Header />
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

            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default IntegradorShow;