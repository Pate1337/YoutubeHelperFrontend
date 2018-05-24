import React from 'react'
import { connect } from 'react-redux'
import { Grid, Item, Dimmer, Loader, Segment } from 'semantic-ui-react'
import PlaylistLink from './PlaylistLink'

class PlaylistView extends React.Component {

  render() {
    if (this.props.playlist !== undefined) {
    return (
      <Grid>
        <Grid.Column>
          <h2>{this.props.playlist.title} ({this.props.playlist.links.length})</h2>
          <Item.Group divided unstackable>
            {(this.props.playlist.links.length !== 0)
              ? this.props.playlist.links.map(l => <PlaylistLink key={l._id} link={l} playlist={this.props.playlist} />)
              : <div></div>
            }
          </Item.Group>
        </Grid.Column>
      </Grid>
    )
  } else {
    return (
      <Segment style={{position: 'fixed', top: 0, right: 0, width: window.innerWidth, height: window.innerHeight}} basic>
        <Dimmer active inverted>
          <Loader size='large'>Loading...</Loader>
        </Dimmer>
      </Segment>
    )
  }
  }
}

const mapStateToProps = (state, ownProps) => {
  let playlist
  if (state.playingPlaylist.playlist === null) {
    playlist = ownProps.playlist
  } else if (state.playingPlaylist.playlist._id === ownProps.playlist._id) {
    playlist = state.playingPlaylist.playlist
  } else {
    playlist = ownProps.playlist
  }
  return {
    playlist: playlist
  }
}

const ConnectedPlaylistView = connect(mapStateToProps)(PlaylistView)

export default ConnectedPlaylistView
