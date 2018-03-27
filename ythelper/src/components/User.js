import React from 'react'
import { connect } from 'react-redux'
import Playlists from './Playlists'
import FavouriteLinks from './FavouriteLinks'

class User extends React.Component {
    render() {
        return (
            <div>
                <h2>Tähän käyttäjän nimi</h2>
                <div>
                  <FavouriteLinks />
                  <Playlists />
                </div>
            </div>
        )
    }
}

const mapStateToProps = () => {
  
}

const mapDispatchToProps = {

}
const ConnectedUser = connect(mapStateToProps, mapDispatchToProps)(User)

export default ConnectedUser
