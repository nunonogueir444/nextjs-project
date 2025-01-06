"use client";

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import styles from './page.module.css';

const LoadingMessage = () => (
  <div className={styles.floatingText}>
    <div className="floatingText">Loading file, please wait...</div>
  </div>
);

export default function Activities() {
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

  const column4Values = [
'Confirm Button Is Pressed',
'Download PAR From The Controllers',
'Drivers Presence Changed',
'Export Backup Files',
'Export Logs',
'Export Parameters',
'Export Text Lists',
'First Service Interval Is Changed',
'First Service Reset',
'Full Service Reset',
'Hourmeters Mismatch Popup Pump',
'Hourmeters Mismatch Popup Screen',
'Hourmeters Mismatch Sync Screen',
'Import New Parameters',
'Load PAR Defaults',
'Load PAR Factory',
'MOCAS_HI_LEVEL_FAIL',
'MOCAS_HI_LEVEL_SUCCESS',
'MOCAS_HOURMETER_FAIL',
'MOCAS_HOURMETER_SUCCESS',
'MOCAS_OTHER_MODULE_FAIL',
'MOCAS_OTHER_MODULE_SUCCESS',
'OS Screen Version',
'Parameter Value Change',
'Parameter Value Change When Download PAR From The Controllers',
'PLC App Version',
'PLC RTS Version',
'Pre-Check Done',
'Pump App Version',
'Pump HW Info',
'Pump OS/Profile Version',
'Pump VCL App Version',
'Read New Text List',
'Save Current PAR To Defaults',
'Screen Version',
'SFL HW Info',
'SFL OS/Profile Versions',
'SRL HW Info',
'SRL HW Info',
'SRL OS/Profile Versions',
'SRL OS/Profile Versions',
'SRR HW Info',
'SRR OS/Profile Versions',
'Standard Service Interval Is Changed',
'Standard Service Interval Is Changed',
'Standard Service Reset',
'TFL App Version',
'TFL HW Info',
'TFL OS/Profile Version',
'TFL VCL App Version',
'TFR App Version',
'TFR HW Info',
'TFR OS/Profile Version',
'TFR VCL App Version',
'Time/Date Updated',
'TRL App Version',
'TRL HW Info',
'TRL OS/Profile Version',
'TRL VCL App Version',
'TRR App Version',
'TRR HW Info',
'TRR OS/Profile Version',
'TRR VCL App Version',
'Upload PAR To The Controllers',
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
    setFilters(prevFilters => ({
      ...prevFilters,
      [column]: value
    }));
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
          if (valueIndex === 3) {
            if (trimmedValue === '101') return 'First Service Reset';
            if (trimmedValue === '102') return 'Standard Service Reset';
            if (trimmedValue === '103') return 'Full Service Reset';
            if (trimmedValue === '104') return 'First Service Interval Is Changed';
            if (trimmedValue === '105') return 'Standard Service Interval Is Changed';
            if (trimmedValue === '106') return 'Full Service Interval Is Changed';
            if (trimmedValue === '107') return 'Confirm Button Is Pressed';
            if (trimmedValue === '204') return 'Time/Date Updated';
            if (trimmedValue === '206') return 'Export Logs';
            if (trimmedValue === '207') return 'Import New Parameters';
            if (trimmedValue === '208') return 'Export Parameters';
            if (trimmedValue === '209') return 'MOCAS HI LEVEL SUCCESS';
            if (trimmedValue === '210') return 'MOCAS HI LEVEL FAIL';
            if (trimmedValue === '211') return 'MOCAS HOURMETER SUCCESS';
            if (trimmedValue === '212') return 'MOCAS HOURMETER FAIL';
            if (trimmedValue === '213') return 'MOCAS OTHER MODULE SUCCESS';
            if (trimmedValue === '214') return 'MOCAS OTHER MODULE FAIL';
            if (trimmedValue === '215') return 'Read New Text List';
            if (trimmedValue === '216') return 'Export Text Lists';
            if (trimmedValue === '217') return 'Export Backup Files';
            if (trimmedValue === '220') return 'Hourmeters Mismatch Popup Screen';
            if (trimmedValue === '221') return 'Hourmeters Mismatch Popup Pump';
            if (trimmedValue === '222') return 'Hourmeters Mismatch Sync Screen';
            if (trimmedValue === '229') return 'OS Screen Version';
            if (trimmedValue === '230') return 'PLC App Version';
            if (trimmedValue === '231') return 'PLC RTS Version';
            if (trimmedValue === '232') return 'Screen Version';
            if (trimmedValue === '233') return 'Pump VCL App Version';
            if (trimmedValue === '234') return 'Pump OS/Profile Version';
            if (trimmedValue === '235') return 'Pump App Version';
            if (trimmedValue === '236') return 'TRR VCL App Version';
            if (trimmedValue === '237') return 'TRR OS/Profile Version';
            if (trimmedValue === '238') return 'TRR App Version';
            if (trimmedValue === '239') return 'TRL VCL App Version';
            if (trimmedValue === '240') return 'TRL OS/Profile Version';
            if (trimmedValue === '241') return 'TRL App Version';
            if (trimmedValue === '242') return 'TFR VCL App Version';
            if (trimmedValue === '243') return 'TFR OS/Profile Version';
            if (trimmedValue === '244') return 'TFR App Version';
            if (trimmedValue === '245') return 'TFL VCL App Version';
            if (trimmedValue === '246') return 'TFL OS/Profile Version';
            if (trimmedValue === '247') return 'TFL App Version';
            if (trimmedValue === '248') return 'SRR OS/Profile Versions';
            if (trimmedValue === '249') return 'SRL OS/Profile Versions';
            if (trimmedValue === '250') return 'SFR OS/Profile Versions';
            if (trimmedValue === '251') return 'SFL OS/Profile Versions';
            if (trimmedValue === '252') return 'Pump HW Info';
            if (trimmedValue === '253') return 'TRR HW Info';
            if (trimmedValue === '254') return 'TRL HW Info';
            if (trimmedValue === '255') return 'TFR HW Info';
            if (trimmedValue === '256') return 'TFL HW Info';
            if (trimmedValue === '257') return 'SRR HW Info';
            if (trimmedValue === '258') return 'SRL HW Info';
            if (trimmedValue === '259') return 'SFR HW Info';
            if (trimmedValue === '260') return 'SFL HW Info';
            if (trimmedValue === '401') return 'Pre-Check Done';
            if (trimmedValue === '402') return 'Drivers Presence Changed';
            if (trimmedValue === '501') return 'Parameter Value Change';
            if (trimmedValue === '502') return 'Parameter Value Change When Download PAR From The Controllers';
            if (trimmedValue === '701') return 'Download PAR From The Controllers';
            if (trimmedValue === '702') return 'Upload PAR To The Controllers';
            if (trimmedValue === '703') return 'Save Current PAR To Defaults';
            if (trimmedValue === '704') return 'Load PAR Defaults';
            if (trimmedValue === '705') return 'Load PAR Factory';
          }
          return value;
        });

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

    return (
      isWithinDateRange &&
      (filters.column2 === '' || row[1].includes(filters.column2)) &&
      (filters.column4 === '' || row[3].includes(filters.column4))
    );
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
          <label>Activity Logs</label>
        </div>
{/*##########################################################################*/}
        <div className={styles.inputContainer}
          onClick={(e) => {
              handleBlur(e);
          }}>
          <div>
            <label>Load Activities File:
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
              maxWidth: 'none',
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
          <div><label>Activities</label></div>
        </div>
{/*##########################################################################*/}
        <div>
        <div className={styles.dateFilters}>
          <div>
            <select
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
              value={filters.column4}
              onChange={(e) => {
                handleFilterChange('column4', e.target.value);
                handleBlur(e);
              }}
            >
              <option value="">All Activities</option>
              {column4Values.map((value, index) => (
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
                      <th>Activity Description</th>
                      <th>Value 1</th>
                      <th>Value 2</th>
                      <th>Value 3</th>
                      <th>Value 4</th>
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