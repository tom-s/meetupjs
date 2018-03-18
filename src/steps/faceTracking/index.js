import React, { Component } from 'react'
import 'tracking'
import 'tracking/build/data/face'

class FaceTracking extends Component {
  constructor(props) {
    super(props)
    this.canvas = null
  }

  componentDidMount = () => {
    //@todo
    console.log("canvas", this.canvas)
    const context = this.canvas.getContext('2d')
    console.log("context", context)
    const tracker = new window.tracking.ObjectTracker('face')
    tracker.setInitialScale(4)
    tracker.setStepSize(2)
    tracker.setEdgesDensity(0.1)
    window.tracking.track('#video', tracker, { camera: true })
    tracker.on('track', event => {
      console.log("track", event)
      context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      event.data.forEach(rect => {
        context.strokeStyle = '#a64ceb';
        context.strokeRect(rect.x, rect.y, rect.width, rect.height);
        context.font = '11px Helvetica';
        context.fillStyle = "#fff";
        context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
        context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
      });
    })
  }

  render = () =>
    <div className='faceTracking'>
      <video style={{width: '100%', height: '100%'}} id='video' autoPlay loop muted></video>
      <canvas style={{width: '100%', height: '100%', display: 'block'}} ref={el => this.canvas = el}></canvas>
    </div>

}

export default FaceTracking
