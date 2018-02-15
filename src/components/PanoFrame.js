import 'aframe'
import AFRAME from 'aframe'
import 'aframe-orbit-controls-component-2'
// import createComponent from '../aframeComponents/orbitControls';
import 'aframe-cubemap-component'
import 'aframe-look-at-component'
// import 'aframe-gltf-part-component';

import '../App.css'
import React, { Component } from 'react';

import ArrowObj from '../objects/arrow/arrow2.obj'
import ArrowMtl from '../objects/arrow/arrow.mtl'

import MSObj from '../objects/mapspacer/302.obj';
import MSMtl from '../objects/mapspacer/302.mtl';
import MSdae from '../objects/mapspacer/302.dae';


// import pano1 from '../panos/Erdman Hall common room.jpg'
import pano2 from '../panos/FEAST Organic Garden.jpg'
import pano3 from '../panos/The Green Bean.jpg'
import pano4 from '../panos/The Marketplace.jpg'

const THREE = AFRAME.THREE;
//
// GLTF2Loader(THREE)
//
// console.log(typeof THREE.GLTF2Loader)


var LOADING_MODELS = {};
var MODELS = {};

AFRAME.registerComponent('gltf-part', {
  schema: {
    buffer: {default: true},
    part: {type: 'string'},
    src: {type: 'asset'}
  },

  init: function () {
    var el = this.el;
    this.getModel(function (modelPart) {
      if (!modelPart) { return; }
      el.setObject3D('mesh', modelPart)
    });
  },

  /**
   * Fetch, cache, and select from GLTF.
   *
   * @returns {object} Selected subset of model.
   */
  getModel: function (cb) {
    var self = this;

    // Already parsed, grab it.
    if (MODELS[this.data.src]) {
      cb(this.selectFromModel(MODELS[this.data.src]));
      return;
    }

    // Currently loading, wait for it.
    if (LOADING_MODELS[this.data.src]) {
      return LOADING_MODELS[this.data.src].then(function (model) {
        cb(self.selectFromModel(model));
      });
    }

    // Not yet fetching, fetch it.
    LOADING_MODELS[this.data.src] = new Promise(function (resolve) {
      new THREE.GLTFLoader().load(self.data.src, function (gltfModel) {
        var model = gltfModel.scene || gltfModel.scenes[0];
        MODELS[self.data.src] = model;
        delete LOADING_MODELS[self.data.src];
        cb(self.selectFromModel(model));
        resolve(model);
      }, function () { }, console.error);
    });
  },

  /**
   * Search for the part name and look for a mesh.
   */
  selectFromModel: function (model) {
    var mesh;
    var part;

    part = model.getObjectByName(this.data.part);
    if (!part) {
      console.error('[gltf-part] `' + this.data.part + '` not found in model.');
      return;
    }

    mesh = part.getObjectByProperty('type', 'Mesh').clone(true);

    if (this.data.buffer) {
      mesh.geometry = mesh.geometry.toNonIndexed();

      console.log(mesh);

      return mesh;
    }
    mesh.geometry = new THREE.Geometry().fromBufferGeometry(mesh.geometry);
    return mesh;
  }
});


// const pano1 = 'https://s3-us-west-2.amazonaws.com/rawpanoupload/mlkaufman747%40gmail.com/Helvellyn_Striding_Edge_360_Panorama%2C_Lake_District_-_June_09(1).jpg';
// const pano2 = 'https://s3-us-west-2.amazonaws.com/rawpanoupload/dunnc1551%40gmail.com/IMG_2237+2.JPG';
// const pano3 = 'https://s3-us-west-2.amazonaws.com/rawpanoupload/jill.bobrick%40concept3d.com/lake-wanaka-tree-sunrise-panorama.jpg'
// const pano4 = 'https://s3-us-west-2.amazonaws.com/rawpanoupload/mlkaufman747%40gmail.com/TestFusionPano_preview.jpeg'
const pano1 = 'http://res.cloudinary.com/dtaxnqrbq/image/upload/fl_progressive/test2_lhmymh.jpg'

