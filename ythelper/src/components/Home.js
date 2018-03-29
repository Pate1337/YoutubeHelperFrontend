import React from 'react'
import { connect } from 'react-redux'

class Home extends React.Component {

  render() {
    return (
      <div>
        <h3>Welcome {this.props.loggedUser.username}!</h3>
        <p>Start by searching videos from Youtube.</p>
        <p>
          Soon you will have so many recommended videos that
          you dont even need to search for videos!
        </p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser
  }
}

const ConnectedHome = connect(mapStateToProps)(Home)

export default ConnectedHome
