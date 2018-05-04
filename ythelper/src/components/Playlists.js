import React from 'react'
import { connect } from 'react-redux'
import Playlist from './Playlist'
import { Grid } from 'semantic-ui-react'

class Playlists extends React.Component {

  render() {
    console.log('Rendering Playlists')
    return (
      <Grid>
      <Grid.Column>
        <h2>Playlists</h2>
        {this.props.playlists.map(playlist =>
          <Playlist key={playlist._id} item={playlist} />
        )}
      </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    playlists: state.userLinks.playlists
  }
}

const ConnectedPlaylists = connect(mapStateToProps)(Playlists)

export default ConnectedPlaylists
