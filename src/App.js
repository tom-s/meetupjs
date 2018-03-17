import React, { Component } from 'react'
import { Entity, Scene } from 'aframe-react'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoaded: false
    }
  }
  render = () => {
    return (
      <a-scene artoolkit>
        <a-anchor hit-testing-enabled='true'>
          <a-marker-camera preset='hiro'>
            <a-box position='0 0.5 0' material='opacity: 0.5; side:double; color:red;'>
              <a-torus-knot radius='0.26' radius-tubular='0.05'>
                <a-animation attribute="rotation" to="360 0 0" dur="5000" easing='linear' repeat="indefinite"></a-animation>
              </a-torus-knot>
            </a-box>
          </a-marker-camera>
        </a-anchor>
      </a-scene>
    )
  }

}

export default App
