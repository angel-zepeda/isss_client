import React, { useState } from 'react';
import axios from 'axios';
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';
import global from '../global';

const Search = ({ searchRegister }) => {
    const [key, setKey] = useState('');
    const [statusSearch, setStatusSearch] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleOnChange = e => {
        setKey(e.target.value);
    }

    const override = css`
    display: block;
    margin: 0 auto;
    border-color: #fff;
    color: #fff;
    `;

    const handleOnSubmit = e => {
        e.preventDefault();
        getSearch();
    }

    const getSearch = async () => {
        setLoading(true);
        const response = await axios.post(global.server + 'search', { key: key, user: window.location.href });
        searchRegister(response.data.find, key);
        console.log(response)
        if (response.data.find.length === 0) {
            setLoading(false);
            setStatusSearch(false);
        } else {
            setLoading(false);
            setStatusSearch(true);
        }
    }
    return (
        <div>
            {
                statusSearch ? null
                    :
                    <div className="alert alert-dismissible alert-danger col-md-4 p-1 ml-3 row">
                        <strong>No se encontraron coincidencias</strong>
                    </div>
            }
            <form onSubmit={handleOnSubmit} className="form-group row m-3">
                <input
                    className="form-control col-md-4"
                    type="text"
                    onChange={handleOnChange}
                    placeholder="Número de juicio, número de oficio, promovente, turno"
                />
                <button
                    className="btn btn-success ml-2"
                    type="submit"
                >
                    {
                        loading ?
                            <div className='sweet-loading'>
                                <ClipLoader
                                    css={override}
                                    sizeUnit={"px"}
                                    size={28}
                                    color={'#fff'}
                                    loading={loading}
                                />
                            </div>
                            : <i className="material-icons">search</i>
                    }
                </button>
            </form>
        </div>
    );
}

export default Search;