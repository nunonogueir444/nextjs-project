"use client";

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import styles from '../page.module.css';

const LoadingMessage = () => (
  <div className={styles.floatingText}>
    <div className="floatingText">Loading file, please wait...</div>
  </div>
);/*lol*/

export default function Faults() {
  const router = useRouter();
  const pathname = usePathname();
  const [fileContent, setFileContent] = useState('');
  const [pages, setPages] = useState([]);
  const [originalPages, setOriginalPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    column1: '',
    column2: '',
    column3: '',
    column4: '',
    column5: '',
    column6: '',
    column7: '',
    column8: '',
  });

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const column2Values = [
    '0 Generic Op.',
    '1 Low Op.',
    '2 Standard Op.',
    '3 High Op.',
    '4 Service Op.',
    '5 Manager Op.',
    '6 Dealer Op.',
    '7 Combilift Op.',
    '8 Developer Op.'
  ];

  const column5Values = [
    'All Traction',
    'All Steer',
    'PLC',
    'Pump',
    'TRR',
    'TRL',
    'TFR',
    'TFL',
    'SRR',
    'SRL',
    'SFR',
    'SFL',
  ];

  const column8Values = [
    'Connection Fault',
    'Generic Fault',
    '5-1 - User 1 Fault',
    '5-2 - User 2 Fault',
    '5-3 - User 3 Fault',
    '5-4 - User 4 Fault',
    '5-5 - User 5 Fault',
    '5-6 - User 6 Fault',
    '5-7 - User 7 Fault',
    '5-8 - User 8 Fault',
    '5-9 - User 9 Fault',
    '6-1 - User 10 Fault',
    '6-2 - User 11 Fault',
    '6-3 - User 12 Fault',
    '6-4 - User 13 Fault',
    '6-5 - User 14 Fault',
    '6-6 - User 15 Fault',
    '6-7 - User 16 Fault',
    '5-10 - User 17 Fault',
    '5-11 - User 18 Fault',
    '5-12 - User 19 Fault',
    '5-13 - User 20 Fault',
    '5-14 - User 21 Fault',
    '5-15 - User 22 Fault',
    '6-10 - User 23 Fault',
    '6-11 - User 24 Fault',
    '6-12 - User 25 Fault',
    '6-13 - User 26 Fault',
    '6-14 - User 27 Fault',
    '6-15 - User 28 Fault',
    '7-10 - User 29 Fault',
    '7-11 - User 30 Fault',
    '7-12 - User 31 Fault',
    '7-13 - User 32 Fault',

    '1-2 - Controller Overcurrent',
    '1-3 - Current Sensor',
    '1-4 - Precharge Failed',
    '1-5 - Controller Severe Undertemperature',
    '1-6 - Controller Severe Overtemperature',
    '1-7 - Severe B+ Undervoltage',
    '1-7 - Severe KSI Undervoltage',
    '1-8 - Severe B+ Overvoltage',
    '1-8 - Severe KSI Overvoltage',
    '1-9 - Speed Limit Supervision',
    '1-10 - Motor Not Stopped',
    '1-11 - Critical OS General',
    '1-12 - OS General 2',
    '1-13 - Reset Rejected',
    '1-14 - Motor Short',
    '2-2 - Controller Overtemperature Cutback',
    '2-3 - Undervoltage Cutback',
    '2-4 - Overvoltage Cutback',
    '2-5 - Ext 5V Supply Failure',
    '2-6 - Ext 12V Supply Failure',
    '2-8 - Motor Temp Hot Cutback',
    '2-9 - Motor Temp Sensor',
    '3-1 - Main Driver',
    '3-2 - EM Brake Driver',
    '3-3 - Pump Driver',
    '3-4 - Load Hold Driver',
    '3-5 - Lower Driver',
    '3-6 - IM Motor Feedback',
    '3-6 - Sin Cos Motor Feedback',
    '3-7 - Motor Open',
    '3-8 - Main Contactor Welded',//pag 220
    '3-9 - Main Contactor Did Not Close',
    '3-10 - Motor Setup Needed',
    '3-11 - Misalignment Error',
    '4-2 - Throttle Input',
    '4-4 - Brake Input',
    '4-5 - Steer Angle Input',
    '4-6 - NV Memory Failure',
    '4-7 - Hydraulic HPD SRO Lower',
    '4-7 - Hydraulic HPD SRO Lift',
    '4-7 - LHS Throttle Conflict',
    '4-7 - HPD Sequencing',
    '4-7 - Emer Rev HPD',
    //'4-8 - Following Error',
    '4-9 - Parameter Change',
    '4-10 - EMR Switch',
    '6-8 - VCL Run Time Error',
    '6-8 - ECC Run Time Error',
    '7-1 - OS General',
    '7-2 - PDO Timeout',
    //'7-2 - Dual Pdo Timeout',
    '7-3 - Stall Detected',
    //'7-4 - Fault On Other Traction Controller Active',
    //'7-6 - Dual Severe',
    //'7-6 - Insulation Resistance Low',
    //'7-7 - Steering Supervision Error',
    //'7-7 - Home Switch Supervision',
    //'7-7 - Interlock Input Conflict',
    //'7-7 - Steer Command Supervision',
    //'7-7 - Wheel Position Supervision',
    //'7-7 - Home Position Not Found',
    //'7-7 - Home Reference Tolerance',
    '7-7 - Supervision',
    '7-9 - Supervision Input Check',
    '8-0 - Secondary Command Input',
    //'8-1 - Secondary Feedback Input',
    '8-2 - PDO Mapping Error',
    //'8-3 - Lv Supply Pos Out Of Range',
    '8-3 - Internal Hardware',
    '8-4 - Motor Braking Impaired',
    '8-7 - Motor Characterization',
    '8-8 - Encoder Pulse Error',
    '8-9 - Parameter Out of Range',
    '9-1 - Bad Firmware',
    '9-2 - EM Brake Failed to Set',
    '9-3 - Encoder LOS',
    '9-4 - Emer Rev Timeout',
    //'9-5 - Pump Overcurrent',
    //'9-6 - Pump BDI',//pag 221
    //'9-7 - Pump Hardware',
    '9-9 - Parameter Mismatch',
    '9-10 - Interlock Braking Supervision',
    '9-11 - EMR Supervision',
    '10-1 - Driver 1 Fault',
    '10-2 - Driver 2 Fault',
    '10-3 - Driver 3 Fault',
    '10-4 - Driver 4 Fault',
    //'10-4 - Steering Safety Output Failed',
    '10-5 - Driver 5 Fault',
    '10-6 - Driver 6 Fault',
    '10-7 - Driver 7 Fault',
    '10-8 - Driver Assignment',
    '10-9 - Coil Supply',
    '11-1 - Analog 1 Out Of Range',
    '11-2 - Analog 2 Out Of Range',
    '11-3 - Analog 3 Out Of Range',
    '11-4 - Analog 4 Out Of Range',
    '11-5 - Analog 5 Out Of Range',
    '11-6 - Analog 6 Out Of Range',
    '11-7 - Analog 7 Out Of Range',
    '11-8 - Analog 8 Out Of Range',
    '11-9 - Analog 9 Out of Range',
    '11-11 - Analog 14 Out Of Range',
    //'11-12 - Analog Assignment',
    '11-13 - Analog 18 Out of range',
    '11-14 - Analog 19 Out of range',
    //'11-15 - Pump Current Sensor',
    '12-1 - Branding Error',
    '12-2 - BMS Cutback',
    //'12-3 - Differential Steering',
    //'12-4 - Torque Input',
    '12-5 - PWM Input 10 Out of Range',
    //'12-6 - Pwm Input 17 Out Of Range',
    '12-7 - Analog 31 Out of Range',
    '12-8 - Invalid CAN Port',
    '12-9 - VCL Watchdog',
    //'12-10 - Auto Baud Failure On Ancillary',
    '12-11 - Primary State Error',// pag 222
    '12-12 - PWM Input 29 Out of Range',
    '12-13 - PWM Input 28 Out of Range',
    //'12-15 - Force Feedback Fault',
    //'13-0 - Steering Traction Msg Count',
    //'13-0 - Delayed Shutdown',
    '13-1 - Lift Input',
    '13-2 - Phase PWM Mismatch',
    '13-3 - Hardware Compatibility',
    '13-4 - Lower Input',
    //'13-5 - Primary Command Input',
    '13-6 - Hazardous Movement',
    //'13-7 - Primary Feedback Input',
    '13-8 - ESTOP_Mismatch',
    '13-9 - ESTOP_SRO',
    '13-10 - Lift Limit',
    '13-13 - IMU Failure',
    //'14-14 - Eru Configuration',
    //'14-15 - Desat Trip',
    '15-1 - Memory Parity',
  ];

  const column8SteerValues = [
    'Connection Fault',
    'Generic Fault',
    '11-1 - Hardware Fault',
    '12-1 - Controller Overcurrent 1',
    '12-2 - Controller Overcurrent 2',
    '13-1 - Current Sensor Fault',
    '14-1 - Precharge',
    '15-1 - Controller Severe Undertemp',
    '16-1 - Controller Severe Overtemp',
    '17-1 - Severe Undervoltage',
    '18-1 - Severe Overvoltage',
    '22-1 - Controller Overtemp',
    '25-1 - 5V Supply Failure',
    '26-1 - 10V Supply Failure',
    '27-1 - Severe Motor Over Temp',
    '28-1 - Motor Temp Hot Cutback',
    '29-1 - Motor Temp Sensor Fault',
    '31-1 - Contactor Open/Short',
    '35-1 - Fault Output Open/Short',
    '36-1 - Motor Stalled',
    '37-1 - Motor Open',
    '38-1 - Contactor Welded',
    '39-1 - Contactor Opened',
    '39-2 - Contactor Did Not Close',//change with 39-1
    '41-1 - Command Analog1 Out of Range',
    '42-1 - Command Analog3 Out of Range',
    '43-1 - Feedback Analog5 Out of Range',
    '44-1 - Feedback Analog6 Out of Range',
    '45-1 - CAN Not Operational',
    '46-1 - EEPROM CRC Fault',
    '47-1 - Sin Cos Command Sensor',
    '47-2 - Sawtooth Command Sensor',//change with 47-1
    '48-1 - Sin Cos Feedback Sensor',
    '48-2 - Sawtooth Feedback Sensor',//change with 48-1
    '49-1 - Parameter Change Fault',
    '51-1 - Interlock Switch Supervision',
    '52-1 - Home Switch Supervision',
    '53-1 - Home Position Not Found',
    '54-1 - Home Reference Tolerance Fault',
    '55-1 - Steer Command Supervision',
    '56-1 - Wheel Position Supervision',
    '69-1 - 5V Current Out of Range',
    '71-1 - Software Fault 1',
    '71-2 - Software Fault 2',
    '71-3 - Software Fault 3',
    '71-4 - Software Fault 4',
    '71-5 - Software Fault 5',
    '72-1 - PDO1 Timeout',
    '72-2 - PDO2 Timeout',
    '72-3 - PDO3 Timeout',
    '72-4 - PDO4 Timeout',
    '73-1 - Following Error',
    '74-1 - Hardware Software Mismatch',
    '75-1 - Parameter Conflict',
  ];

  const column8PLCValues = [
    'Connection Fault',
    'Generic Fault',
    '0 - Pin L2 - Supply Fault',
    '1 - Pin L1 - Supply Fault',
    '2 - Pin K4 - Supply Fault',
    '3 - Pin H3 - Sensor Supply Fault',
    '4 - Pin K3 - CAN1 Fault',
    '5 - Pin J3 - CAN1 Fault',
    '6 - Pin G4 - Input Fault',
    '7 - Pin F4 - Input Fault',
    '8 - Pin E3 - Input Fault',
    '9 - Pin D3 - Input Fault',
    '10 - Pin C3 - Input Fault',
    '11 - Pin B3 - Input Fault',
    '12 - Pin J4 - Input Fault',
    '13 - Pin H4 - Input Fault',
    '14 - Pin E4 - Input Fault',
    '15 - Pin D4 - Input Fault',
    '16 - Pin C4 - Input Fault',
    '17 - Pin B4 - Input Fault',
    '18 - Pin A4 - Input Fault',
    '19 - Pin A3 - Input Fault',
    '20 - Pin H1 - HS Output Fault',
    '21 - Pin G1 - HS Output Fault',
    '22 - Pin F1 - HS Output Fault',
    '23 - Pin E1 - HS Output Fault',
    '24 - Pin D1 - HS Output Fault',
    '25 - Pin C1 - HS Output Fault',
    '26 - Pin K1 - HS Output Fault',
    '27 - Pin J1 - HS Output Fault',
    '28 - Pin B1 - LS Output Fault',
    '29 - Pin A1 - LS Output Fault',
    '30 - Pin K2 - PVG Output Fault',
    '31 - Pin J2 - PVG Output Fault',
    '32 - Pin H2 - PVG Output Fault',
    '33 - Pin G2 - PVG Output Fault',
    '34 - Pin F2 - PVG Output Fault',
    '35 - Pin E2 - PVG Output Fault',
    '36 - Fault 36',
    '37 - Fault 37',
    '38 - Fault 38',
    '39 - Fault 39',
    '40 - Fault 40',
    '41 - Fault 41',
    '42 - Fault 42',
    '43 - Fault 43',
    '44 - Fault 44',
    '45 - Fault 45',
    '46 - Fault 46',
    '47 - Fault 47',
    '48 - Fault 48',
    '49 - Fault 49',
    '50 - Fault 50',
    '51 - Fault 51',
    '52 - Fault 52',
    '53 - Fault 53',
    '54 - Fault 54',
    '55 - Fault 55',
    '56 - Fault 56',
    '57 - Fault 57',
    '58 - Fault 58',
    '59 - Fault 59',
    '60 - Fault 60',
    '61 - Fault 61',
    '62 - Fault 62',
    '63 - Fault 63',
    '64 - Fault 64',
  ];

  const chunkSize = 256 * 1024;

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && (file.type === 'text/plain' || file.name.endsWith('.log'))) {

      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));

      const reader = new FileReader();
      reader.readAsText(file);

      reader.onload = () => {
        const content = reader.result;
        const lines = content.split('\n');

        let filePages = [];
        let currentChunk = '';
        let currentSize = 0;

        let dataLines = lines.slice(1);

        dataLines.forEach(line => {
          if (!line.trim()) return;

          const lineSize = new Blob([line]).size;

          if (currentSize + lineSize > chunkSize) {
            filePages.push(currentChunk);
            currentChunk = line + '\n';
            currentSize = lineSize;
          } else {
            currentChunk += line + '\n';
            currentSize += lineSize;
          }
          setTimeout(() => 10);
        });

        if (currentChunk) {
          filePages.push(currentChunk);
        }

        setPages(filePages);
        setOriginalPages(filePages);
        setFileContent(content);
        setIsLoading(false);
      };

      reader.onerror = () => {
        alert('Error reading file. Please try again.');
        setIsLoading(false);
      };

      setIsLoading(true);
    } else {
      alert('Please upload a valid .log file');
    }
  };

  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) => {
      const newPage = prevPage + direction;
      if (newPage >= 0 && newPage < pages.length) {
        return newPage;
      }
      return prevPage;
    });
  };

  const handleFirstPage = () => {
    setCurrentPage(0);
  };

  const handleLastPage = () => {
    setCurrentPage(pages.length - 1);
  };

  const currentPageContent = pages[currentPage] || '';

  const handleFilterChange = (column, value) => {
    setFilters({
      ...filters,
      [column]: value
    });
  };

  const handleDateChange = (type, value) => {
    if (type === 'start') {
      setStartDate(value);
    } else {
      setEndDate(value);
    }
  };

  const handleResetDateFilter = () => {
    setStartDate('');
    setEndDate('');
  };

  const [sortDirection, setSortDirection] = useState('desc');

  const formatDate = (date) => {
    if (!(date instanceof Date)) return date;
    const pad = (num) => String(num).padStart(2, '0');
    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
  };

  const handleSort = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newDirection);

    const allContent = pages
      .join('\n')
      .split('\n')
      .filter(line => line.trim() !== '')
      .map((line) => {
        //const values = line.split(';');
        const trimmedLine = line.replace(/;$/, '');
        const values = trimmedLine.split(';');

        if (values.length === 8) {
          const updatedValues = values.map((value, valueIndex) => {
            const trimmedValue = value.trim();
            if (valueIndex === 0) {
              const epoch = parseInt(trimmedValue, 10);
              if (!isNaN(epoch)) {
                return new Date(epoch * 1000);
              }
            }
            return value;
          });
          return updatedValues;
        }
        return null;
      })
      .filter(row => row !== null);

    allContent.sort((a, b) => {
      const dateA = a[0] instanceof Date ? a[0].getTime() : 0;
      const dateB = b[0] instanceof Date ? b[0].getTime() : 0;
      return newDirection === 'asc' ? dateA - dateB : dateB - dateA;
    });

    const newPages = [];
    let currentChunk = '';
    let currentSize = 0;

    allContent.forEach(row => {
      const displayRow = [...row];
      if (displayRow[0] instanceof Date) {
        displayRow[0] = Math.floor(displayRow[0].getTime() / 1000);
      }

      const line = displayRow.join(';') + '\n';
      const lineSize = new Blob([line]).size;

      if (currentSize + lineSize > chunkSize) {
        newPages.push(currentChunk);
        currentChunk = line;
        currentSize = lineSize;
      } else {
        currentChunk += line;
        currentSize += lineSize;
      }
    });

    if (currentChunk) {
      newPages.push(currentChunk);
    }

    setPages(newPages);
    setCurrentPage(0);
  };

  const handleResetSort = () => {
    setPages(originalPages);
    setSortDirection('desc');
    setCurrentPage(0);
  };

  const filteredContent = currentPageContent
    .split('\n')
    .filter(line => line.trim() !== '')
    .map((line) => {
      const trimmedLine = line.replace(/;$/, '');
      const values = trimmedLine.split(';');

      if (values.length === 8) {
        const updatedValues = values.map((value, valueIndex) => {
          const trimmedValue = value.trim();
          if (valueIndex === 0) {
            const epoch = parseInt(trimmedValue, 10);
            if (!isNaN(epoch)) {
              return new Date(epoch * 1000);
            }
          }
          if (valueIndex === 1 ) {
            if (trimmedValue === '0') return '0 Generic Op.';
            if (trimmedValue === '1') return '1 Low Op.';
            if (trimmedValue === '2') return '2 Standard Op.';
            if (trimmedValue === '3') return '3 High Op.';
            if (trimmedValue === '4') return '4 Service Op.';
            if (trimmedValue === '5') return '5 Manager Op.';
            if (trimmedValue === '6') return '6 Dealer Op.';
            if (trimmedValue === '7') return '7 Combilift Op.';
            if (trimmedValue === '8') return '8 Developer Op.';
          }
          if (valueIndex === 3 ) {
            if (trimmedValue === '601') return 'FAULT';
          }
          if (valueIndex === 4 ) {
            if (trimmedValue === '2') return 'SRR';
            if (trimmedValue === '3') return 'SRL';
            if (trimmedValue === '4') return 'SFR';
            if (trimmedValue === '5') return 'SFL';
            if (trimmedValue === '36') return 'TRR';
            if (trimmedValue === '37') return 'TRL';
            if (trimmedValue === '38') return 'TFR';
            if (trimmedValue === '39') return 'TFL';
            if (trimmedValue === '40') return 'Pump';
            if (trimmedValue === '50') return 'PLC';
          }
          return value;
        });

        if (values[4] >= '36' && values[4] <= '40') {
          if (values[5] === '100') updatedValues[7] = 'Connection Fault';
          if (values[5] === '10000') updatedValues[7] = '5-1 - User 1 Fault';
          if (values[5] === '10001') updatedValues[7] = '5-2 - User 2 Fault';
          if (values[5] === '10002') updatedValues[7] = '5-3 - User 3 Fault';
          if (values[5] === '10003') updatedValues[7] = '5-4 - User 4 Fault';
          if (values[5] === '10016') updatedValues[7] = '5-5 - User 5 Fault';
          if (values[5] === '10017') updatedValues[7] = '5-6 - User 6 Fault';
          if (values[5] === '10018') updatedValues[7] = '5-7 - User 7 Fault';
          if (values[5] === '10019') updatedValues[7] = '5-8 - User 8 Fault';
          if (values[5] === '10032') updatedValues[7] = '5-9 - User 9 Fault';
          if (values[5] === '10033') updatedValues[7] = '6-1 - User 10 Fault';
          if (values[5] === '10034') updatedValues[7] = '6-2 - User 11 Fault';
          if (values[5] === '10035') updatedValues[7] = '6-3 - User 12 Fault';
          if (values[5] === '10048') updatedValues[7] = '6-4 - User 13 Fault';
          if (values[5] === '10049') updatedValues[7] = '6-5 - User 14 Fault';
          if (values[5] === '10050') updatedValues[7] = '6-6 - User 15 Fault';
          if (values[5] === '10051') updatedValues[7] = '6-7 - User 16 Fault';
          if (values[5] === '10064') updatedValues[7] = '5-10 - User 17 Fault';
          if (values[5] === '10065') updatedValues[7] = '5-11 - User 18 Fault';
          if (values[5] === '10066') updatedValues[7] = '5-12 - User 19 Fault';
          if (values[5] === '10067') updatedValues[7] = '5-13 - User 20 Fault';
          if (values[5] === '10080') updatedValues[7] = '5-14 - User 21 Fault';
          if (values[5] === '10081') updatedValues[7] = '5-15 - User 22 Fault';
          if (values[5] === '10082') updatedValues[7] = '6-10 - User 23 Fault';
          if (values[5] === '10083') updatedValues[7] = '6-11 - User 24 Fault';
          if (values[5] === '10096') updatedValues[7] = '6-12 - User 25 Fault';
          if (values[5] === '10097') updatedValues[7] = '6-13 - User 26 Fault';
          if (values[5] === '10098') updatedValues[7] = '6-14 - User 27 Fault';
          if (values[5] === '10099') updatedValues[7] = '6-15 - User 28 Fault';
          if (values[5] === '10112') updatedValues[7] = '7-10 - User 29 Fault';
          if (values[5] === '10113') updatedValues[7] = '7-11 - User 30 Fault';
          if (values[5] === '10114') updatedValues[7] = '7-12 - User 31 Fault';
          if (values[5] === '10115') updatedValues[7] = '7-13 - User 32 Fault';
          if (values[5] === '8449') updatedValues[7] = '13-2 - Phase PWM Mismatch';
          if (values[5] === '8450') updatedValues[7] = '3-11 - Misalignment Error';
          if (values[5] === '8451') updatedValues[7] = '3-10 - Motor Setup Needed';
          if (values[5] === '8452') updatedValues[7] = '13-1 - Lift Input';
          if (values[5] === '8453') updatedValues[7] = '13-4 - Lower Input';
          if (values[5] === '8454') updatedValues[7] = '12-7 - Analog 31 Out of Range';
          if (values[5] === '8455') updatedValues[7] = '12-8 - Invalid CAN Port';
          if (values[5] === '8456') updatedValues[7] = '12-9 - VCL Watchdog';
          if (values[5] === '8457') updatedValues[7] = '1-11 - Critical OS General';
          if (values[5] === '8458') updatedValues[7] = '1-12 - OS General 2';
          if (values[5] === '8459') updatedValues[7] = '12-4 - Torque Input';
          if (values[5] === '8460') updatedValues[7] = '12-13 - PWM Input 28 Out of Range';
          if (values[5] === '8461') updatedValues[7] = '12-12 - PWM Input 29 Out of Range';
          if (values[5] === '8462') updatedValues[7] = '1-14 - Motor Short';
          if (values[5] === '8463') updatedValues[7] = '12-15 - Force Feedback Fault';
          if (values[5] === '8464') updatedValues[7] = '1-13 - Reset Rejected';
          if (values[5] === '8465') updatedValues[7] = '12-10 - Auto Baud Failure On Ancillary';
          if (values[5] === '8466') updatedValues[7] = '13-0 - Steering Traction Msg Count';
          if (values[5] === '8467') updatedValues[7] = '12-11 - Primary State Error';
          if (values[5] === '8468') updatedValues[7] = '13-13 - IMU Failure';
          if (values[5] === '8470') updatedValues[7] = '13-0 - Delayed Shutdown';
          if (values[5] === '8471') updatedValues[7] = '8-0 - Secondary Command Input';
          if (values[5] === '8472') updatedValues[7] = '8-1 - Secondary Feedback Input';
          if (values[5] === '8474') updatedValues[7] = '8-4 - Motor Braking Impaired';
          if (values[5] === '8476') updatedValues[7] = '13-6 - Hazardous Movement';
          if (values[5] === '8477') updatedValues[7] = '8-3 - Lv Supply Pos Out Of Range';
          if (values[5] === '8480') updatedValues[7] = '1-7 - Severe B+ Undervoltage';
          if (values[5] === '8481') updatedValues[7] = '2-3 - Undervoltage Cutback';
          if (values[5] === '8482') updatedValues[7] = '1-7 - Severe KSI Undervoltage';
          if (values[5] === '8484') updatedValues[7] = '4-7 - Hydraulic HPD SRO Lower';
          if (values[5] === '8485') updatedValues[7] = '4-7 - Hydraulic HPD SRO Lift';
          if (values[5] === '8486') updatedValues[7] = '4-7 - LHS Throttle Conflict';
          if (values[5] === '8487') updatedValues[7] = '13-10 - Lift Limit';
          if (values[5] === '8490') updatedValues[7] = '15-1 - Memory Parity';
          if (values[5] === '8496') updatedValues[7] = '1-8 - Severe B+ Overvoltage';
          if (values[5] === '8497') updatedValues[7] = '2-4 - Overvoltage Cutback';
          if (values[5] === '8498') updatedValues[7] = '1-8 - Severe KSI Overvoltage';
          if (values[5] === '8499') updatedValues[7] = '1-9 - Speed Limit Supervision';
          if (values[5] === '8500') updatedValues[7] = '1-10 - Motor Not Stopped';
          if (values[5] === '8512') updatedValues[7] = '2-2 - Controller Overtemperature Cutback';
          if (values[5] === '8513') updatedValues[7] = '1-5 - Controller Severe Undertemperature';
          if (values[5] === '8514') updatedValues[7] = '1-6 - Controller Severe Overtemperature';
          if (values[5] === '8528') updatedValues[7] = '2-9 - Motor Temp Sensor';
          if (values[5] === '8529') updatedValues[7] = '2-8 - Motor Temp Hot Cutback';
          if (values[5] === '8544') updatedValues[7] = '10-1 - Driver 1 Fault';
          if (values[5] === '8545') updatedValues[7] = '10-2 - Driver 2 Fault';
          if (values[5] === '8546') updatedValues[7] = '10-3 - Driver 3 Fault';
          if (values[5] === '8547') updatedValues[7] = '10-4 - Driver 4 Fault';
          if (values[5] === '8548') updatedValues[7] = '10-5 - Driver 5 Fault';
          if (values[5] === '8549') updatedValues[7] = '10-6 - Driver 6 Fault';
          if (values[5] === '8550') updatedValues[7] = '10-7 - Driver 7 Fault';
          if (values[5] === '8553') updatedValues[7] = '10-9 - Coil Supply';
          if (values[5] === '8720') updatedValues[7] = '4-2 - Throttle Input';
          if (values[5] === '8721') updatedValues[7] = '4-7 - HPD Sequencing';
          if (values[5] === '8736') updatedValues[7] = '3-8 - Main Contactor Welded';
          if (values[5] === '8737') updatedValues[7] = '3-9 - Main Contactor Did Not Close';
          if (values[5] === '8738') updatedValues[7] = '3-1 - Main Driver';
          if (values[5] === '8739') updatedValues[7] = '1-4 - Precharge Failed';
          if (values[5] === '8752') updatedValues[7] = '3-6 - IM Motor Feedback';
          if (values[5] === '8753') updatedValues[7] = '7-3 - Stall Detected';
          if (values[5] === '8754') updatedValues[7] = '3-6 - Sin Cos Motor Feedback';
          if (values[5] === '8755') updatedValues[7] = '9-3 - Encoder LOS';
          if (values[5] === '8756') updatedValues[7] = '8-8 - Encoder Pulse Error';
          if (values[5] === '8768') updatedValues[7] = '3-7 - Motor Open';
          if (values[5] === '8784') updatedValues[7] = '7-6 - Dual Severe';
          if (values[5] === '8785') updatedValues[7] = '7-4 - Fault On Other Traction Controller Active';
          if (values[5] === '8786') updatedValues[7] = '4-5 - Steer Angle Input';
          if (values[5] === '8787') updatedValues[7] = '7-2 - Dual Pdo Timeout';
          if (values[5] === '8800') updatedValues[7] = '4-8 - Following Error';
          if (values[5] === '8832') updatedValues[7] = '13-5 - Primary Command Input';
          if (values[5] === '8848') updatedValues[7] = '13-7 - Primary Feedback Input';
          if (values[5] === '8864') updatedValues[7] = '7-7 - Steering Supervision Error';
          if (values[5] === '8865') updatedValues[7] = '7-7 - Home Switch Supervision';
          if (values[5] === '8866') updatedValues[7] = '7-7 - Interlock Input Conflict';
          if (values[5] === '8867') updatedValues[7] = '7-7 - Steer Command Supervision';
          if (values[5] === '8868') updatedValues[7] = '7-7 - Wheel Position Supervision';
          if (values[5] === '8869') updatedValues[7] = '7-7 - Home Position Not Found';
          if (values[5] === '8870') updatedValues[7] = '7-7 - Home Reference Tolerance';
          if (values[5] === '8871') updatedValues[7] = '10-4 - Steering Safety Output Failed';
          if (values[5] === '8976') updatedValues[7] = '4-4 - Brake Input';
          if (values[5] === '8992') updatedValues[7] = '3-2 - EM Brake Driver';
          if (values[5] === '8993') updatedValues[7] = '9-2 - EM Brake Failed to Set';
          if (values[5] === '9008') updatedValues[7] = '9-4 - Emer Rev Timeout';
          if (values[5] === '9009') updatedValues[7] = '4-7 - Emer Rev HPD';
          if (values[5] === '9010') updatedValues[7] = '9-10 - Interlock Braking Supervision';
          if (values[5] === '9011') updatedValues[7] = '9-11 - EMR Supervision';
          if (values[5] === '9248') updatedValues[7] = '3-3 - Pump Driver';
          if (values[5] === '9264') updatedValues[7] = '3-4 - Load Hold Driver';
          if (values[5] === '9280') updatedValues[7] = '3-5 - Lower Driver';
          if (values[5] === '9296') updatedValues[7] = '9-6 - Pump BDI';
          if (values[5] === '9488') updatedValues[7] = '1-2 - Controller Overcurrent';
          if (values[5] === '9504') updatedValues[7] = '9-5 - Pump Overcurrent';
          if (values[5] === '9521') updatedValues[7] = '2-5 - Ext 5V Supply Failure';
          if (values[5] === '9522') updatedValues[7] = '2-6 - Ext 12V Supply Failure';
          if (values[5] === '9537') updatedValues[7] = '7-2 - PDO Timeout';
          if (values[5] === '9538') updatedValues[7] = '8-2 - PDO Mapping Error';
          if (values[5] === '9552') updatedValues[7] = '7-6 - Insulation Resistance Low';
          if (values[5] === '9760') updatedValues[7] = '11-1 - Analog 1 Out Of Range';
          if (values[5] === '9761') updatedValues[7] = '11-2 - Analog 2 Out Of Range';
          if (values[5] === '9762') updatedValues[7] = '11-3 - Analog 3 Out Of Range';
          if (values[5] === '9763') updatedValues[7] = '11-4 - Analog 4 Out Of Range';
          if (values[5] === '9764') updatedValues[7] = '11-5 - Analog 5 Out Of Range';
          if (values[5] === '9765') updatedValues[7] = '11-6 - Analog 6 Out Of Range';
          if (values[5] === '9766') updatedValues[7] = '11-7 - Analog 7 Out Of Range';
          if (values[5] === '9767') updatedValues[7] = '11-8 - Analog 8 Out Of Range';
          if (values[5] === '9768') updatedValues[7] = '11-9 - Analog 9 Out of Range';
          if (values[5] === '9769') updatedValues[7] = '12-5 - PWM Input 10 Out of Range';
          if (values[5] === '9770') updatedValues[7] = '11-11 - Analog 14 Out Of Range';
          if (values[5] === '9771') updatedValues[7] = '11-13 - Analog 18 Out of Range';
          if (values[5] === '9772') updatedValues[7] = '11-14 - Analog 19 Out of Range';
          if (values[5] === '9773') updatedValues[7] = '12-6 - Pwm Input 17 Out Of Range';
          if (values[5] === '9777') updatedValues[7] = '11-12 - Analog Assignment';
          if (values[5] === '9778') updatedValues[7] = '10-8 - Driver Assignment';
          if (values[5] === '10257') updatedValues[7] = '8-9 - Parameter Out of Range';
          if (values[5] === '10258') updatedValues[7] = '9-9 - Parameter Mismatch';
          if (values[5] === '10259') updatedValues[7] = '4-9 - Parameter Change';
          if (values[5] === '10261') updatedValues[7] = '9-1 - Bad Firmware';
          if (values[5] === '10263') updatedValues[7] = '4-10 - EMR Switch';
          if (values[5] === '10272') updatedValues[7] = '6-8 - VCL Run Time Error';
          if (values[5] === '10288') updatedValues[7] = '4-6 - NV Memory Failure';
          if (values[5] === '10289') updatedValues[7] = '7-1 - OS General';
          if (values[5] === '10290') updatedValues[7] = '1-3 - Current Sensor';
          if (values[5] === '10291') updatedValues[7] = '9-7 - Pump Hardware';
          if (values[5] === '10292') updatedValues[7] = '11-15 - Pump Current Sensor';
          if (values[5] === '10293') updatedValues[7] = '8-3 - Internal Hardware';
          if (values[5] === '10304') updatedValues[7] = '7-7 - Supervision';
          if (values[5] === '10305') updatedValues[7] = '7-9 - Supervision Input Check';
          if (values[5] === '10320') updatedValues[7] = '8-7 - Motor Characterization';
          if (values[5] === '10336') updatedValues[7] = '12-1 - Branding Error';
          if (values[5] === '10337') updatedValues[7] = '12-2 - BMS Cutback';
          if (values[5] === '10338') updatedValues[7] = '12-3 - Differential Steering';
          if (values[5] === '10352') updatedValues[7] = '13-3 - Hardware Compatibility';
          if (values[5] === '10353') updatedValues[7] = '6-8 - ECC Run Time Error';
          if (values[5] === '10384') updatedValues[7] = '14-14 - Eru Configuration';
          if (values[5] === '10385') updatedValues[7] = '14-15 - Desat Trip';
          if (values[5] === '10386') updatedValues[7] = '13-8 - ESTOP_Mismatch';
          if (values[5] === '10387') updatedValues[7] = '13-9 - ESTOP_SRO';
        }

        if (values[4] >= '2' && values[4] <= '5') {
          if (values[5] === '100') updatedValues[7] = 'Connection Fault';
          if (values[5] === '72' && values[6] === '1') updatedValues[7] = '72-1 - PDO1 Timeout';
          if (values[5] === '72' && values[6] === '2') updatedValues[7] = '72-2 - PDO2 Timeout';
          if (values[5] === '72' && values[6] === '3') updatedValues[7] = '72-3 - PDO3 Timeout';
          if (values[5] === '72' && values[6] === '4') updatedValues[7] = '72-4 - PDO4 Timeout';
          if (values[5] === '11' && values[6] === '1') updatedValues[7] = '11-1 - Hardware Fault';
          if (values[5] === '12' && values[6] === '1') updatedValues[7] = '12-1 - Controller Overcurrent 1';
          if (values[5] === '12' && values[6] === '2') updatedValues[7] = '12-2 - Controller Overcurrent 2';
          if (values[5] === '13' && values[6] === '1') updatedValues[7] = '13-1 - Current Sensor Fault';
          if (values[5] === '14' && values[6] === '1') updatedValues[7] = '14-1 - Precharge';
          if (values[5] === '15' && values[6] === '1') updatedValues[7] = '15-1 - Controller Severe Undertemp';
          if (values[5] === '16' && values[6] === '1') updatedValues[7] = '16-1 - Controller Severe Overtemp';
          if (values[5] === '17' && values[6] === '1') updatedValues[7] = '17-1 - Severe Undervoltage';
          if (values[5] === '18' && values[6] === '1') updatedValues[7] = '18-1 - Severe Overvoltage';
          if (values[5] === '22' && values[6] === '1') updatedValues[7] = '22-1 - Controller Overtemp';
          if (values[5] === '25' && values[6] === '1') updatedValues[7] = '25-1 - 5V Supply Failure';
          if (values[5] === '26' && values[6] === '1') updatedValues[7] = '26-1 - 10V Supply Failure';
          if (values[5] === '27' && values[6] === '1') updatedValues[7] = '27-1 - Severe Motor Over Temp';
          if (values[5] === '28' && values[6] === '1') updatedValues[7] = '28-1 - Motor Temp Hot Cutback';
          if (values[5] === '29' && values[6] === '1') updatedValues[7] = '29-1 - Motor Temp Sensor Fault';
          if (values[5] === '31' && values[6] === '1') updatedValues[7] = '31-1 - Contactor Open/Short';
          if (values[5] === '35' && values[6] === '1') updatedValues[7] = '35-1 - Fault Output Open/Short';
          if (values[5] === '36' && values[6] === '1') updatedValues[7] = '36-1 - Motor Stalled';
          if (values[5] === '37' && values[6] === '1') updatedValues[7] = '37-1 - Motor Open';
          if (values[5] === '38' && values[6] === '1') updatedValues[7] = '38-1 - Contactor Welded';
          if (values[5] === '39' && values[6] === '1') updatedValues[7] = '39-1 - Contactor Did Not Close';
          if (values[5] === '39' && values[6] === '2') updatedValues[7] = '39-2 - Contactor Opened';
          if (values[5] === '41' && values[6] === '1') updatedValues[7] = '41-1 - Command Analog1 Out of Range';
          if (values[5] === '42' && values[6] === '1') updatedValues[7] = '42-1 - Command Analog3 Out of Range';
          if (values[5] === '43' && values[6] === '1') updatedValues[7] = '43-1 - Feedback Analog5 Out of Range';
          if (values[5] === '44' && values[6] === '1') updatedValues[7] = '44-1 - Feedback Analog6 Out of Range';
          if (values[5] === '45' && values[6] === '1') updatedValues[7] = '45-1 - CAN Not Operational';
          if (values[5] === '46' && values[6] === '1') updatedValues[7] = '46-1 - EEPROM CRC Fault';
          if (values[5] === '47' && values[6] === '1') updatedValues[7] = '47-1 - Sawtooth Command Sensor';
          if (values[5] === '47' && values[6] === '2') updatedValues[7] = '47-2 - Sin Cos Command Sensor';
          if (values[5] === '48' && values[6] === '1') updatedValues[7] = '48-1 - Sawtooth Feedback Sensor';
          if (values[5] === '48' && values[6] === '2') updatedValues[7] = '48-2 - Sin Cos Feedback Sensor';
          if (values[5] === '49' && values[6] === '1') updatedValues[7] = '49-1 - Parameter Change Fault';
          if (values[5] === '51' && values[6] === '1') updatedValues[7] = '51-1 - Interlock Switch Supervision';
          if (values[5] === '52' && values[6] === '1') updatedValues[7] = '52-1 - Home Switch Supervision';
          if (values[5] === '53' && values[6] === '1') updatedValues[7] = '53-1 - Home Position Not Found';
          if (values[5] === '54' && values[6] === '1') updatedValues[7] = '54-1 - Home Reference Tolerance Fault';
          if (values[5] === '55' && values[6] === '1') updatedValues[7] = '55-1 - Steer Command Supervision';
          if (values[5] === '56' && values[6] === '1') updatedValues[7] = '56-1 - Wheel Position Supervision';
          if (values[5] === '69' && values[6] === '1') updatedValues[7] = '69-1 - 5V Current Out of Range';
          if (values[5] === '71' && values[6] === '1') updatedValues[7] = '71-1 - Software Fault 1';
          if (values[5] === '71' && values[6] === '2') updatedValues[7] = '71-2 - Software Fault 2';
          if (values[5] === '71' && values[6] === '3') updatedValues[7] = '71-3 - Software Fault 3';
          if (values[5] === '71' && values[6] === '4') updatedValues[7] = '71-4 - Software Fault 4';
          if (values[5] === '71' && values[6] === '5') updatedValues[7] = '71-5 - Software Fault 5';
          if (values[5] === '73' && values[6] === '1') updatedValues[7] = '73-1 - Following Error';
          if (values[5] === '74' && values[6] === '1') updatedValues[7] = '74-1 - Hardware Software Mismatch';
          if (values[5] === '75' && values[6] === '1') updatedValues[7] = '75-1 - Parameter Conflict';
        }

        if (values[4] === '50') {
          if (values[5] === '100') updatedValues[7] = 'Connection Fault';
          if (values[5] === '0') updatedValues[7] = '0 - Pin L2 - Supply Fault';
          if (values[5] === '1') updatedValues[7] = '1 - Pin L1 - Supply Fault';
          if (values[5] === '2') updatedValues[7] = '2 - Pin K4 - Supply Fault';
          if (values[5] === '3') updatedValues[7] = '3 - Pin H3 - Sensor Supply Fault';
          if (values[5] === '4') updatedValues[7] = '4 - Pin K3 - CAN1 Fault';
          if (values[5] === '5') updatedValues[7] = '5 - Pin J3 - CAN1 Fault';
          if (values[5] === '6') updatedValues[7] = '6 - Pin G4 - Input Fault';
          if (values[5] === '7') updatedValues[7] = '7 - Pin F4 - Input Fault';
          if (values[5] === '8') updatedValues[7] = '8 - Pin E3 - Input Fault';
          if (values[5] === '9') updatedValues[7] = '9 - Pin D3 - Input Fault';
          if (values[5] === '10') updatedValues[7] = '10 - Pin C3 - Input Fault';
          if (values[5] === '11') updatedValues[7] = '11 - Pin B3 - Input Fault';
          if (values[5] === '12') updatedValues[7] = '12 - Pin J4 - Input Fault';
          if (values[5] === '13') updatedValues[7] = '13 - Pin H4 - Input Fault';
          if (values[5] === '14') updatedValues[7] = '14 - Pin E4 - Input Fault';
          if (values[5] === '15') updatedValues[7] = '15 - Pin D4 - Input Fault';
          if (values[5] === '16') updatedValues[7] = '16 - Pin C4 - Input Fault';
          if (values[5] === '17') updatedValues[7] = '17 - Pin B4 - Input Fault';
          if (values[5] === '18') updatedValues[7] = '18 - Pin A4 - Input Fault';
          if (values[5] === '19') updatedValues[7] = '19 - Pin A3 - Input Fault';
          if (values[5] === '20') updatedValues[7] = '20 - Pin H1 - HS Output Fault';
          if (values[5] === '21') updatedValues[7] = '21 - Pin G1 - HS Output Fault';
          if (values[5] === '22') updatedValues[7] = '22 - Pin F1 - HS Output Fault';
          if (values[5] === '23') updatedValues[7] = '23 - Pin E1 - HS Output Fault';
          if (values[5] === '24') updatedValues[7] = '24 - Pin D1 - HS Output Fault';
          if (values[5] === '25') updatedValues[7] = '25 - Pin C1 - HS Output Fault';
          if (values[5] === '26') updatedValues[7] = '26 - Pin K1 - HS Output Fault';
          if (values[5] === '27') updatedValues[7] = '27 - Pin J1 - HS Output Fault';
          if (values[5] === '28') updatedValues[7] = '28 - Pin B1 - LS Output Fault';
          if (values[5] === '29') updatedValues[7] = '29 - Pin A1 - LS Output Fault';
          if (values[5] === '30') updatedValues[7] = '30 - Pin K2 - PVG Output Fault';
          if (values[5] === '31') updatedValues[7] = '31 - Pin J2 - PVG Output Fault';
          if (values[5] === '32') updatedValues[7] = '32 - Pin H2 - PVG Output Fault';
          if (values[5] === '33') updatedValues[7] = '33 - Pin G2 - PVG Output Fault';
          if (values[5] === '34') updatedValues[7] = '34 - Pin F2 - PVG Output Fault';
          if (values[5] === '35') updatedValues[7] = '35 - Pin E2 - PVG Output Fault';
          if (values[5] === '36') updatedValues[7] = '36 - Fault 36';
          if (values[5] === '37') updatedValues[7] = '37 - Fault 37';
          if (values[5] === '38') updatedValues[7] = '38 - Fault 38';
          if (values[5] === '39') updatedValues[7] = '39 - Fault 39';
          if (values[5] === '40') updatedValues[7] = '40 - Fault 40';
          if (values[5] === '41') updatedValues[7] = '41 - Fault 41';
          if (values[5] === '42') updatedValues[7] = '42 - Fault 42';
          if (values[5] === '43') updatedValues[7] = '43 - Fault 43';
          if (values[5] === '44') updatedValues[7] = '44 - Fault 44';
          if (values[5] === '45') updatedValues[7] = '45 - Fault 45';
          if (values[5] === '46') updatedValues[7] = '46 - Fault 46';
          if (values[5] === '47') updatedValues[7] = '47 - Fault 47';
          if (values[5] === '48') updatedValues[7] = '48 - Fault 48';
          if (values[5] === '49') updatedValues[7] = '49 - Fault 49';
          if (values[5] === '50') updatedValues[7] = '50 - Fault 50';
          if (values[5] === '51') updatedValues[7] = '51 - Fault 51';
          if (values[5] === '52') updatedValues[7] = '52 - Fault 52';
          if (values[5] === '53') updatedValues[7] = '53 - Fault 53';
          if (values[5] === '54') updatedValues[7] = '54 - Fault 54';
          if (values[5] === '55') updatedValues[7] = '55 - Fault 55';
          if (values[5] === '56') updatedValues[7] = '56 - Fault 56';
          if (values[5] === '57') updatedValues[7] = '57 - Fault 57';
          if (values[5] === '58') updatedValues[7] = '58 - Fault 58';
          if (values[5] === '59') updatedValues[7] = '59 - Fault 59';
          if (values[5] === '60') updatedValues[7] = '60 - Fault 60';
          if (values[5] === '61') updatedValues[7] = '61 - Fault 61';
          if (values[5] === '62') updatedValues[7] = '62 - Fault 62';
          if (values[5] === '63') updatedValues[7] = '63 - Fault 63';
          if (values[5] === '64') updatedValues[7] = '64 - Fault 64';
        }

        if (updatedValues[7] == 0) {
          if (values[4] >= 2 && values[4] <= 5) {
            updatedValues[7] = values[5] + '-' + values[6] + ' - Generic Fault';
          }

          if ((values[4] >= 36 && values[4] <= 40) || (values[4] == 50)){
            updatedValues[7] = values[5] + ' - Generic Fault';
          }
        }

      return updatedValues;
    }
    return null;
  })
  .filter((row) => row !== null)
  .filter((row) => {
    const rowDate = row[0];
    const isWithinDateRange =
      (!startDate || rowDate >= new Date(startDate)) &&
      (!endDate || rowDate <= new Date(endDate));

    const passesFilters = ['column2', 'column5', 'column8'].every((column, index) => {
      const filterValue = filters[column];
      const rowValue = row[[1, 4, 7][index]];

      if (!filterValue || filterValue.length === 0) {
        return true;
      }

      if (column === 'column5') {
        if (filterValue === 'All Traction') {
          const tractionValues = ['TRR', 'TRL', 'TFR', 'TFL'];
          return tractionValues.includes(rowValue);
        } else if (filterValue === 'All Steer') {
          const steerValues = ['SRR', 'SRL', 'SFR', 'SFL'];
          return steerValues.includes(rowValue);
        } else {
          return rowValue === filterValue;
        }
      } else {
        if (filterValue === 'Generic Fault') {
          return rowValue.includes('Generic Fault');
        }
        return rowValue === filterValue;
      }
    });
    return isWithinDateRange && passesFilters;
  });

  const headerColumns = fileContent ? fileContent.split('\n')[0].split(';') : [];

  const handleBlur = (event) => {
    event.target.blur();
  };

