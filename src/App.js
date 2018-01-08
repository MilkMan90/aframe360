import 'aframe'
import 'aframe-orbit-controls-component-2'

import React, { Component } from 'react';

import ArrowObj from './objects/arrow/arrow.obj'
import ArrowMtl from './objects/arrow/arrow.mtl'


const pano1 = 'https://s3-us-west-2.amazonaws.com/rawpanoupload/mlkaufman747%40gmail.com/Helvellyn_Striding_Edge_360_Panorama%2C_Lake_District_-_June_09(1).jpg';
const pano2 = 'https://s3-us-west-2.amazonaws.com/rawpanoupload/dunnc1551%40gmail.com/IMG_2237+2.JPG';
const pano3 = 'https://s3-us-west-2.amazonaws.com/rawpanoupload/jill.bobrick%40concept3d.com/lake-wanaka-tree-sunrise-panorama.jpg'
const pano4 = 'https://s3-us-west-2.amazonaws.com/rawpanoupload/mlkaufman747%40gmail.com/TestFusionPano_preview.jpeg'

class App extends Component {
  constructor() {
    super();
    this.state = {
      zoom: 1,
      currentPano: "#pano4",
    }
  }
  componentDidMount() {
    this.initializeZoom();
    this.initializeNav();
  }
  initializeZoom() {
    document.querySelector('#scene').addEventListener('mousewheel', (event) => {
      let newZoom = 1;
      const zoomVelocity = 0.1;
      if (event.deltaY < 0) {
        newZoom = this.state.zoom + zoomVelocity;
      }
      // if (event.deltaY > 0 && this.state.zoom >= 1) {
      if (event.deltaY > 0) {
        newZoom = this.state.zoom - zoomVelocity;
      }

      // if (newZoom < 1) {
      //   newZoom = 1;
      // }

      this.setState({
        zoom: newZoom
      });
    })
  }
  initializeNav() {
    document.querySelector('#arrow1').addEventListener('click', () => {
      this.setState({
        currentPano: "#pano1",
      })
    })
    document.querySelector('#arrow2').addEventListener('click', () => {
      this.setState({
        currentPano: "#pano2",
      })
    })
    document.querySelector('#arrow3').addEventListener('click', () => {
      this.setState({
        currentPano: "#pano3",
      })
    })
    document.querySelector('#arrow4').addEventListener('click', () => {
      this.setState({
        currentPano: "#pano4",
      })
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
        <a-scene id="scene" cursor="rayOrigin: mouse">
          <a-assets>
            <a-asset-item id="arrow-obj" src={ArrowObj}></a-asset-item>
            <a-asset-item id="arrow-mtl" src={ArrowMtl}></a-asset-item>
            <img id="pano1" crossorigin="anonymous" src={pano1}/>
            <img id="pano2" crossorigin="anonymous" src={pano2}/>
            <img id="pano3" crossorigin="anonymous" src={pano3}/>
            <img id="pano4" crossorigin="anonymous" src={pano4}/>
          </a-assets>
          <a-sky
            src={this.state.currentPano}
            radius="100"
          />
          <a-camera
            position="0 0 5"
            orbit-controls="
                autoRotate: false;
                target: #target;
                enableDamping: true;
                dampingFactor: 0.25;
                rotateSpeed:0.14;
                minDistance: 5;
                maxDistance: 10;"
                zoom={this.state.zoom}>
            {/* <a-entity geometry="primitive: plane; height: 0.2; width: 0.2" position="0 0 -1"
              material="color: gray; opacity: 0.5"></a-entity> */}
          </a-camera>
          <a-entity>
            <a-entity id="target" scale="1 1 1" position="0 0 0"></a-entity>
            {/* <a-entity id="arrow" obj-model="obj: #arrow-obj; mtl: #arrow-mtl"></a-entity> */}
            <a-entity id="arrow1" obj-model="obj: #arrow-obj; mtl: #arrow-mtl" position="2.304 0.446 -1.531" rotation="81.87566892419464 84.16750010471793 -139.62981467338162" scale="3 3 3"></a-entity>
            <a-entity id="arrow2" obj-model="obj: #arrow-obj; mtl: #arrow-mtl" position="-2.304 0.446 2.767" rotation="81.87566892419464 -85.88637349011042 -139.62981467338162"scale="3 3 3"></a-entity>
            <a-entity id="arrow3" obj-model="obj: #arrow-obj; mtl: #arrow-mtl" position="-2 0.446 -2" rotation="81.87566892419464 -180 -139.62981467338162"scale="3 3 3"></a-entity>
            <a-entity id="arrow4" obj-model="obj: #arrow-obj; mtl: #arrow-mtl" position="2 0.446 2" rotation="81.87566892419464 0 -139.62981467338162"scale="3 3 3"></a-entity>
          </a-entity>
        </a-scene>
      </div>
    );
  }
}


export default App;
