import 'aframe'
import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      zoom: 1,
    }
  }
  componentDidMount() {
    document.querySelector('#scene').addEventListener('mousewheel', (event) => {
      let newZoom = 1;
      const zoomVelocity = 0.1;
      if (event.deltaY > 0) {
        newZoom = this.state.zoom + zoomVelocity;
      }
      if (event.deltaY < 0 && this.state.zoom >= 1) {
        newZoom = this.state.zoom - zoomVelocity;
      }

      if (newZoom < 1) {
        newZoom = 1;
      }

      this.setState({
        zoom: newZoom
      })
    })
  }
  render() {
    return (
      <div className="App">
        <a-scene id="scene">
          <a-assets>
            <img id="360" crossorigin="anonymous"
              src="https://s3-us-west-2.amazonaws.com/rawpanoupload/mlkaufman747%40gmail.com/Helvellyn_Striding_Edge_360_Panorama%2C_Lake_District_-_June_09(1).jpg"/>
          </a-assets>
          <a-sky
            src='#360'
            radius="10"
          />
          <a-camera position="0 5 0" look-controls zoom={this.state.zoom}>
          </a-camera>
        </a-scene>

      </div>
    );
  }
}

export default App;
