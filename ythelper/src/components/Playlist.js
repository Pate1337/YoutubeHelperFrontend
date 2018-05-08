import React from 'react'
import { connect } from 'react-redux'
import PlaylistLink from './PlaylistLink'
import { Grid, Item } from 'semantic-ui-react'

class Playlist extends React.Component {
  constructor() {
    super()
    this.state = {
      showPlaylistLinks: false
    }
  }

  toggleVisibility = () => {
    this.setState({
      showPlaylistLinks: !this.state.showPlaylistLinks
    })
  }

  render() {
    console.log('Rendering Playlist')
    return (
      <Grid>
        <Grid.Column>
          <div onClick={this.toggleVisibility} style={{cursor: 'pointer', display: 'inline-block'}}>
            <h3>{this.props.playlist.title} </h3> links: {this.props.playlist.links.length}
          </div>
          <Item.Group divided unstackable>
            {(this.state.showPlaylistLinks && this.props.playlist.links.length !== 0)
              ? this.props.playlist.links.map(l => <PlaylistLink key={l._id} link={l} playlist={this.props.playlist} />)
              : <div></div>
            }
          </Item.Group>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let playlist
  if (state.playingPlaylist.playlist === null) {
    playlist = ownProps.item
  } else if (state.playingPlaylist.playlist._id === ownProps.item._id) {
    playlist = state.playingPlaylist.playlist
  } else {
    playlist = ownProps.item
  }
  return {
    playlist: playlist
  }
}

const ConnectedPlaylist = connect(mapStateToProps)(Playlist)

export default ConnectedPlaylist
