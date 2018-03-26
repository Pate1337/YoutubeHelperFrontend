import React from 'react'
import { connect } from 'react-redux'

class User extends React.Component {
    render() {
        return (
            <div>
                <h2>Tähän käyttäjän nimi</h2>
                <div>
                  <h3>Playlists</h3>
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

export default ConnectedUser (mapStateToProps, mapDispatchToProps)(User)
