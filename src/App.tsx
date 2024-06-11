import React from 'react';
import './App.css';
import ResourceApiMock from "./api/resources/api/ResourceApiMock";
import ResourcesApiAxios from "./api/resources/api/ResourcesApiAxios";




function App() {

  return (
    <div className="App">
    <ResourceApiMock></ResourceApiMock>
      <p>________________</p>
      <ResourcesApiAxios></ResourcesApiAxios>


    </div>
  );
}

export default App;
