import React, { Component } from 'react'

class OpticalFlow extends Component {
  constructor(props) {
    super(props)
    this.flow = null
  }
  componentWillUnmount = () => {
    this.flow.stopCapture()
  }
  componentDidMount = () => {
    this.flow = new window.oflow.WebCamFlow()
    this.flow.onCalculated(this.onCapture)
    // Starts capturing the flow from webcamera
    this.flow.startCapture()
  }

  onCapture = direction => {
    console.log("on capture", direction)
  }

  render = () => null
}

export default OpticalFlow

