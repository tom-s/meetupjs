import React from 'react'
import './style.css'

const Loader = ({ isLoading }) => isLoading && <div className='Loader'> Loading in progress </div>

export default Loader
