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
  const [filterText, setFilterText] = useState("");
  const [column0Values, setColumn0Values] = useState({});

  const handleBlur = (event) => {
    event.target.blur();
  };

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  // Generate table data
  const generateTableData = () => {
    const data = [];
    for (let i = 1; i <= 1500; i++) {
      const row = {
        id: i,
        number: i,
        ...Array(11).fill('').reduce((acc, _, index) => {
          acc[`col${index + 3}`] = '';
          return acc;
        }, {})
      };
      data.push(row);
    }
    return data;
  };


  const [tableValues] = useState({});

  const tableData = generateTableData();

//##############################################################################
  const loadPARFile = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result;
      const lines = content.split('\n');
      const parsedData = lines.map(line => line.split(','));

      updateTable(parsedData);
    };

    reader.readAsText(file);
  };

  const updateTable = (newData) => {
    const table = document.getElementById('PARTableId');
    const rows = Array.from(table.rows).slice(1);

    newData.forEach(data => {
      const match = rows.find(row => row.cells[1].innerText == data[0]);
      if (match) {
        for (let i = 2; i < Math.min(match.cells.length, 12); i++) {
          match.cells[i].innerText = data[i - 1];
        }
      }
    });
  };
//##############################################################################

    const loadDecodeFile = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
    
      reader.onload = (e) => {
        const content = e.target.result;
        const lines = content.split('\n');
        const headers = lines[0].split(';'); // Assuming the first line contains the headers separated by ;
        const column1Data = lines.slice(1).map(line => line.split(';')[0]); // Extract column 1 data
    
        updateTableHeaders(headers);
        updateTableColumn1(column1Data);
      };
    
      reader.readAsText(file);
    };

    const updateTableHeaders = (headers) => {
      const table = document.getElementById('PARTableId');
      const headerRow = table.querySelector('thead tr');
    
      headers.forEach((header, index) => {
        if (index < headerRow.cells.length) {
          headerRow.cells[index].innerText = header;
        }
      });
    };
    
    const updateTableColumn1 = (column1Data) => {
      const table = document.getElementById('PARTableId');
      const rows = Array.from(table.rows).slice(1);
      const newValues = {};
      
      column1Data.forEach((data, index) => {
        if (index < rows.length) {
          rows[index].cells[0].innerText = data;
          newValues[rows[index].cells[1].innerText] = data;
        }
      });
      setColumn0Values(newValues);
    };

  const filteredTableData = tableData.filter(row => {
    if (!filterText) return true; // Show all rows when filter is empty
    const col0Value = column0Values[row.number] || '';
    return col0Value.toString().toLowerCase().includes(filterText.toLowerCase());
  });

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
          /*onClick={(e) => {
              handleBlur(e);
          }}*/>
          <div>
            <label>Filter by Column 1:
              </label>
          </div>
          <div>
            <input
            type="text"
            value={filterText}
            onChange={(e) => {
              handleFilterChange(e);
              //handleBlur(e);
            }}
            style={{
              width: '800px',
              maxWidth: 'none',
            }}
            />
          </div>
        </div>
{/*##########################################################################*/}




<table id="PARTableId" style={{ borderCollapse: 'collapse', margin: '20px 0' }}>
  <thead>
    <tr>
      <th style={{ border: '1px solid #ddd', padding: '4px' }}>1</th>
      <th style={{ border: '1px solid #ddd', padding: '4px' }}>2</th>
      {Array(11).fill(0).map((_, index) => (
        <th key={index} style={{ border: '1px solid #ddd', padding: '4px' }}>
          {index + 3}
        </th>
      ))}
    </tr>
  </thead>
  <tbody>
    {filteredTableData.map((row) => (
      <tr key={row.id}>
        <td style={{ border: '1px solid #ddd', padding: '4px' }}></td>
        <td style={{ border: '1px solid #ddd', padding: '4px' }}>{row.number}</td>
        {Array(11).fill(0).map((_, index) => (
          <td key={index} style={{ border: '1px solid #ddd', padding: '4px' }}>
            {tableValues[`${row.id}-${index}`] || ''}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
</table>











{/*##########################################################################*/}
      </main>
    </div>
  );
}