import React, { Component } from 'react'
import { Entity, Scene } from 'aframe-react'
import get from 'lodash.get'
import './App.css'

import Loader from './loader'
// Steps
import HawkinsVideo from './steps/hawkin'
import Cube from './steps/cube'

const getNextStep = step => {
  switch(step) {
    case 'dawkins': return 'cube'
    case 'cube': return 'dawkins'
    default: return 'dawkins'
  }
}

const STEPS = {
  'dawkins': { component: HawkinsVideo },
  'cube': { component: Cube } 
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      step: 'dawkins'
    }
  }
  componentDidMount = () => {
    window.document.querySelector('a-assets').addEventListener('loaded', () => {
      console.log("assets loaded")
      this.setState({
       isLoading: false
      })
    });
  }
  render = () => {
    const { isLoading, step } = this.state
    const Step = get(STEPS, [step, 'component'])
    
    return [
        <Loader key='loader' isLoading={isLoading} />,
        <button key='button' onClick={this.onClick} className='Step_button'> Next </button>,
        <Scene key='scene' embedded arjs='trackingMethod: best;debugUIEnabled: false;' stats={false}>
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
    ]
  }
  onClick = () => {
    const { step } = this.state
    this.setState({
      step: getNextStep(step)
    })
  }

}

export default App
