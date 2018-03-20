import React, { Component } from 'react'
import uniq from 'lodash/uniq'
import './style.css'

class FaceTracking extends Component {
  constructor(props) {
    super(props)
    this.canvas = null
    this.trackerTask = null
    this.images = []
    this.state = {
      currentImg: 0
    }
    this.missingFaceFrames = 0
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
      if (event.data.length || this.missingFaceFrames > 20) {
        this.missingFaceFrames = 0
        this.canvas
          .getContext('2d')
          .clearRect(0, 0, this.canvas.width, this.canvas.height)
      } else {
        this.missingFaceFrames++
      }
      event.data.forEach(rect => {
        this.drawFace(rect)
      })
    })
  }

  drawFace = rect => {
    const { currentImg } = this.state
    const img = this.images[currentImg]
    const biggerRatio = 0.5
    const imgWidth = Math.max(rect.width, rect.height) * (1 + biggerRatio)
    const x = rect.x - imgWidth * biggerRatio / 2
    const y = rect.y - imgWidth * biggerRatio / 2
    this.canvas.getContext('2d').drawImage(img, x, y, imgWidth, imgWidth)
  }

  toggle = () => {
    const { currentImg } = this.state
    this.setState({
      currentImg: currentImg === this.images.length - 1 ? 0 : currentImg + 1
    })
  }

  addToImages = el => {
    this.images = uniq([...this.images, el])
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
          <button className="Helmet_button" onClick={this.toggle}>
            Changer de style !
          </button>
          <div style={{ display: 'none' }}>
            <img
              alt="helmet 1"
              ref={this.addToImages}
              src={`${process.env.PUBLIC_URL}/images/space_helmet.png`}
            />
          </div>
          <div style={{ display: 'none' }}>
            <img
              alt="helmet 2"
              ref={this.addToImages}
              src={`${process.env.PUBLIC_URL}/images/space_helmet.png`}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default FaceTracking
