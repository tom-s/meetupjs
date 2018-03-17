import React, { Component } from 'react'
import { Entity, Scene } from 'aframe-react'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoaded: false
    }
  }
  render = () => {
    return (
      <a-scene embedded arjs='trackingMethod: best;debugUIEnabled: false;'>
      {/*
      <a-assets>
        <a-asset-item id="rocket-model" src="./assets/models/rocket/scene.gltf"></a-asset-item>
       <!-- <video id="moon-video" autoplay loop="true" src="./assets/videos/moon.mp4"></video> -->
      </a-assets> */}

      <a-marker>
        <a-entity scale="0.03 0.03 0.03">
          <a-cylinder  height = "6" radius = "0.9" position="-1 0 0" booster-on></a-cylinder>
          <a-cylinder  height = "6" radius = "0.9" position = "1 0 0" booster-on></a-cylinder>
          <a-entity arrow  position = "0.1 0 0" length = "0" acceleration-vector></a-entity>
          <a-entity arrow  position = "-0.1 0 0" length = "0" speed-vector></a-entity>
        </a-entity>

        {/*
        <a-entity look-at="[camera]" position="-0.5 0.5 0">
          <a-text color="#FFFFFF" width="2.8" altitude-counter></a-text>
          <a-text color="#ff9900" width="2.8" lineHeight="0.03" position="-0.5 0.5 0" text-details></a-text>
        </a-entity>*/}
      </a-marker>
      <a-camera-static />
    </a-scene>
    )
  }

}

export default App
