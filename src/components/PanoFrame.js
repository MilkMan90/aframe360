import 'aframe'
import 'aframe-orbit-controls-component-2'
import 'aframe-cubemap-component'
import '../App.css'
import React, { Component } from 'react';

import ArrowObj from '../objects/arrow/arrow2.obj'
import ArrowMtl from '../objects/arrow/arrow.mtl'

import pano1 from '../panos/Erdman Hall common room.jpg'
import pano2 from '../panos/FEAST Organic Garden.jpg'
import pano3 from '../panos/The Green Bean.jpg'
import pano4 from '../panos/The Marketplace.jpg'

// const pano1 = 'https://s3-us-west-2.amazonaws.com/rawpanoupload/mlkaufman747%40gmail.com/Helvellyn_Striding_Edge_360_Panorama%2C_Lake_District_-_June_09(1).jpg';
// const pano2 = 'https://s3-us-west-2.amazonaws.com/rawpanoupload/dunnc1551%40gmail.com/IMG_2237+2.JPG';
// const pano3 = 'https://s3-us-west-2.amazonaws.com/rawpanoupload/jill.bobrick%40concept3d.com/lake-wanaka-tree-sunrise-panorama.jpg'
// const pano4 = 'https://s3-us-west-2.amazonaws.com/rawpanoupload/mlkaufman747%40gmail.com/TestFusionPano_preview.jpeg'

const cube1 = 'https://www.myatlascms.com/assets/1103/panoramas/Occidentaltour/panos/Erdman_Hall_common_room.tiles/pano_b.jpg'
const cube2 = 'https://www.myatlascms.com/assets/1103/panoramas/Occidentaltour/panos/Erdman_Hall_common_room.tiles/pano_d.jpg'
const cube3 = 'https://www.myatlascms.com/assets/1103/panoramas/Occidentaltour/panos/Erdman_Hall_common_room.tiles/pano_r.jpg'
const cube4 = 'https://www.myatlascms.com/assets/1103/panoramas/Occidentaltour/panos/Erdman_Hall_common_room.tiles/pano_l.jpg'
const cube5 = 'https://www.myatlascms.com/assets/1103/panoramas/Occidentaltour/panos/Erdman_Hall_common_room.tiles/pano_u.jpg'
const cube6 = 'https://www.myatlascms.com/assets/1103/panoramas/Occidentaltour/panos/Erdman_Hall_common_room.tiles/pano_f.jpg'

class PanoFrame extends Component {
  constructor() {
    super();
    this.state = {
      zoom: 1,
      currentPano: "#pano1",
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
        document.querySelector('.a-canvas.a-grab-cursor').style.cursor = 'pointer'
      })
      arrowElement.addEventListener('mouseleave', (element) => {
        this.setState({
          selectedArrow: null,
        })
        document.querySelector('.a-canvas.a-grab-cursor').style.cursor = '-webkit-grab'
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

          {/* <a-entity cubemap="folder: assets/"></a-entity> */}

          <a-sky
            src={this.state.currentPano}
            radius="100"
          />

          <a-camera
            position="0 2 2"
            orbit-controls="
                autoRotate: false;
                target: #target;
                enableDamping: true;
                dampingFactor: 0.25;
                rotateSpeed:0.14;
                minDistance: 2;
                maxDistance: 2;
                maxPolarAngle: 3.14;"
                zoom={this.state.zoom}>
          </a-camera>
          <a-entity>
            <a-entity id="target" scale="1 1 1" position="0 3 0"></a-entity>
            <a-entity class="arrow" id="arrow1" obj-model="obj: #arrow-obj;"
              material={`color: ${selected === 'arrow1' ? 'springgreen' : 'lightgray'}`}
              position="1.5 0.446 -1.5"
              rotation="0 45 180"  scale="3 3 3"></a-entity>
            <a-entity class="arrow" id="arrow2"
              obj-model="obj: #arrow-obj;"
              material={`color: ${selected === 'arrow2' ? 'springgreen' : 'lightgray'}`}
              position="-1.5 0.446 1.5"
              rotation="0 -135 180" scale="3 3 3"></a-entity>
            <a-entity class="arrow" id="arrow3" obj-model="obj: #arrow-obj;"
              material={`color: ${selected === 'arrow3' ? 'springgreen' : 'lightgray'}`} position="-1.5 0.446 -1.5" rotation="0 135 180" scale="3 3 3"></a-entity>
            <a-entity class="arrow" id="arrow4" obj-model="obj: #arrow-obj;"
              material={`color: ${selected === 'arrow4' ? 'springgreen' : 'lightgray'}`} position="1.5 0.446 1.5" rotation="0 -45 180" scale="3 3 3"></a-entity>
          </a-entity>
        </a-scene>
      </div>
    );
  }
}


export default PanoFrame;
