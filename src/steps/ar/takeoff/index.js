import React from 'react'
import { Entity } from 'aframe-react'

const Takeoff = () => (
  <Entity
    primitive="a-box"
    position="0 0.5 0"
    material="opacity: 0.5; side:double; color:red;"
  >
    <Entity primitive="a-torus-knot" radius="0.26" radius-tubular="0.05">
      <Entity
        primitive="a-animation"
        attribute="rotation"
        to="360 0 0"
        dur="5000"
        easing="linear"
        repeat="indefinite"
      />
    </Entity>
  </Entity>
)

export default Takeoff
