import React, { Component } from 'react'
import './style.css'

class FaceTracking extends Component {
  constructor(props) {
    super(props)
    this.canvas = null
    this.trackerTask = null
  }

  componentWillUnmount = () => {
    this.trackerTask.stop()
  }
  componentDidMount = () => {
    const context = this.canvas.getContext('2d')
    context.globalAlpha = 0.5
    const tracker = new window.tracking.ObjectTracker('face')
    tracker.setInitialScale(4)
    tracker.setStepSize(2)
    tracker.setEdgesDensity(0.1)
    this.trackerTask = window.tracking.track('#video', tracker, { camera: true })
    tracker.on('track', event => {
      if( event.data.length) {
        context.clearRect(0, 0, this.canvas.width, this.canvas.height)
      }
      event.data.forEach(rect => {
        context.strokeStyle = '#a64ceb';
        context.fillRect(rect.x, rect.y, rect.width, rect.height)
        context.font = '11px Helvetica';
        context.fillStyle = "#fff";
        
        /*
        ctx.shadowBlur = blur;
        ctx.shadowColor = color;
        ctx.shadowOffsetX = w;
        ctx.shadowOffsetY = h;*/
        context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
        context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
      });
    })
  }

  render = () =>
    <div className='FaceTracking'>
      <div className='FaceTracking_wrapper'>
        <video width="320px" height="240px" className='FaceTracking_video' id='video' autoPlay loop muted></video>
        <canvas width="320px" height="240px" className='FaceTracking_canvas' ref={el => this.canvas = el}></canvas>
      </div>
    </div>

}

export default FaceTracking
