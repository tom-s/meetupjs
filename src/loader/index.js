import React, { Component } from 'react'
import './style.css'

const Loader = () => 
  <div className='Loader_wrapper'>
    <div className='Loader'>
      <div className='Loader_top'></div>
      <div className='Loader_bottom'></div>
      <div className='Loader_line'></div>
    </div>
    <div className='Loader_text'>Chargement de votre expérience MeetupJS en cours... </div>
  </div>

export default Loader

