import React from 'react'

class Togglable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({
      visible: !this.state.visible
    })
  }

  render() {

    return(
      <div>
        <p> </p>
      </div>
    )
  }
}

export default Togglable