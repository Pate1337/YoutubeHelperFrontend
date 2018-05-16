import React from 'react'
import { connect } from 'react-redux'
import { playNext, playPrevious, shufflePlaylist, playRandom } from '../reducers/playlistPlayingReducer'
import { setPlayingVideo } from '../reducers/videoPlayingReducer'
import { Icon, Button } from 'semantic-ui-react'
import { searchForRelatedVideos } from '../reducers/ytRelatedVideosReducer'

class PlaylistButtons extends React.Component {

  random = async (event) => {
    event.preventDefault()
    await this.props.playRandom()
    await this.props.setPlayingVideo(this.props.playingPlaylist.links[this.props.index])
    await this.props.searchForRelatedVideos(this.props.playingPlaylist.links[this.props.index].linkId, 50)
  }

  playPrevious = async (event) => {
    event.preventDefault()
    await this.props.playPrevious()
    await this.props.setPlayingVideo(this.props.playingPlaylist.links[this.props.index])
    await this.props.searchForRelatedVideos(this.props.playingPlaylist.links[this.props.index].linkId, 50)
  }

  shuffle = async (event) => {
    event.preventDefault()
    await this.props.shufflePlaylist()
  }

  playNext = async (event) => {
    await this.props.playNext()
    await this.props.setPlayingVideo(this.props.playingPlaylist.links[this.props.index])
    await this.props.searchForRelatedVideos(this.props.playingPlaylist.links[this.props.index].linkId, 50)
  }

  render() {
    const showPlaylistButtons = { display: (this.props.playingPlaylist !== null) ? '' : 'none' }
    console.log('playlistPlaying: ' + this.props.playingPlaylist)
    return (
      <div>
        <div style={showPlaylistButtons}>
          <Button title='Play previous' icon onClick={this.playPrevious}>
            <Icon name='step backward' size='large' />
          </Button>
          <Button title='Shuffle' icon onClick={this.shuffle}>
            <Icon name='shuffle' size='large' />
          </Button>
          <Button title='Play next' icon onClick={this.playNext}>
            <Icon name='step forward' size='large' />
          </Button>
        </div>
      </div>
    )
  }
}
/*Random otettu pois
<Button icon onClick={this.random}>
  Play random
</Button>*/
const mapStateToProps = (state) => {
  return {
    playingPlaylist: state.playingPlaylist.playlist,
    index: state.playingPlaylist.index
  }
}

const mapDispatchToProps = {
  playNext,
  playPrevious,
  shufflePlaylist,
  playRandom,
  setPlayingVideo,
  searchForRelatedVideos
}

const ConnectedPlaylistButtons = connect(mapStateToProps, mapDispatchToProps)(PlaylistButtons)

export default ConnectedPlaylistButtons