const cube1 = 'https://www.myatlascms.com/assets/1103/panoramas/Occidentaltour/panos/Erdman_Hall_common_room.tiles/pano_b.jpg'
const cube2 = 'https://www.myatlascms.com/assets/1103/panoramas/Occidentaltour/panos/Erdman_Hall_common_room.tiles/pano_d.jpg'
const cube3 = 'https://www.myatlascms.com/assets/1103/panoramas/Occidentaltour/panos/Erdman_Hall_common_room.tiles/pano_r.jpg'
const cube4 = 'https://www.myatlascms.com/assets/1103/panoramas/Occidentaltour/panos/Erdman_Hall_common_room.tiles/pano_l.jpg'
const cube5 = 'https://www.myatlascms.com/assets/1103/panoramas/Occidentaltour/panos/Erdman_Hall_common_room.tiles/pano_u.jpg'
const cube6 = 'https://www.myatlascms.com/assets/1103/panoramas/Occidentaltour/panos/Erdman_Hall_common_room.tiles/pano_f.jpg'


var duration = 3000; /* fade duration in millisecond */
var hidtime = 2000; /* time to stay hidden */
var showtime = 2000; /* time to stay visible */


class PanoFrame extends Component {
  constructor() {
    super();
    this.state = {
      zoom: 1,
      currentPano: "#pano1",
      vr: false,
    }
    this.materialArray = [];
  }
  componentWillReceiveProps(nextProps) {
    this.changeColorOfMeshes(nextProps.renderIndex)
  }
  componentDidMount() {

    // const camera = document.querySelector('#camera')
    // // camera.setAttribute('orbit-controls', 'getZoomScale', function(test) {
    // //   console.log(test)
    // // })
    // console.log(camera.components['orbit-controls'].getZoomScale);
    //
    // camera.components['orbit-controls'].getZoomScale = function(test) {
    //   // return Math.pow(2, this.data.zoomSpeed);
    //   console.log(this.cameraType);
    //   return 5;
    // }
    // console.log(camera.components['orbit-controls'].getZoomScale);
    // // const test = camera.getAttribute('orbit-controls').getZoom
    // // console.log(test);

    // const torchEl = document.querySelector('#torch')
    // console.log(torchEl.object3D);
    // var tex = new THREE.TextureLoader().load('https://s3.us-east-2.amazonaws.com/mlktestbucket/dungeon/dungeon/textures/tile1_diffuse.jpeg');
    //   torchEl.addEventListener('model-loaded', function (e) {
    //   e.detail.model.traverse(function(node) {
    //     if (node.isMesh) node.material.map = tex;
    //   });
    // });

    this.materialArray = [];
    const shipEl = document.querySelector('#shipObj');
    shipEl.addEventListener('model-loaded', (e) => {
      shipEl.object3D.traverse((e) => {
        console.log(e);
        if (e.isMesh) {
          // e.material.color = new THREE.Color('#fff123')
          this.materialArray.push(e);
        }
      });
    });
    const containers = document.querySelector('#cargoObj');
    containers.addEventListener('model-loaded', (e) => {
      containers.object3D.traverse((e) => {
        console.log(e);
        if (e.isMesh) {
          // e.material.color = new THREE.Color('#fff123')
          this.materialArray.push(e);
        }
      });
    });


    const assetEl = document.querySelector('#pano1')
    assetEl.addEventListener('load', function () {
      // Do something with your element.
      console.log('pano 1 loaded');
    });
    const assetEl2 = document.querySelector('#pano2')
    assetEl2.addEventListener('load', function () {
      // Do something with your element.
      console.log('pano 2 loaded');
    });
    const assetEl3 = document.querySelector('#pano3')
    assetEl3.addEventListener('load', function () {
      // Do something with your element.
      console.log('pano 3 loaded');
    });

    this.initializeZoom();
    this.initializeNav();
    this.initializeOnVR();
  }
  initializeOnVR() {
    document.querySelector('#scene').addEventListener('enter-vr', () => {
      this.setState({
        vr: true
      })
    });
    document.querySelector('#scene').addEventListener('exit-vr', () => {
      this.setState({
        vr: false
      })
    });
  }
  initializeZoom() {
    document.querySelector('#scene').addEventListener('mousewheel', (event) => {
      this.changeZoom(event.deltaY, 0.01);
      // let newZoom = 1;
      // const zoomVelocity = 0.1;
      // if (event.deltaY < 0) {
      //   newZoom = this.state.zoom + zoomVelocity;
      // }
      // // if (event.deltaY > 0 && this.state.zoom >= 1) {
      // if (event.deltaY > 0) {
      //   newZoom = this.state.zoom - zoomVelocity;
      // }
      //
      // // if (newZoom < 1) {
      // //   newZoom = 1;
      // // }
      //
      // this.setState({
      //   zoom: newZoom
      // });
    })
    document.querySelector('#scene').addEventListener('wheel', (event) => {
      this.changeZoom(event.deltaY, 0.05);
      // let newZoom = 1;
      // const zoomVelocity = 0.1;
      // if (event.deltaY < 0) {
      //   newZoom = this.state.zoom + zoomVelocity;
      // }
      // // if (event.deltaY > 0 && this.state.zoom >= 1) {
      // if (event.deltaY > 0) {
      //   newZoom = this.state.zoom - zoomVelocity;
      // }
      //
      // // if (newZoom < 1) {
      // //   newZoom = 1;
      // // }
      //
      // this.setState({
      //   zoom: newZoom
      // });
    })
  }
  fadeOut(browserMultiplier) {
  for (var i = 0; i <= 1; i += 0.01) {
      setTimeout(this.setZoom((1 - i), browserMultiplier), i * duration);
      console.log('fade out'+ i);
    }
     setTimeout(this.fadeIn(), (duration + hidtime));
  }
  fadeIn(browserMultiplier) {
    for (var i = 0; i <= 1; i += 0.01) {
      console.log(i);
      setTimeout(this.setZoom(i, browserMultiplier), i * duration);
    }
     setTimeout(this.fadeOut(), (duration + showtime));
  }
  changeZoom(deltaY, browserMultiplier) {
    const camera = document.querySelector('#camera').components.camera.camera;

    // if (deltaY < -50 || deltaY > 50) {
      var fov = camera.fov + deltaY * browserMultiplier;
      camera.fov = THREE.Math.clamp( fov, 10, 75 );
      camera.updateProjectionMatrix();
    // }

    // if ( deltaY > -50 && deltaY < 0){
    //   this.fadeIn(browserMultiplier)
    // }
    // if ( deltaY < 50 && deltaY > 0){
    //   this.fadeIn(browserMultiplier)
    // }

    // else {
    //   var delta = deltaY;
    //   console.log(delta);
    //   if (deltaY > 0) {
    //     while (delta > 0) {
    //       var fov = camera.fov + delta/dampenFactor * browserMultiplier;
    //       camera.fov = THREE.Math.clamp( fov, 10, 75 );
    //       camera.updateProjectionMatrix();
    //       delta = delta - deltaY/dampenFactor;
    //       console.log(delta);
    //     }
    //   } else if (deltaY < 0) {
    //     while (delta < 0) {
    //       var fov = camera.fov + delta/dampenFactor * browserMultiplier;
    //       camera.fov = THREE.Math.clamp( fov, 10, 75 );
    //       camera.updateProjectionMatrix();
    //       delta = delta - (deltaY/dampenFactor);
    //       console.log(delta);
    //     }
    //   }

    // }
  }
  setZoom(delta, browserMultiplier) {
    const camera = document.querySelector('#camera').components.camera.camera;

    var fov = camera.fov + delta * browserMultiplier;
    camera.fov = THREE.Math.clamp( fov, 10, 75 );
    camera.updateProjectionMatrix();
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
        // document.querySelector('.a-canvas.a-grab-cursor').style.cursor = 'pointer'
      })
      arrowElement.addEventListener('mouseleave', (element) => {
        this.setState({
          selectedArrow: null,
        })
        // document.querySelector('.a-canvas.a-grab-cursor').style.cursor = '-webkit-grab'
      })
    }

  }

  renderTextObjects(components) {
    return components.map(component => {
      return <a-text look-at="[camera]"
        value={this.props.data * Math.random()}
        text={`width:20;color:${'#'+Math.floor(Math.random()*16777215).toString(16)};side:double`}
        position={`${component.x} ${component.y} ${component.z}`}
        rotation="-4.011 -126.108 0"></a-text>
    })
  }
  renderObjects(objects) {
    return objects.map(object => {
        return <a-gltf-model src="url(https://s3.us-east-2.amazonaws.com/mlktestbucket/street/scene.gltf)"
        gltf-model="https://s3.us-east-2.amazonaws.com/mlktestbucket/street/scene.gltf"
        position={`${object.x} ${object.y} ${object.z}`}
        rotation="0 -94.25155729902042 0" scale="0.01 0.01 0.01"></a-gltf-model>
    })
  }

  changeColorOfMeshes(index) {
    this.materialArray[index].material.color = new THREE.Color(`rgb(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`)
    console.log(this.materialArray[index]);
  }
  render() {
    const selected = this.state.selectedArrow;

    const textObjects = this.props.components.length > 0 && this.renderTextObjects(this.props.components);
    const renderObjects = this.props.renders.length > 0 && this.renderObjects(this.props.renders);


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
            <a-asset-item id="street1" src="https://s3.us-east-2.amazonaws.com/mlktestbucket/street/scene.gltf" crossorigin="anonymous"></a-asset-item>
            {/* <a-asset-item id="street" src="https://dl.dropboxusercontent.com/s/dvahjq5trg9pysj/evil-skull.gltf"></a-asset-item> */}
            {/* <a-asset-item id="ms-obj" src={MSObj}></a-asset-item>
            <a-asset-item id="ms-mtl" src={MSMtl}></a-asset-item> */}
            {/* <a-asset-item id="ms-dae" src={MSdae}></a-asset-item> */}
            <a-asset-item id="dungeon" src="https://s3.us-east-2.amazonaws.com/mlktestbucket/dungeon/dungeon/scene.gltf" crossorigin="anonymous"></a-asset-item>
            {/* <a-asset-item id="disney" src="https://s3.us-east-2.amazonaws.com/mlktestbucket/DisneySampleModel.gltf" crossorigin="anonymous"></a-asset-item> */}
            {/* <a-asset-item id="ship" src="https://s3.us-east-2.amazonaws.com/mlktestbucket/ship.gltf" crossorigin="anonymous"></a-asset-item> */}
            <a-asset-item id="ship" src="https://s3.us-east-2.amazonaws.com/mlktestbucket/ship/ship1.gltf" crossorigin="anonymous"></a-asset-item>
            <a-asset-item id="cargo" src="https://s3.us-east-2.amazonaws.com/mlktestbucket/ship/cargo1.gltf" crossorigin="anonymous"></a-asset-item>
            {/* <a-asset-item id="ship" src="https://s3.us-east-2.amazonaws.com/mlktestbucket/cargoship/cargoship.gltf" crossorigin="anonymous"></a-asset-item> */}

            <img id="pano1" crossorigin="anonymous" src={pano1}/>
            <img id="pano2" crossorigin="anonymous" src={pano2}/>
            <img id="pano3" crossorigin="anonymous" src={pano3}/>
            <img id="pano4" crossorigin="anonymous" src={pano4}/>
          </a-assets>

          {/* <a-entity cubemap="folder: assets/"></a-entity> */}

          {/* <a-sky
            // src={this.state.currentPano}
            src="https://s3-us-west-2.amazonaws.com/rawpanoupload/ByB8kSRHG.jpg"
            radius="100"
            id="sky"
          /> */}

          {/* <a-entity id="torch" gltf-part="src: #dungeon; part: torch_1_palette_0; buffer: false" position="0 0 -1"></a-entity> */}
          {/* <a-entity id="torch" gltf-part="src: #disney; part: b1_6; buffer: false" position="0 0 -1"></a-entity> */}
          <a-gltf-model id="shipObj" src="#ship"></a-gltf-model>
          <a-gltf-model id="cargoObj" src="#cargo"></a-gltf-model>

          {/* <a-entity gltf-part="src: #ship; part: root; buffer: true" position="0 1 -2"></a-entity>
          <a-entity gltf-part="src: #ship; part: lifeboats; buffer: true" position="0 1 -2"></a-entity>
          <a-entity gltf-part="src: #ship; part: Cargo; buffer: true" position="0 1 -2"></a-entity>
          <a-entity gltf-part="src: #ship; part: Hulll; buffer: true" position="0 1 -2"></a-entity>
          <a-entity gltf-part="src: #ship; part: Tower; buffer: true" position="0 1 -2"></a-entity>
          <a-entity gltf-part="src: #ship; part: water; buffer: true" position="0 1 -2"></a-entity>
          <a-entity gltf-part="src: #ship; part: anchor; buffer: true" position="0 1 -2"></a-entity>
          <a-entity gltf-part="src: #ship; part: cargo decks; buffer: true" position="0 1 -2"></a-entity>
          <a-entity gltf-part="src: #ship; part: Deck; buffer: true" position="0 1 -2"></a-entity>
          <a-entity gltf-part="src: #ship; part: emergency; buffer: true" position="0 1 -2"></a-entity>
          <a-entity gltf-part="src: #ship; part: walkways; buffer: true" position="0 1 -2"></a-entity> */}



           {/* <a-entity gltf-part="src: #dungeon; part: desk" material="color: brown" position="0 1 -2"></a-entity>
           <a-entity gltf-part="src: #dungeon; part: wall1" material="color: white" position="-1 0 -3"></a-entity>
           <a-entity gltf-part="src: #dungeon; part: wall2" material="color: white" position="1 0 -3"></a-entity> */}


          {/* <a-curvedimage src='https://s3-us-west-2.amazonaws.com/xplorertourmedia/panos/ryWzMagwz.jpeg'/> */}

          <a-entity
            id="camera"
            camera
            position="0 3 2"
            wasd-controls-enabled="false"
            look-controls
            orbit-controls="
                      autoRotate: false;
                      target: #target;
                      enableDamping: true;
                      enableZoom: false;
                      dampingFactor: 0.25;
                      rotateSpeed:0.14;
                      minZoom: 2;
                      maxZoom: 2;
                      minDistance: 2;
                      maxDistance: 2;
                      maxPolarAngle: 3.14;
                      autoVRLookCam: false"
              user-height="0">
              <a-entity id="marker" position="0 0 -10"></a-entity>
          </a-entity>

          {textObjects}
          {renderObjects}

          <a-text look-at="[camera]"
            value={this.state.currentPano} text="color:#f2d209;opacity:0.8;width:20;side:double" position="2.674 1.363 -6.948" rotation="0.6302535746439055 -24.350706293059986 0"></a-text>

          {/* <a-text look-at="[camera]" value={this.props.data * Math.random()} text="width:20;color:#f996ee;side:double" position="20.619 -2.895 8.072" rotation="-4.011 -126.108 0"></a-text> */}
          {/* <a-text look-at="[camera]" value={this.props.data * Math.random()}  text="color:#00c6ee;width:20;side:double" position="18.24 -2.895 -4.431" rotation="-12.146705256773451 -75.22935850067708 0"></a-text> */}
          {/* <a-text look-at="[camera]" value={this.props.data * Math.random()}  text="color:#09efa6;width:20;side:double" position="9.157 -2.895 10.378" rotation="-12.719663051904275 -179.04931097838227 0"></a-text> */} */}
              {/* <a-collada-model src="#ms-dae" collada-model="/static/media/302.042c8af9.dae" position="-6.036 -6.435 -10.286" rotation="22.345354010102106 -15.183381570966816 -5.901465289847479" scale="0.774 0.646 0.568"></a-collada-model>           */}
            {/* <a-gltf-model src="#street"></a-gltf-model> */}
            {/* <a-gltf-model src="url(https://s3.us-east-2.amazonaws.com/mlktestbucket/street/scene.gltf)" gltf-model="https://s3.us-east-2.amazonaws.com/mlktestbucket/street/scene.gltf" position="32.377 -5.084 -6.129" rotation="0 -94.25155729902042 0" scale="0.01 0.01 0.01"></a-gltf-model> */} */}
            {/* <a-entity gltf-model="#street1"></a-entity> */}

          <a-entity>
            <a-entity id="target" scale="1 1 1" position="0 1.5 0"></a-entity>
            {/* <a-entity obj-model="obj: #ms-obj; mtl: #ms-mtl;"  scale="0.5 0.5 0.5" position="54.841 -5.266 3" rotation="-55.748793466229095 -89.09493714284301 -31.569974511708363"></a-entity> */}
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
