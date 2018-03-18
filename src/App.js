import React, { Component } from 'react'
import get from 'lodash.get'
import './App.css'

import hocLoader from './loader'
import ArScene from './steps/ar'

// Steps
import HawkinsVideo from './steps/ar/hawkin'
import Cube from './steps/ar/cube'
import FaceTracking from './steps/faceTracking'

const getNextStep = step => {
  switch(step) {
    case 'dawkins': return 'cube'
    case 'cube': return 'dawkins'
    default: return 'faceTracking'
  }
}

const STEPS = {
  'dawkins': { component: HawkinsVideo, isAr: true },
  'cube': { component: Cube, isAr: true },
  'faceTracking': { component: FaceTracking, isAr: false } 
}


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 'cube',
      initialLoad: true
    }
  }
  render = () => {
    const { step, initialLoad } = this.state
    const isAr = get(STEPS, [step, 'isAr'])
    const loadingDelay = initialLoad ? 5000 : 1000
    const Step = isAr
      ? hocLoader({ 
          WrappedComponent: ArScene, 
          promise: (resolve, reject) => {
            window.document.querySelector('a-assets').addEventListener('loaded', () => resolve())
          }, 
          Step: get(STEPS, [step, 'component']),
          onNext: this.onNext,
          minDelay: loadingDelay
      })
      : hocLoader({ 
          WrappedComponent: get(STEPS, [step, 'component']),
          onNext: this.onNext,
          minDelay: loadingDelay
      })
      
    return  <Step />
  }
  onNext = () => {
    const { step } = this.state
    this.setState({
      initialLoad: false,
      step: getNextStep(step)
    })
  }

}

export default App
