import React from 'react';
import XLSX from 'xlsx';

const workbook = XLSX.readFile('flashcards.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet);
const parsedData = JSON.stringify(data);

function App() {
  console.log(parsedData);

  return (
    <div className="container">
      <h1>フラッシュカード</h1>
    </div>
  );
}

export default App;
