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
      console.log('assets loaded')
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
            id="video-et"
            muted={true}
            autoPlay={true}
            loop="true"
            src={`${process.env.PUBLIC_URL}/videos/et.mp4`}
          />
          <video
            id="video-interstellar"
            muted={true}
            autoPlay={true}
            loop="true"
            src={`${process.env.PUBLIC_URL}/videos/interstellar.mp4`}
          />
          <video
            id="video-landing"
            muted={true}
            autoPlay={true}
            loop="true"
            src={`${process.env.PUBLIC_URL}/videos/landing.mp4`}
          />
          <video
            id="video-spaceodyssey"
            muted={true}
            autoPlay={true}
            loop="true"
            src={`${process.env.PUBLIC_URL}/videos/spaceodyssey.mp4`}
          />
        </Entity>

        <Entity primitive="a-marker">
          <Step />
        </Entity>
        <Entity primitive="a-camera-static" />
      </Scene>
    )
  }
}

export default ArScene
