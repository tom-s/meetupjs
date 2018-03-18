import React from 'react'
import './style.css'

const Loader = ({ isLoading }) => isLoading && 
  <div className='Loader_wrapper'>
    <div className='Loader'>
      <div className='Loader_top'></div>
      <div className='Loader_bottom'></div>
      <div className='Loader_line'></div>
    </div>
    <div className='Loader_text'>Chargement de votre expérience en cours... </div>
  </div>

export default Loader
