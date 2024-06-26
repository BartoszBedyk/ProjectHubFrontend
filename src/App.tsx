import React from 'react';
import './App.css';
import ResponsiveAppBar from "./components/AppBar/AppBar";
import CustomTable, {ColumnDefinition, RowData} from "./components/table/CustomTable";
import {Box} from "@mui/material";

const columns2: ColumnDefinition[] = [
  { id: 'id', label: 'Id', type: 'NUMBER', operator: 'EQUALS'},
  { id: 'imie', label: 'Imię', type: 'TEXT', operator: 'EQUALS'},
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
      <Box className="App" sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <ResponsiveAppBar />
        <Box sx={{ flexGrow: 1, marginLeft: 32, marginTop: 6 }}>
          <CustomTable columns={columns2} rows={rows} title={'Pracownicy'}/>
        </Box>
      </Box>
  );
}

export default App;
