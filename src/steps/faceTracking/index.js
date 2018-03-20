import React, { Component } from 'react'
import './style.css'

class FaceTracking extends Component {
  constructor(props) {
    super(props)
    this.canvas = null
    this.trackerTask = null
    this.faceImg = null
  }
  componentWillUnmount = () => {
    this.trackerTask.stop()
  }
  componentDidMount = () => {
    const tracker = new window.tracking.ObjectTracker('face')
    tracker.setInitialScale(4)
    tracker.setStepSize(2)
    tracker.setEdgesDensity(0.1)
    this.trackerTask = window.tracking.track('#video', tracker, { camera: true })
    tracker.on('track', event => {
      if( event.data.length) {
        this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height)
      }
      event.data.forEach(rect => {
        this.drawFace(rect)
      })
    })
  }

  drawFace = rect => {
    this.canvas.getContext('2d').drawImage(this.faceImg, rect.x, rect.y, rect.width, rect.width);
  }

  render = () =>
    <div className='FaceTracking'>
      <div className='FaceTracking_wrapper'>
        <video width="320px" height="240px" className='FaceTracking_video' id='video' autoPlay loop muted></video>
        <canvas width="320px" height="240px" className='FaceTracking_canvas' ref={el => this.canvas = el}></canvas>
        <div style={{display:'none'}}>
          <img ref={el => this.faceImg = el} src={`${process.env.PUBLIC_URL}/images/square.png`} />
        </div>
      </div>
    </div>

}

export default FaceTracking
