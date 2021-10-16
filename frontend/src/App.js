import "./App.css";
import React from "react";
import {Route, Switch} from 'react-router-dom'
//import axios from "axios";
import HomePage from './components/Body/HomePage'

//const routeBack = 'http://localhost:3500'
function App() {
  //search item

  return (
    <div className="App">
    <HomePage />
    </div>
  );
}

export default App;