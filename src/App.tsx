import React from 'react';
import logo from './logo.svg';
import './App.css';
import CustomTable, {ColumnDefinition, RowData} from "./components/table/CustomTable";

const columns2: ColumnDefinition[] = [
    { id: 'id', label: 'Id', type: 'NUMBER', operator: 'EQUALS'},
    { id: 'imie', label: 'Imię', type: 'TEXT', operator: 'LIKE'},
    { id: 'nazwisko', label: 'Nazwisko', type: 'TEXT', operator: 'LIKE'},
    { id: 'dataUrodzenia', label: 'Data urodzenia', type: 'DATE'},
];

const rows: RowData[] = [
    { id: '1', imie: "Kamil", nazwisko: "Smolarek", dataUrodzenia: "2001-01-26T00:00:00Z" },
    { id: '2', imie: "Antek", nazwisko: "Lewandowski", dataUrodzenia: "2003-01-27T00:00:00Z" },
    { id: '3', imie: "Piotr", nazwisko: "Jarosz", dataUrodzenia: "2007-01-26T00:00:00Z" },
    { id: '4', imie: "Janusz", nazwisko: "Nowak", dataUrodzenia: "1997-01-26T00:00:00Z" },
    { id: '5', imie: "Michał", nazwisko: "Smolarek", dataUrodzenia: "2000-01-26T00:00:00Z" },
    { id: '6', imie: "Agnieszka", nazwisko: "Smolarek", dataUrodzenia: "1978-01-26T00:00:00Z" },
    { id: '7', imie: "Damian", nazwisko: "Nowak", dataUrodzenia: "1988-01-26T00:00:00Z" },
    { id: '8', imie: "Kacper", nazwisko: "Smolarek", dataUrodzenia: "1999-01-26T00:00:00Z" },
    { id: '9', imie: "Konrad", nazwisko: "Smolarek", dataUrodzenia: "2002-01-26T00:00:00Z" },
    { id: '10', imie: "Paweł", nazwisko: "Januszewski", dataUrodzenia: "1998-01-26T00:00:00Z" },
    { id: '11', imie: "Kamil", nazwisko: "Smolarek", dataUrodzenia: "2001-01-26T00:00:00Z" },
];

function App() {
    return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
        <CustomTable columns={columns2} rows={rows} title = 'Pracownicy'/>
    </div>
  );
}

export default App;
