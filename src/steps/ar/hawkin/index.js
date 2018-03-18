import React, { Component } from 'react'
import { Entity } from 'aframe-react'

class HawkinsVideo extends Component {
  componentDidMount = () => {
    const videoEl = window.document.querySelector('#video-hawkins')
    //videoEl.setAttribute('autoplay', true)
    // todo play/pause video on marker show/hide

  }
  render = () => 
    <Entity geometry="primitive: plane" material="src: #video-hawkins"></Entity>
}

export default HawkinsVideo
