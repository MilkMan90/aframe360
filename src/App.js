import 'aframe'
import 'aframe-orbit-controls-component-2'
import './App.css'
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

    const allArrows = document.getElementsByClassName('arrow')
    const length = allArrows.length;
    for(let i = 0; i < length; i++){
      const arrowElement = document.getElementById(allArrows[i].id);
      arrowElement.addEventListener('mouseenter', (element) => {
        this.setState({
          selectedArrow: element.target.id,
        })
      })
      arrowElement.addEventListener('mouseleave', (element) => {
        this.setState({
          selectedArrow: null,
        })
      })
    }
  }
  render() {
    const selected = this.state.selectedArrow;
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
            position="0 15 5"
            orbit-controls="
                autoRotate: false;
                target: #target;
                enableDamping: true;
                dampingFactor: 0.25;
                rotateSpeed:0.14;
                minDistance: 5;
                maxDistance: 10;
                maxPolarAngle: 1.5707;"
                zoom={this.state.zoom}>
            {/* <a-entity geometry="primitive: plane; height: 0.2; width: 0.2" position="0 0 -1"
              material="color: gray; opacity: 0.5"></a-entity> */}
          </a-camera>
          <a-entity>
            <a-entity id="target" scale="1 1 1" position="0 2 0"></a-entity>
            {/* <a-entity id="arrow" obj-model="obj: #arrow-obj; mtl: #arrow-mtl"></a-entity> */}
            {/* <a-entity class="arrow" id="arrow1" obj-model="obj: #arrow-obj; mtl: #arrow-mtl" color="#6173F4" position="1 0.446 -1" rotation="90 90 -145"  scale="3 3 3"></a-entity> */}
            <a-entity class="arrow" id="arrow1" obj-model="obj: #arrow-obj;"
              material={`color: ${selected === 'arrow1' ? 'green' : 'gray'}`}
              position="1 0.446 -1" rotation="90 90 -145"  scale="3 3 3"></a-entity>
            <a-entity class="arrow" id="arrow2"
              obj-model="obj: #arrow-obj;"
              material={`color: ${selected === 'arrow2' ? 'green' : 'gray'}`}
              position="-1 0.446 1" rotation="90 -90 -145" scale="3 3 3"></a-entity>
            <a-entity class="arrow" id="arrow3" obj-model="obj: #arrow-obj;"
              material={`color: ${selected === 'arrow3' ? 'green' : 'gray'}`} position="-1 0.446 -1" rotation="90 -180 -145" scale="3 3 3"></a-entity>
            <a-entity class="arrow" id="arrow4" obj-model="obj: #arrow-obj;"
              material={`color: ${selected === 'arrow4' ? 'green' : 'gray'}`} position="1 0.446 1" rotation="90 0 -145" scale="3 3 3"></a-entity>
          </a-entity>
        </a-scene>
      </div>
    );
  }
}


export default App;
