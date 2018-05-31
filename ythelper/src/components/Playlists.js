import React from 'react'
import { connect } from 'react-redux'
import Playlist from './Playlist'
import { Grid, Item } from 'semantic-ui-react'
import { setActiveItem } from '../reducers/menuReducer'

class Playlists extends React.Component {

  componentDidMount() {
    this.props.setActiveItem('/myPlaylists')
  }

  render() {
    return (
      <Grid>
        <Grid.Column>
          <h2>Playlists</h2>
          <Item.Group divided unstackable>
            {this.props.playlists.map(playlist =>
              <Playlist key={playlist._id} item={playlist} history={this.props.history} />
            )}
          </Item.Group>
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
