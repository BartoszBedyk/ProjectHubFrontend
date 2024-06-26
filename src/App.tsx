import React from 'react';
import './App.css';
import ResponsiveAppBar from "./components/AppBar/AppBar";
import {RouterProvider} from "react-router-dom";
import {router} from "./router/router";

function App() {
  return (
      <RouterProvider router={router} />
  );
}

export default App;
