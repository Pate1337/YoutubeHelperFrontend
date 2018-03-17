import React from 'react'
import { connect } from 'react-redux'
import { addPlaylistForUser } from '../reducers/userReducer'
import { usersPlaylists } from '../reducers/playlistsReducer'

class PlaylistForm extends React.Component {
  constructor() {
    super()
    this.state = {
      title: ''
    }
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    if (this.state.title !== '') {
      const playlistObject = {
        title: this.state.title
      }
      /*Samaan tapaan kuin suosikkien lisääminen.*/
      /*Ja tänne kanssa state.playlistin läpikäynti. Ei päästetä eteenpäin
      jos samanniminen soittolista on jo!!!!*/
      await this.props.addPlaylistForUser(playlistObject, this.props.loggedUser.id)
      await this.props.usersPlaylists()
    } else {
      console.log('Soittolistalla pitää olla nimi!')
    }
  }

  render() {
    console.log('Rendering PlaylistFrom')
    return (
      <div>
        <h2>Create a playlist</h2>
        <form onSubmit={this.handleSubmit}>
          Name:
          <input
            type='text'
            name='title'
            value={this.state.title}
            onChange={this.handleFieldChange}
          />
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = {
  addPlaylistForUser,
  usersPlaylists
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser,
    playlists: state.playlists
  }
}

const ConnectedPlaylistForm = connect(mapStateToProps, mapDispatchToProps)(PlaylistForm)

export default ConnectedPlaylistForm
