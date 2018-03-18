import React, { Component } from 'react'
import './style.css'

const Loader = ({ isLoading }) => isLoading && 
  <div className='Loader_wrapper'>
    <div className='Loader'>
      <div className='Loader_top'></div>
      <div className='Loader_bottom'></div>
      <div className='Loader_line'></div>
    </div>
    <div className='Loader_text'>Chargement de votre expérience MeetupJS en cours... </div>
  </div>

const hocLoader = ({ WrappedComponent, promise, onNext, minDelay,...props }) => {
  class Result extends Component {
    constructor(props) {
      super(props)
      this.state = {
        isLoading: true
      }
    }
    componentDidMount = () => {
      if(promise) {
        Promise.all([
          new Promise(promise),
          new Promise((resolve, reject) => {
            window.setTimeout(() => { resolve() }, minDelay)
          })
        ]).then(() => {
          this.setState({ isLoading: false })
        })
      } else {
        this.setState({ isLoading: false})
      }
      
    }
    render = () => {
      const { isLoading } = this.state
      return [
          <Loader key='loader' isLoading={isLoading} />,
          <button key='button' onClick={onNext} className='Step_button'> Next </button>,
          <WrappedComponent key='comp' {...props} />
      ]
    }
  }
  return Result
}

export default hocLoader

