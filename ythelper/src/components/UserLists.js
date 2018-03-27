import React from 'react'
import { connect } from 'react-redux'
import Playlists from './Playlists'
import FavouriteLinks from './FavouriteLinks'

class UserLists extends React.Component {
    render() {
        return (
            <div>
                <h2>{this.props.loggedUser.username}</h2>
                <div>
                  <FavouriteLinks />
                  <Playlists />
                </div>
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

}
const ConnectedUserLists = connect(mapStateToProps, mapDispatchToProps)(UserLists)

export default ConnectedUserLists
