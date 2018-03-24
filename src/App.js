import React, { Component } from 'react'
import get from 'lodash.get'
import './App.css'
import loadJS from 'load-js'
import Loader from './loader'
import ArScene from './steps/ar'
import Topbar from './Topbar'

// Steps
import SpaceVideos from './steps/ar/space'
import TakeOff from './steps/ar/takeoff'
import Astronaut from './steps/faceTracking/helmet'
import Stars from './steps/stars'
//import faceTrackingHired from './steps/faceTracking/hired'

const loadEssentialScripts = async () => {
  const scripts = []
  if (!window.AFRAME)
    scripts.push(`${process.env.PUBLIC_URL}/scripts/aframe.js`)
  if (!window.tracking) {
    scripts.push(`${process.env.PUBLIC_URL}/scripts/tracking/tracking-min.js`)
    scripts.push(`${process.env.PUBLIC_URL}/scripts/tracking/data/face-min.js`)
  }
  if (!window.oflow) {
    scripts.push(`${process.env.PUBLIC_URL}/scripts/oflow/polyfill.js`)
    scripts.push(`${process.env.PUBLIC_URL}/scripts/oflow/flowZone.js`)
  }
  await loadJS(scripts)
  // aframe-ar requires to be loaded afterwards
  if (!window.AR) {
    await loadJS([`${process.env.PUBLIC_URL}/scripts/aframe-ar.js`])
    await loadJS([`${process.env.PUBLIC_URL}/scripts/aframe-ar-lookat.js`])
  }
}

const getPreviousStep = step => {}

const getNextStep = step => {
  switch (step) {
    case 'spaceVideos':
      return 'astronaut'
    case 'astronaut':
      return 'takeOff'
    case 'takeOff':
      return 'inTheStars'
    case 'inTheStars':
      return 'spaceVideos'
    default:
      return 'spaceVideos'
  }
}

const STEPS = {
  spaceVideos: {
    title: `Des rêves d'espace`,
    component: SpaceVideos,
    isAr: true
  },
  astronaut: {
    title: 'Je suis un astronaute !',
    component: Astronaut
  },
  takeOff: {
    title: 'Décollage imminent',
    component: TakeOff,
    isAr: true
  },
  inTheStars: {
    title: `Dans les étoiles`,
    component: Stars
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 'spaceVideos',
      scriptsReady: false
    }
  }
  componentDidMount = async () => {
    await loadEssentialScripts()
    this.setState({
      scriptsReady: true
    })
  }

  render = () => {
    const { scriptsReady, step } = this.state
    const isAr = get(STEPS, [step, 'isAr'])
    const Step = isAr ? ArScene : get(STEPS, [step, 'component'])
    return scriptsReady ? (
      [
        <Topbar
          onNext={this.onNext}
          onPrevious={this.onPrevious}
          title={get(STEPS, [step, 'title'])}
          isAr={isAr}
        />,
        <Step key="step" Step={get(STEPS, [step, 'component'])} />
      ]
    ) : (
      <Loader />
    )
  }
  onPrevious = () => {
    this.setState(prevState => ({
      step: getPreviousStep(prevState.step)
    }))
  }
  onNext = () => {
    console.log('on next')
    this.setState(prevState => ({
      step: getNextStep(prevState.step)
    }))
  }
}

export default App
