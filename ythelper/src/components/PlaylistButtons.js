import React from 'react'
import { connect } from 'react-redux'
import { playNext, playPrevious, shufflePlaylist, playRandom } from '../reducers/playlistPlayingReducer'
import { setPlayingVideo } from '../reducers/videoPlayingReducer'
import { Icon, Button } from 'semantic-ui-react'
import { searchForRelatedVideos } from '../reducers/ytRelatedVideosReducer'
import { setLoading, setLoaded } from '../reducers/loaderReducer'
import { Link } from 'react-router-dom'

class PlaylistButtons extends React.Component {

  random = async (event) => {
    event.preventDefault()
    await this.props.setLoading()
    await this.props.playRandom()
    await this.props.setPlayingVideo(this.props.playingPlaylist.links[this.props.index])
    await this.props.searchForRelatedVideos(this.props.playingPlaylist.links[this.props.index].linkId, 50)
    await this.props.setLoaded()
  }

  playPrevious = async (event) => {
    event.preventDefault()
    await this.props.setLoading()
    await this.props.playPrevious()
    await this.props.setPlayingVideo(this.props.playingPlaylist.links[this.props.index])
    await this.props.searchForRelatedVideos(this.props.playingPlaylist.links[this.props.index].linkId, 50)
    await this.props.setLoaded()
  }

  shuffle = async (event) => {
    event.preventDefault()
    await this.props.shufflePlaylist()
  }

  playNext = async (event) => {
    await this.props.setLoading()
    await this.props.playNext()
    await this.props.setPlayingVideo(this.props.playingPlaylist.links[this.props.index])
    await this.props.searchForRelatedVideos(this.props.playingPlaylist.links[this.props.index].linkId, 50)
    await this.props.setLoaded()
  }
  showPlaylist = () => {
    console.log('Show playlist')
    if (this.props.playerPlaying && window.innerWidth > 750) {
      window.scrollTo(0, 560)
    } else if (this.props.playerPlaying && window.innerWidth <= 750) {
      window.scrollTo(0, 310)
    }
  }

  render() {
    const showPlaylistButtons = { display: (this.props.playingPlaylist !== null) ? '' : 'none' }
    const onlyShowOnComputer = { display: (window.innerWidth > 750) ? '' : 'none'}
    let playlistUrl = ''
    let playlistTitle = ''
    if (this.props.playingPlaylist !== null) {
      playlistUrl = '/myPlaylists/' + this.props.playingPlaylist._id
      playlistTitle = 'Show ' + this.props.playingPlaylist.title
    }
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
          <Button as={Link} to={playlistUrl} style={onlyShowOnComputer} title={playlistTitle} icon onClick={this.showPlaylist}>
            <Icon name='list' size='large' />
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
    index: state.playingPlaylist.index,
    playerPlaying: state.playingVideo.playerPlaying
  }
}

const mapDispatchToProps = {
  playNext,
  playPrevious,
  shufflePlaylist,
  playRandom,
  setPlayingVideo,
  searchForRelatedVideos,
  setLoading,
  setLoaded
}

const ConnectedPlaylistButtons = connect(mapStateToProps, mapDispatchToProps)(PlaylistButtons)

export default ConnectedPlaylistButtons
