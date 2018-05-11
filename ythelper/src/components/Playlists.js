import React from 'react'
import { connect } from 'react-redux'
import Playlist from './Playlist'
import { Grid } from 'semantic-ui-react'
import { setActiveItem } from '../reducers/menuReducer'

class Playlists extends React.Component {

  componentDidMount() {
    this.props.setActiveItem('/myPlaylists')
  }
  
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

const mapDispatchToProps = {
  setActiveItem
}

const ConnectedPlaylists = connect(mapStateToProps, mapDispatchToProps)(Playlists)

export default ConnectedPlaylists
