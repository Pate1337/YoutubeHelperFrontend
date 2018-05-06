import React from 'react'
import Youtube from 'react-youtube'
import { connect } from 'react-redux'
import { setPlayingVideo } from '../reducers/videoPlayingReducer'
import AddToUserLinksButtons from './AddToUserLinksButtons'
import { clearPlayingPlaylist } from '../reducers/playlistPlayingReducer'
import { Grid } from 'semantic-ui-react'

class YTSearchResult extends React.Component {

  playVideo = async () => {
    await this.props.setPlayingVideo(this.props.item)
    await this.props.clearPlayingPlaylist()
  }

  render() {
    console.log('Rendering YTSearchResult')
    return (
      <Grid>
        <Grid.Column>
          <img onClick={this.playVideo}
            src={this.props.item.thumbnail}
            alt={this.props.item.title}
            style={{cursor: 'pointer', display: 'inline-block'}}
          />
          id: {this.props.item.linkId}, title: {this.props.item.title}, count: {this.props.count}
          {this.props.loggedUser !== null
            ? <AddToUserLinksButtons link={this.props.item} />
            : <div></div>
          }
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser
  }
}

const mapDispatchToProps = {
  setPlayingVideo,
  clearPlayingPlaylist
}

const ConnectedYTSearchResult = connect(mapStateToProps, mapDispatchToProps)(YTSearchResult)

export default ConnectedYTSearchResult
