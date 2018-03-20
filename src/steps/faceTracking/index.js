import React, { Component } from 'react'
import './style.css'

class FaceTracking extends Component {
  constructor(props) {
    super(props)
    this.canvas = null
    this.trackerTask = null
    this.trollImg = null
    this.geniusImg = null
    this.state = {
      showTroll: true
    }
  }

  componentWillUnmount = () => {
    this.trackerTask.stop()
  }

  componentDidMount = () => {
    const tracker = new window.tracking.ObjectTracker('face')
    tracker.setInitialScale(4)
    tracker.setStepSize(2)
    tracker.setEdgesDensity(0.1)
    this.trackerTask = window.tracking.track('#video', tracker, {
      camera: true
    })
    tracker.on('track', event => {
      if (event.data.length) {
        this.canvas
          .getContext('2d')
          .clearRect(0, 0, this.canvas.width, this.canvas.height)
      }
      event.data.forEach(rect => {
        this.drawFace(rect)
      })
    })
  }

  drawFace = rect => {
    const { showTroll } = this.state
    const img = showTroll ? this.trollImg : this.geniusImg
    this.canvas
      .getContext('2d')
      .drawImage(img, rect.x, rect.y, rect.width, rect.width)
  }

  toggle = () => {
    const { showTroll } = this.state
    this.setState({
      showTroll: !showTroll
    })
  }

  render = () => {
    const { showTroll } = this.state
    return (
      <div className="FaceTracking">
        <div className="FaceTracking_wrapper">
          <video
            width="320px"
            height="240px"
            className="FaceTracking_video"
            id="video"
            autoPlay
            loop
            muted
          />
          <canvas
            width="320px"
            height="240px"
            className="FaceTracking_canvas"
            ref={el => (this.canvas = el)}
          />
          <button className="Genius_button" onClick={this.toggle}>
            {showTroll
              ? "Ce n'est pas un troll, c'est un génie !"
              : "Ce n'est pas un génie, c'est un troll !"}
          </button>
          <div style={{ display: 'none' }}>
            <img
              alt="trollface"
              ref={el => (this.trollImg = el)}
              src={`${process.env.PUBLIC_URL}/images/square.png`}
            />
          </div>
          <div style={{ display: 'none' }}>
            <img
              alt="genius"
              ref={el => (this.geniusImg = el)}
              src={`${process.env.PUBLIC_URL}/images/stephen_hawking.jpg`}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default FaceTracking
