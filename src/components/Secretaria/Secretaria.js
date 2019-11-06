import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Header';
import Pensioner from './Pensioner';
import { Link } from 'react-router-dom';
import Search from '../Search';
import global from '../../global';

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
            const response = await axios(global.server + '/secretaria');
            setRegisters(response.data);
        }
        getData();
        setUpdateRegisters(false);
    }, [updateRegisters])

    const getData = async () => {
        const response = await axios(global.server + '/secretaria');
        setRegisters(response.data);
    }

    const searchRegister = (data, key) => key === '' ? getData() : setRegisters({ pensioners1: data });

    return (
        <div>
            <Header />
            <Search searchRegister={searchRegister} />
            <div className="container-fluid">
                <div className="card p-1 shadow-lg bg-white rounded">
                    <div className="mb-2">
                        {
                            window.location.href.includes('secretaria') ?
                                <Link
                                    title="Agregar nuevo registro"
                                    className="btn btn-primary"
                                    to="/secretaria-new">
                                    <div className="row p-2">
                                        <i className="material-icons">note_add</i>NUEVO
                                    </div>
                                </Link>
                                : <button
                                    title="Exportar XLSX"
                                    className="btn btn-success pl-4 pr-4"
                                >
                                    <div className="row">
                                        Exportar
                    <i className="material-icons">line_style</i>
                                    </div>

                                </button>
                        }
                    </div>
                    <div style={myCustomScrollbar}>
                        <table className="table table-bordered table-hover table-sm">
                            <thead className="thead-light">
                                <tr className="text-center">
                                    <th scope="col">Turno</th>
                                    <th scope="col">Número de oficio</th>
                                    <th scope="col">Fecha de oficio</th>
                                    <th scope="col">Número de correspondencia</th>
                                    <th scope="col">Fecha de recepción</th>
                                    <th scope="col">Promovente</th>
                                    <th scope="col">Número de juicio</th>
                                    <th scope="col">Turnado</th>
                                    <th scope="col">Acciones</th>
                                    <th scope="col"></th>
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