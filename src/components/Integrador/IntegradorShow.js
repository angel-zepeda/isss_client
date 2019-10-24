import React, { useEffect, useState } from 'react';
import Header from '../Header';
import axios from 'axios';
import { Link } from 'react-router-dom';
import global from '../../global';
import Swal from 'sweetalert2'


const IntegradorShow = ({ match, history }) => {

    const [register, setRegister] = useState('');

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get(global.server + `integrador/show/${match.params.id}`);
            setRegister(response.data.pensioner2[0]);
        }
        getData();

    }, [match.params.id])
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
        const response = await axios.delete(global.server + `integrador/${register._id}`)
        const response2 = await axios.delete(global.server + `secretaria/${register.pensioner1._id}`)
        if (response.data.code === 200 && response2.data.code === 200) history.push('/integrador');
        
    }

    const myCustomScrollbar = {
        position: 'relative',
        height: '30vh',
        overflow: 'auto',
        width: '100%'
    }

    return (
        <div>
            <Header />
            <div className="container-fluid">
                <div className="" style={myCustomScrollbar}>
                    <table className="table table-bordered table-hover table-sm">
                        <thead className="thead-dark">
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
                            {
                                register !== '' ?
                                    <tr className="text-center">
                                        <td>{register.pensioner1.turno}</td>
                                        <td>{register.pensioner1.numeroOficio}</td>
                                        <td>{register.pensioner1.fechaOficio}</td>
                                        <td>{register.pensioner1.numeroCorrespondencia}</td>
                                        <td>{register.pensioner1.fechaRecepcion}</td>
                                        <td>{register.pensioner1.promovente}</td>
                                        <td>{register.pensioner1.numeroJuicio}</td>
                                        <td>{register.pensioner1.turnado}</td>
                                        <td>{register.pensioner1.anexo.map(anexo =>
                                            <a key={anexo} target="_blank" rel="noopener noreferrer" href={global.host + `${anexo}`}>{`"${anexo}"\n`}</a>)
                                        }</td>
                                        <td>{register.numero_pension}</td>
                                        <td>{register.sala}</td>
                                        <td>{register.tipo_expediente}</td>
                                        <td>{register.numero_expediente}</td>
                                        <td>{register.observaciones}</td>
                                        <td>{register.letra}</td>
                                        <td>{register.termino_sentencia}</td>
                                        <td>{register.envio_juridico}</td>
                                        <td>{register.monto_cheque}</td>
                                        <td>{register.ajuste_cuota}</td>
                                        <td>{register.mes_instalacion}</td>
                                        <td>{register.estatus_expediente}</td>
                                        <td>{register.clasificacion}</td>
                                        <td>{register.anexo.map(anexo =>
                                            <a key={anexo} target="_blank" rel="noopener noreferrer" href={global.host + `${anexo}`}>{`"${anexo}"\n`}</a>)
                                        }</td>

                                    </tr>
                                    : null
                            }
                        </tbody>
                    </table>

                </div>
                <Link
                    className="btn btn-warning"
                    to={`/integrador/edit/${match.params.id}`}
                > EDITAR
                </Link>
                <button
                    onClick={deleteAlertRegister}
                    className="btn btn-danger ml-2"
                >ELIMINAR
    
                </button>
            </div>
        </div>
    );
}

export default IntegradorShow;