import React from 'react'
import { connect } from 'react-redux'
import { addPlaylistForUser } from '../reducers/userReducer'
/*import { usersPlaylists } from '../reducers/playlistsReducer'*/
import { userLinks } from '../reducers/userLinksReducer'

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
      const alreadyExists = this.props.playlists
        .filter(p => p.title === this.state.title)
      if (alreadyExists.length === 0) {
        await this.props.addPlaylistForUser(playlistObject, this.props.loggedUser.id)
        /*await this.props.usersPlaylists()*/
        await this.props.userLinks()
        this.setState({
          title: ''
        })
      } else {
        console.log('Samanniminen soittolista on jo olemassa!')
        this.setState({
          title: ''
        })
      }
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
          <button type='submit'>
            Add new playlist
          </button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = {
  addPlaylistForUser,
  /*usersPlaylists*/
  userLinks
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser,
    /*playlists: state.playlists*/
    playlists: state.userLinks.playlists
  }
}

const ConnectedPlaylistForm = connect(mapStateToProps, mapDispatchToProps)(PlaylistForm)

export default ConnectedPlaylistForm
