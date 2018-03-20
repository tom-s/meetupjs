import React, { Component } from 'react'
import get from 'lodash.get'
import './App.css'
import loadJS from 'load-js'
import Loader from './loader'
import ArScene from './steps/ar'

// Steps
import HawkinsVideo from './steps/ar/hawkin'
import Cube from './steps/ar/cube'
import faceTrackingTroll from './steps/faceTracking/troll'
import faceTrackingHired from './steps/faceTracking/hired'
import OpticalFlow from './steps/opticalFlow'

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
  }
}

const getNextStep = step => {
  switch (step) {
    case 'cube':
      return 'dawkins'
    case 'dawkins':
      return 'faceTrackingTroll'
    case 'faceTrackingTroll':
      return 'opticalFlow'
    case 'opticalFlow':
      return 'faceTrackingHired'
    default:
      return 'cube'
  }
}

const STEPS = {
  dawkins: {
    title: 'No title',
    component: HawkinsVideo,
    isAr: true
  },
  cube: {
    title: 'No title',
    component: Cube,
    isAr: true
  },
  faceTrackingTroll: {
    title: 'Détecteur de troll',
    component: faceTrackingTroll
  },
  opticalFlow: {
    title: 'Détecteur de vitesse',
    component: OpticalFlow
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 'faceTrackingTroll',
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
        <button key="button" onClick={this.onNext} className="Step_button">
          {' '}
          Next{' '}
        </button>,
        <Step key="step" Step={get(STEPS, [step, 'component'])} />
      ]
    ) : (
      <Loader />
    )
  }
  onNext = () => {
    const { step } = this.state
    const nextStep = getNextStep(step)
    this.setState({
      step: nextStep
    })
  }
}

export default App
