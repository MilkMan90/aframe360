import 'aframe'
import 'aframe-orbit-controls-component-2'
import './App.css'
import React, { Component } from 'react';

import PanoFrame from './components/PanoFrame'

function generateRandom(min, max) {
  return min + Math.random()*(max+1 - min)
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: Math.random(),
      components: [],
      renders: [],
      renderIndex: 0,
    }
  }
  generateNewObject() {
    var markerEl = document.querySelector('#marker');
    const {x, y, z} = markerEl.object3D.getWorldPosition()
    const newObj = {
      // x: generateRandom(-20, 20),
      // y: generateRandom(-20, 20),
      // z: generateRandom(-2, 10)
      x, y, z
    }
    this.setState({
      components: this.state.components.concat(newObj)
    })
  }
  generateNewRender() {
    var markerEl = document.querySelector('#marker');
    const {x, y, z} = markerEl.object3D.getWorldPosition()
    const newObj = {
      // x: generateRandom(-20, 20),
      // y: generateRandom(-20, 20),
      // z: generateRandom(-2, 5)
      x, y, z
    }
    this.setState({
      renders: this.state.renders.concat(newObj)
    })
  }
  changeRenderColor() {
    this.setState({
      renderIndex: this.state.renderIndex + 1,
    })
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
        <PanoFrame data={this.state.data} components={this.state.components}
        renders={this.state.renders}
        renderIndex={this.state.renderIndex}/>
        <button
          onClick={()=>{this.generateNewObject()}}
          style={{
            position: 'absolute',
            right: '300px',
            top: '10px',
            width: '200px',
            height: '50px',
            zIndex: 9999
          }}
        >
          Add Text
        </button>
        <button
          onClick={()=>{this.generateNewRender()}}
          style={{
            position: 'absolute',
            right: '20px',
            top: '10px',
            width: '200px',
            height: '50px',
            zIndex: 9999
          }}
        >
          Add Renders
        </button>
        <button
          onClick={()=>{this.changeRenderColor()}}
          style={{
            position: 'absolute',
            right: '500px',
            top: '10px',
            width: '200px',
            height: '50px',
            zIndex: 9999
          }}
        >
          Add Renders
        </button>
      </div>
    );
  }
}


export default App;
