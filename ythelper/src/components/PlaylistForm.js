import React from 'react'
import { connect } from 'react-redux'
import { addPlaylistForUser } from '../reducers/userLinksReducer'
import { usersInitialization } from '../reducers/userReducer'
import { Grid } from 'semantic-ui-react'

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
      const response = await this.props.addPlaylistForUser(playlistObject)
      if (response !== 'error') {
        this.setState({
          title: ''
        })
        await this.props.usersInitialization()
      } else {
        this.setState({
          title: ''
        })
      }
    }
  }

  render() {
    return (
      <Grid>
        <Grid.Column>
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
        </Grid.Column>
      </Grid>
    )
  }
}

const mapDispatchToProps = {
  addPlaylistForUser,
  usersInitialization
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser,
    playlists: state.userLinks.playlists
  }
}

const ConnectedPlaylistForm = connect(mapStateToProps, mapDispatchToProps)(PlaylistForm)

export default ConnectedPlaylistForm
