import React, { Component } from 'react'
import { Entity, Scene } from 'aframe-react'
import Loader from '../../loader'

class ArScene extends Component {
  constructor(props) {
    super(props)
    this.state = {
      assetsLoaded: false
    }
  }
  componentDidMount = () => {
    window.document.querySelector('a-assets').addEventListener('loaded', () => {
      this.setState({
        assetsLoaded: true
      })
    })
  }
  render = () => {
    const { assetsLoaded } = this.state
    const { Step } = this.props
    return (
      <Scene
        embedded
        arjs="trackingMethod: best;debugUIEnabled: false;"
        stats={false}
      >
        {/* Load all assets */}
        {!assetsLoaded && <Loader />}
        <Entity primitive="a-assets">
          {/* <Entity primitive='a-asset-item' id='heart' src={`${process.env.PUBLIC_URL}/models/heart/scene.gltf`}></Entity> */}
          <video
            id="video-hawkins"
            muted={true}
            autoPlay={true}
            loop="true"
            src={`${process.env.PUBLIC_URL}/videos/hawkins.mp4`}
          />
        </Entity>

        <Entity primitive="a-marker">
          <Step />

          {/*
          <a-entity look-at="[camera]" position="-0.5 0.5 0">
            <a-text color="#FFFFFF" width="2.8" altitude-counter></a-text>
            <a-text color="#ff9900" width="2.8" lineHeight="0.03" position="-0.5 0.5 0" text-details></a-text>
          </a-entity>*/}
        </Entity>
        <Entity primitive="a-camera-static" />
      </Scene>
    )
  }
}

export default ArScene
