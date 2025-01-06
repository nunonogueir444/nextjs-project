"use client";

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import styles from '../page.module.css';
//##############################################################################
//##############################################################################
//##############################################################################
export default function EditPAR() {
  const router = useRouter();
  const pathname = usePathname();
  const [tableHeaders, setTableHeaders] = useState(Array(13).fill(''));
  const [firstColumnData, setFirstColumnData] = useState(Array(1500).fill(''));
  const [secondColumnData, setSecondColumnData] = useState(Array(1500).fill(''));
  const [filterText, setFilterText] = useState('');
  const [tableData, setTableData] = useState(Array(1500).fill(Array(11).fill('')));
  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredCol, setHoveredCol] = useState(null);
//##############################################################################
  const handleBlur = (event) => {
    event.target.blur();
  };
//##############################################################################
  const loadDecodeFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        const lines = content.split('\n');

        const headers = lines[0].split(';');
        setTableHeaders(headers.slice(0, 13).map(h => h.trim()));

        const columnData2 = lines.slice(1).map(line => {
          const values = line.split(';');
          return values[0] || '';
        });
        const columnData1 = lines.slice(1).map(line => {
          const values = line.split(';');
          return values[1] || '';
        });
        setFirstColumnData(columnData1);
        setSecondColumnData(columnData2);
      };
      reader.readAsText(file);
    }
  };
//##############################################################################
  const loadPARFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        const lines = content.split('\n');

        const newTableData = Array(1500).fill().map(() => Array(11).fill(''));

        lines.forEach(line => {
          if (line.trim()) {
            const values = line.split(',').map(v => v.trim());
            const firstValue = values[0];

            const rowIndex = secondColumnData.findIndex(value => value === firstValue);

            if (rowIndex !== -1) {
              for (let i = 0; i < 10; i++) {
                newTableData[rowIndex][i] = values[i + 1] || '';
              }
            }
          }
        });

        setTableData(newTableData);
      };
      reader.readAsText(file);
    }
  };
//##############################################################################
  const handleEdit = (rowIndex, colIndex, value) => {
    const newTableData = tableData.map((row, i) => {
      if (i === rowIndex) {
        const newRow = [...row];
        newRow[colIndex] = value;
        return newRow;
      }
      return row;
    });
    setTableData(newTableData);
  };
//##############################################################################
  const handleSave = () => {
    let content = '';
    for (let i = 0; i < 1500; i++) {
      if (secondColumnData[i]) {
        content += secondColumnData[i];
        tableData[i].forEach(value => {
          content += ',' + (value || '0');
        });
        content += '\n';
      }
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'output_PAR.clp';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };
//##############################################################################
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };
//##############################################################################
  const handleFocus = (e) => {
    e.target.select();
  };
//##############################################################################
  const generateTableRows = () => {
    const rows = [];
    for (let i = 0; i < 1500; i++) {
      if (firstColumnData[i].toLowerCase().includes(filterText.toLowerCase())) {
        rows.push(
          <tr
            key={i}
            onMouseEnter={() => setHoveredRow(i)}
            onMouseLeave={() => setHoveredRow(null)}
            style={{
              backgroundColor: hoveredRow === i ? '#313131' : 'transparent'
            }}
          >
            <td style={{ textAlign: 'left', paddingLeft: '10px' }}>{firstColumnData[i]}</td>
            <td style={{ textAlign: 'left', paddingLeft: '10px' }}>{secondColumnData[i]}</td>
            {tableData[i].map((value, colIndex) => (
              <td
                key={colIndex}
                onMouseEnter={() => colIndex < 11 ? setHoveredCol(colIndex) : null}
                onMouseLeave={() => colIndex < 11 ? setHoveredCol(null) : null}
                style={{
                  backgroundColor:
                    colIndex < 10 ? (
                      hoveredRow === i && hoveredCol === colIndex ? '#313131' :
                      hoveredRow === i ? '#313131' :
                      (hoveredCol === colIndex && i <= hoveredRow) ? '#313131' :
                      'transparent'
                    ) : 'transparent',
                  textAlign: 'center'
                }}
              >
                {colIndex < 10 ? (
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleEdit(i, colIndex, e.target.value)}
                    onKeyPress={handleKeyPress}
                    onFocus={handleFocus}
                    style={{
                      width: '50px',
                      border: 'none',
                      background: 'transparent',
                      textAlign: 'center',
                      color: 'inherit',
                      display: 'block',
                      margin: '0 auto',
                    }}
                  />
                ) : (
                  <span style={{ textAlign: 'center', display: 'block' }}>
                    {value}
                  </span>
                )}
              </td>
            ))}
          </tr>
        );
      }
    }
    return rows;
  };
//##############################################################################
  const handleReset = () => {
    setFilterText('');
  };
//##############################################################################
//##############################################################################
//##############################################################################
    return (
      <div>
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
          <label>Edit PAR</label>
        </div>
{/*##########################################################################*/}
      <div className={styles.inputContainer}
          onClick={(e) => {
              handleBlur(e);
          }}>
          <div>
            <label>Load Decode File:
              </label>
          </div>
          <div>
            <input
            type="file"
            accept=".dec"
            onChange={(e) => {
              loadDecodeFile(e);
              handleBlur(e);
            }}
            style={{
              width: '800px',
              maxWidth: 'none',
            }}
            />
          </div>
        </div>
        <div className={styles.inputContainer}
          onClick={(e) => {
              handleBlur(e);
          }}>
          <div>
            <label>Load PAR File:
              </label>
          </div>
          <div>
            <input
            type="file"
            accept=".clp"
            onChange={(e) => {
              loadPARFile(e);
              handleBlur(e);
            }}
            style={{
              width: '800px',
              maxWidth: 'none',
            }}
            />
          </div>
        </div>

        <div className={styles.editPARfilter}>
          <label>Filter PAR name:</label>
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
          <button onClick={handleReset} label="reset">
            Reset
          </button>

          <button onClick={handleSave} label="save">
            Save PAR File
          </button>
        </div>
{/*##########################################################################*/}
        <div className={styles.tableContainer}>
          <table className={`${styles.table} ${styles.customTable}`}>
            <thead>
              <tr>
                {tableHeaders.map((header, index) => (
                  <th key={index} style={{ backgroundColor: '#166938' }}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {generateTableRows()}
            </tbody>
          </table>
        </div>
{/*##########################################################################*/}
      </main>
    </div>
  );
}