//##############################################################################
//##############################################################################
//##############################################################################

    return (
      <div>
        {isLoading && <LoadingMessage />}
        <main className={styles.main} style={{ overflowX: 'auto' }}>
{/*##########################################################################*/}
        <div className={styles.navigationButtons}>
          <button
            className={`${styles.navigationButton} ${pathname === '/' ? styles.active : ''}`}
            onClick={() => router.push('/')}
          >
            Activities
          </button>
          <button
            className={`${styles.navigationButton} ${pathname === '/Faults' ? styles.active : ''}`}
            onClick={() => router.push('/Faults')}
          >
            Faults
          </button>
          <button
            className={`${styles.navigationButton} ${pathname === '/EditPAR' ? styles.active : ''}`}
            onClick={() => router.push('/EditPAR')}
          >
            Edit PAR
          </button>
          <button
            className={`${styles.navigationButton} ${pathname === '/CreateDemoFile' ? styles.active : ''}`}
            onClick={() => router.push('/CreateDemoFile')}
          >
            Create Demo File
          </button>
          <div className={styles.brandingContainer}>
            <h5>v1.0 @nunonogueir444</h5>
            <div className={styles.poweredBy}>
              <span>Powered by:&nbsp;&nbsp;</span>
              <img
                src="https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_dark_background.png"
                alt="Next.js Logo"
                className={`${styles.techLogo} ${styles.nextLogo} ${styles.glow}`}
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                alt="React Logo"
                className={`${styles.techLogo} ${styles.reactLogo}`}
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
                alt="JavaScript Logo"
                className={`${styles.techLogo} ${styles.jsLogo}`}
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg"
                alt="CSS Logo"
                className={`${styles.techLogo} ${styles.cssLogo}`}
              />
              <img
                src="https://www.vectorlogo.zone/logos/w3_html5/w3_html5-icon.svg"
                alt="HTML Logo"
                className={`${styles.techLogo} ${styles.htmlLogo}`}
              />
            </div>
          </div>
        </div>
{/*##########################################################################*/}
        <div className={styles.logsLabel}>
          <label>Fault Logs</label>
        </div>
{/*##########################################################################*/}
        <div className={styles.inputContainer}
          onClick={(e) => {
              handleBlur(e);
          }}>
          <div>
            <label>Load Faults File:
              </label>
          </div>
          <div>
            <input
            type="file"
            accept=".log"
            onChange={(e) => {
              handleFileChange(e);
              handleBlur(e);
            }}
            style={{
              width: '800px',
              maxWidth: 'none'
            }}
            />
          </div>
        </div>
{/*##########################################################################*/}
        <div className={styles.dateFilters}>
          <div className={styles.filtersLabel}>
            <label>Filters:</label>
          </div>

          <div>
            <label>
              Start Date:
              <input
                type="date"
                value={startDate}
                onChange={(e) => handleDateChange('start', e.target.value)}
              />
            </label>
          </div>

          <div>
            <label>
              End Date:
              <input
                type="date"
                value={endDate}
                onChange={(e) => handleDateChange('end', e.target.value)}
              />
            </label>
          </div>

          <div>
            <button
              onClick={handleResetDateFilter}
            >
              Reset Dates
            </button>
          </div>
        </div>

        <div className={styles.filterLabel}>
          <div><label>User Levels</label></div>
          <div><label>Controllers</label></div>
          <div><label>Traction Faults</label></div>
          <div><label>Steer Faults</label></div>
          <div><label>PLC Faults</label></div>
        </div>
{/*##########################################################################*/}
        <div>
        <div className={styles.dateFilters}>
          <div>
            <select
              className="filters-select"
              value={filters.column2}
              onChange={(e) => {
                handleFilterChange('column2', e.target.value);
                handleBlur(e);
              }}
            >
              <option value="">All User Levels</option>
              {column2Values.map((value, index) => (
                <option key={index} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              className="filters-select"
              value={filters.column5}
              onChange={(e) => {
                handleFilterChange('column5', e.target.value);
                handleBlur(e);
              }}
            >
              <option value="">All Controllers</option>
              {column5Values.map((value, index) => (
                <option key={index} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              className="filters-select"
              value={filters.column8}
              onChange={(e) => {
                handleFilterChange('column8', e.target.value);
                handleBlur(e);
              }}
            >
              <option value="">All Traction Faults</option>
              {column8Values.map((value, index) => (
                <option key={index} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              className="filters-select"
              value={filters.column8}
              onChange={(e) => {
                handleFilterChange('column8', e.target.value);
                handleBlur(e);
              }}
            >
              <option value="">All Steer Faults</option>
              {column8SteerValues.map((value, index) => (
                <option key={index} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              className="filters-select"
              value={filters.column8}
              onChange={(e) => {
                handleFilterChange('column8', e.target.value);
                handleBlur(e);
              }}
            >
              <option value="">All PLC Faults</option>
              {column8PLCValues.map((value, index) => (
                <option key={index} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </div>
{/*##########################################################################*/}
          {pages.length > 0 && (
            <>
              <div className={styles.pageNavigation}>
                <button onClick={handleFirstPage} disabled={currentPage === 0}>
                  First
                </button>
                <button onClick={() => handlePageChange(-1)} disabled={currentPage === 0}>
                  Previous
                </button>
                <span>Page {currentPage + 1} of {pages.length}</span>
                <button onClick={() => handlePageChange(1)} disabled={currentPage === pages.length - 1}>
                  Next
                </button>
                <button onClick={handleLastPage} disabled={currentPage === pages.length - 1}>
                  Last
                </button>
              </div>

              <div className={styles.tableContainer}>
                <table border="1" className={styles.table}>
                  <thead>
                    <tr>
                      <th>
                        Date
                        <button
                          className={styles.sortButton}
                          onClick={handleSort}
                        >
                          {sortDirection === 'asc' ? '↑' : '↓'}
                        </button>

                        <button
                          onClick={handleResetSort}
                          style={{ marginLeft: '5px' }}
                        >
                          Reset
                        </button>
                      </th>
                      <th>User Level</th>
                      <th>Ind. User</th>
                      <th>Group Event</th>
                      <th>Controller</th>
                      <th>Fault Code (Major)</th>
                      <th>Fault Code (Minor)</th>
                      <th>Fault Description</th>
                      {headerColumns.slice(8).map((column, index) => (
                        <th key={index}>{column}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContent.map((row, index) => (
                      <tr key={index}>
                        <td>{row[0] instanceof Date ? formatDate(row[0]) : row[0]}</td>
                        <td>{row[1]}</td>
                        <td>{row[2]}</td>
                        <td>{row[3]}</td>
                        <td>{row[4]}</td>
                        <td>{row[5]}</td>
                        <td>{row[6]}</td>
                        <td>{row[7]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/*<div className={styles.pageNavigation}>
                <button onClick={handleFirstPage} disabled={currentPage === 0}>
                  First
                </button>
                <button onClick={() => handlePageChange(-1)} disabled={currentPage === 0}>
                  Previous
                </button>
                <span>Page {currentPage + 1} of {pages.length}</span>
                <button onClick={() => handlePageChange(1)} disabled={currentPage === pages.length - 1}>
                  Next
                </button>
                <button onClick={handleLastPage} disabled={currentPage === pages.length - 1}>
                  Last
                </button>
              </div>*/}
              <br></br>
            </>
          )}
        </div>
{/*##########################################################################*/}
      </main>
    </div>
  );
}