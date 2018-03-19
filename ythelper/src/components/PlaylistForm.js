import React from 'react'
import { connect } from 'react-redux'
import { addPlaylistForUser } from '../reducers/userLinksReducer'
/*import { usersPlaylists } from '../reducers/playlistsReducer'*/
import { userLinks } from '../reducers/userLinksReducer'
import { usersInitialization } from '../reducers/userReducer'

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
      /*const alreadyExists = this.props.playlists
        .filter(p => p.title === this.state.title)
      if (alreadyExists.length === 0) {
        await this.props.addPlaylistForUser(playlistObject)
        this.setState({
          title: ''
        })
      } else {
        console.log('Samanniminen soittolista on jo olemassa!')
        this.setState({
          title: ''
        })
      }*/
      const response = await this.props.addPlaylistForUser(playlistObject)
      if (response !== 'error') {
        console.log('soittolista lisätty!')
        this.setState({
          title: ''
        })
        /*Onpahan ainakin kaikki tiedot ajantasalla, mukaanlukien muiden
        käyttäjien reaaliaikaset lisäykset. Luulis vaa olevan aika hidasta.*/
        await this.props.usersInitialization()
      } else {
        console.log('Soittolistaa ei lisätty!')
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
