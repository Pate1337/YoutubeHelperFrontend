import React from 'react'
import { connect } from 'react-redux'
import { removeLoggedUser } from '../reducers/loggedUserReducer'
/*import { removeFavourites } from '../reducers/favouriteLinksReducer'
import { removePlaylists } from '../reducers/playlistsReducer'*/
import { removeUserLinks } from '../reducers/userLinksReducer'
import { clearSearchResults } from '../reducers/ytReducer'
import { Link } from 'react-router-dom'

class LoggedBar extends React.Component {

  logOut = (event) => {
    console.log('logOut LoggedBar')
    event.preventDefault()
    this.props.removeLoggedUser()
    this.props.removeUserLinks()
    this.props.clearSearchResults()
    window.localStorage.removeItem('ytSearchBar')
    this.props.history.push('/')
  }

  render() {
    console.log('Rendering LoggedBar')
    return (
      <div>
        {this.props.loggedUser !== null
          ? <div>
              {this.props.loggedUser.username} logged in&nbsp;
              <button onClick={this.logOut}>
                Logout
              </button>
            </div>
          : <div>
              <Link to='/login'>login</Link>&nbsp;
              Dont have an account yet?&nbsp;
              <Link to='/signup'>Create an account</Link>
            </div>
          }
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
  removeUserLinks,
  clearSearchResults
}

const ConnectedLoggedBar = connect(mapStateToProps, mapDispatchToProps)(LoggedBar)

export default ConnectedLoggedBar
