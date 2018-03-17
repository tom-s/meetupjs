import React, { Component } from 'react'
import { Entity, Scene } from 'aframe-react'
import get from 'lodash.get'
import './App.css'

const DawkinsVideo = () => <Entity geometry="primitive: plane" material="src: #video-hawkins"></Entity>

const Cube = () => 
  <Entity primitive='a-box' position='0 0.5 0' material='opacity: 0.5; side:double; color:red;'>
    <Entity primitive='a-torus-knot' radius='0.26' radius-tubular='0.05'>
      <Entity primitive='a-animation' attribute="rotation" to="360 0 0" dur="5000" easing='linear' repeat="indefinite"></Entity>
    </Entity>
  </Entity>

const STEPS = {
  'dawkins': DawkinsVideo,
  'cube': Cube 
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 'dawkins'
    }
  }
  render = () => {
    const { step } = this.state
    const Step = get(STEPS, [step])
    return (
      <Scene embedded arjs='trackingMethod: best;debugUIEnabled: false;' stats>
        {/* Load all assets */}
        <Entity primitive='a-assets'>
          {/* <Entity primitive='a-asset-item' id='heart' src={`${process.env.PUBLIC_URL}/models/heart/scene.gltf`}></Entity> */}
          <video id="video-hawkins" autoPlay loop="true" src={`${process.env.PUBLIC_URL}/videos/hawkins.mp4`}></video>
        </Entity>

        <Entity primitive='a-marker'>
          <Step />

          {/*
          <a-entity look-at="[camera]" position="-0.5 0.5 0">
            <a-text color="#FFFFFF" width="2.8" altitude-counter></a-text>
            <a-text color="#ff9900" width="2.8" lineHeight="0.03" position="-0.5 0.5 0" text-details></a-text>
          </a-entity>*/}
        </Entity>
        <a-camera-static />
      </Scene>
    )
  }
  onClick = () => {
    console.log("onclick !")
    this.setState({
      step: 'cube'
    })
  }

}

export default App
