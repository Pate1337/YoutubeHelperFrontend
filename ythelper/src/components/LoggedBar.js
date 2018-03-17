import React from 'react'
import { connect } from 'react-redux'
import { removeLoggedUser } from '../reducers/loggedUserReducer'
import { removeFavourites } from '../reducers/favouriteLinksReducer'

class LoggedBar extends React.Component {

  logOut = (event) => {
    console.log('logOut LoggedBar')
    event.preventDefault()
    this.props.removeLoggedUser()
    this.props.removeFavourites()
    /*this.props.history.push('/')*/
  }

  render() {
    console.log('Rendering LoggedBar')
    return (
      <div>
        {this.props.loggedUser.username} logged in&nbsp;
        <button onClick={this.logOut}>
          Logout
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser
  }
}

const mapDispatchToProps = {
  removeLoggedUser,
  removeFavourites
}

const ConnectedLoggedBar = connect(mapStateToProps, mapDispatchToProps)(LoggedBar)

export default ConnectedLoggedBar
