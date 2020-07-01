import React from 'react';
import logo from './logo.svg';

import './App.css';
import {Route, Redirect, Router} from 'react-router-dom'

import UploadImage from './Components/UploadImage'
import Allimages from './Components/Allimages'
import Editing from './Components/Editing'

function App() {
  return (
    <div className="App">
        <Route path="/" exact component={UploadImage}/>
        <Route path="/allimages" component={Allimages}/>
        <Route path="/review/:id" render={(props) => <Editing {...props}/>}/>
    </div>
  );
}

export default App;
