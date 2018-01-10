import 'aframe'
import 'aframe-orbit-controls-component-2'
import './App.css'
import React, { Component } from 'react';

import PanoFrame from './components/PanoFrame'

class App extends Component {
  constructor() {
    super();
    this.state = {
    }
  }
  render() {
    return (
      <div
        className="App"
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
        }}>
        <PanoFrame />
      </div>
    );
  }
}


export default App;
