import React, { useState, useEffect } from 'react';
import ReactExport from 'react-export-excel';
import axios from 'axios';

import { URLS } from '../global';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const dataSet1 = [
  {
    name: 'Johson',
    amount: 30000,
    sex: 'M',
    is_married: true,
  },
  {
    name: 'Monika',
    amount: 355000,
    sex: 'F',
    is_married: false,
  },
  {
    name: 'John',
    amount: 250000,
    sex: 'M',
    is_married: false,
  },
  {
    name: 'Josef',
    amount: 450500,
    sex: 'M',
    is_married: true,
  },
];

const dataSet2 = [
  {
    name: 'Johnson',
    total: 25,
    remainig: 16,
  },
  {
    name: 'Josef',
    total: 25,
    remainig: 7,
  },
];

const Download = () => {
  const [registers, setRegisters] = useState(null);

  useEffect(() => {
    const getRegisters = async () => {
      const {
        data: { pensioner2 },
      } = await axios.get(`${URLS.server}/generate-xlsx`);
      console.log(pensioner2);
      setRegisters(registers);
    };
    getRegisters();
  }, [registers]);

  return (
    <ExcelFile>
      <ExcelSheet data={registers} name="Employees">
        {registers
          ? registers.map(
              (pensioner) => console.log(pensioner)
              // <ExcelColumn label="Name" value={pensioner.numero_pension} />
            )
          : null}
      </ExcelSheet>
    </ExcelFile>
  );
};

export default Download;
