"use client";


import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import styles from '../page.module.css';

export default function CreateDemoFile() {
  const router = useRouter();
  const pathname = usePathname();
  const [lineCount, setLineCount] = useState('10000');
  //const [error, setError] = useState('');
  const [fileType, setFileType] = useState('type1');

  const getRandomNumber = (min = 1, max = 1000) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getRandomEpochTime = () => {
    const start = Math.floor(new Date('2020-01-01T00:00:00Z').getTime() / 1000);
    const end = Math.floor(Date.now() / 1000);
    return Math.floor(Math.random() * (end - start)) + start;
  };

  const getRandomGroupEventNodes = () => {
    const ranges = [
      { min: 2, max: 5 },
      { min: 36, max: 40 },
      { min: 50, max: 50 },

    ];
    const selectedRange = ranges[Math.floor(Math.random() * ranges.length)];
    return Math.floor(Math.random() * (selectedRange.max - selectedRange.min + 1)) + selectedRange.min;
  };

  const getRandomGroupEventFaults = () => {
    const ranges = [
      { min: 601, max: 601 },

    ];
    const selectedRange = ranges[Math.floor(Math.random() * ranges.length)];
    return Math.floor(Math.random() * (selectedRange.max - selectedRange.min + 1)) + selectedRange.min;
  };

  const getRandomGroupEventFaultsMajor = () => {
    const ranges = [
      { min: 0,    max: 64 }, //PLC
      { min: 65,   max: 100 }, //PLC generic
      { min: 100,  max: 100 }, //CAN
      { min: 8449, max: 10387 }, //FSeries
      { min: 11,   max: 75 }, //SE Series
      { min: 0,    max: 100 }, //SE Series generic
    ];
    const selectedRange = ranges[Math.floor(Math.random() * ranges.length)];
    return Math.floor(Math.random() * (selectedRange.max - selectedRange.min + 1)) + selectedRange.min;
  };

  const getRandomGroupEventFaultsMinor = () => {
    const ranges = [
      { min: 1, max: 5 },

    ];
    const selectedRange = ranges[Math.floor(Math.random() * ranges.length)];
    return Math.floor(Math.random() * (selectedRange.max - selectedRange.min + 1)) + selectedRange.min;
  };

  const getRandomGroupEventActivities = () => {
    const ranges = [
      { min: 101, max: 107 },
      { min: 204, max: 204 },
      { min: 206, max: 217 },
      { min: 220, max: 222 },
      { min: 229, max: 260 },
      { min: 401, max: 402 },
      { min: 501, max: 502 },
      { min: 701, max: 705 },
    ];
    const selectedRange = ranges[Math.floor(Math.random() * ranges.length)];
    return Math.floor(Math.random() * (selectedRange.max - selectedRange.min + 1)) + selectedRange.min;
  };

  const handleGenerateFile = () => {
    const count = parseInt(lineCount, 10);

    if (isNaN(count) || count <= 0) {
      //setError('Please enter a valid positive number.');
      return;
    }

    //setError('');

    const lines = [];
    for (let i = 0; i < count; i++) {
      let numbers;
      if (fileType === 'type1') {
        numbers = [
          getRandomNumber(0, 8),
          getRandomNumber(0, 0),
          getRandomGroupEventFaults(),
          getRandomGroupEventNodes(),
          getRandomGroupEventFaultsMajor(),
          getRandomGroupEventFaultsMinor(),
          getRandomNumber(0, 0),
        ];
      } else if (fileType === 'type2') {

        numbers = [
          getRandomNumber(0, 8),
          getRandomNumber(0, 0),
          getRandomGroupEventActivities(),
          getRandomNumber(0, 2147483647),
          getRandomNumber(0, 2147483647),
          getRandomNumber(0, 2147483647),
          getRandomNumber(0, 2147483647),
        ];
      }

      lines.push({
        epoch: getRandomEpochTime(),
        numbers: numbers,
      });
    }

    lines.sort((a, b) => b.epoch - a.epoch);

    let content = 'Timestamp;User Level;Group Event;Value1;Value2;Value3;Value4\n';
    lines.forEach(line => {
      const formattedLine = [line.epoch, ...line.numbers].join(';');
      content += formattedLine + ';' + '\n';
    });

    const blob = new Blob([content], { type: 'text/plain' });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileType === 'type1' ? 'demoFaults.log' : 'demoActivities.log';
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleBlur = (event) => {
    event.target.blur();
  };

//##############################################################################
//##############################################################################
//##############################################################################

  return (
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
        <label>Create Demo File</label>
      </div>
{/*##########################################################################*/}

      <div className={styles.inputContainer}>
        <label htmlFor="lineCount">Number of Lines:</label>
        <input
          type="number"
          id="lineCount"
          value={lineCount}
          onChange={(e) => setLineCount(e.target.value)}
          placeholder="Enter number of lines to generate"
          min="1"

          style={{
            width: '800px',
            maxWidth: 'none'
          }}
        />
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="fileType">Select File Type:</label>
        <select
          type="dropList"
          id="fileType"
          value={fileType}
          onChange={(e) => {setFileType(e.target.value); handleBlur(e);}}
          style={{
            width: '800px',
            maxWidth: 'none'
          }}
        >
          <option value="type1">Faults</option>
          <option value="type2">Activities</option>
        </select>
      </div>

      {/*{error && <p className={styles.error}>{error}</p>}*/}

      <div className={styles.generateButton}>
        <button className={styles.generateButton} onClick={handleGenerateFile}>
          Generate File
        </button>
      </div>

    </main>
  );
}