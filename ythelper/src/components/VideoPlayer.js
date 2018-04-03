import React from 'react'
import Youtube from 'react-youtube'
import { connect } from 'react-redux'
import { showPlayerBarAndHide, setPlayerTarget, setPlayerPaused,
  setPlayerPlaying, setPlayingVideo } from '../reducers/videoPlayingReducer'
import PlaylistButtons from './PlaylistButtons'
import AddToUserLinksButtons from './AddToUserLinksButtons'
import { playNext } from '../reducers/playlistPlayingReducer'

class VideoPlayer extends React.Component {

/*  playNext = async () => {
    console.log('playNext')
    await this.props.playNext()
  }
*/
  onPlay = async (event) => {
    console.log('onPlay VideoPlayer')
    await this.props.setPlayerPlaying()
    if (this.props.playerTarget === null) {
      console.log('playerTarget === null, joten pauseVideo ja asetetaan')
      event.target.pauseVideo()
      await this.props.setPlayerTarget(event.target)
    }
  }

  hidePlayer = async (event) => {
    await this.props.showPlayerBarAndHide()
  }

  pause = async (event) => {
    console.log('pause Player')
    await this.props.setPlayerPaused()
  }

  onEnd = async () => {
    if (this.props.playingPlaylist.playlist !== null) {
      await this.props.playNext()
      await this.props.setPlayingVideo(this.props.playingPlaylist.playlist.links[this.props.index])
    }
  }

  render() {
    console.log('Rendering VideoPlayer')
    const showPlayer = { display: (this.props.playerPlaying) ? '' : 'none' }
    const opts = {
      height: '315',
      width: '560',
      playerVars: {
        autoplay: 1,
        rel: 0
      }
    }
    return (
      <div>
        <div style={showPlayer}>
          <Youtube
            id='player'
            videoId={this.props.link.linkId}
            opts={opts}
            onPlay={this.onPlay}
            onPause={this.pause}
            onEnd={this.onEnd}
          />
          <button onClick={this.hidePlayer}>
            Hide player
          </button>
          <PlaylistButtons />
          <AddToUserLinksButtons link={this.props.link} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    link: state.playingVideo.link,
    playerPlaying: state.playingVideo.playerPlaying,
    playerTarget: state.playingVideo.playerTarget,
    playingPlaylist: state.playingPlaylist,
    index: state.playingPlaylist.index
  }
}

const mapDispatchToProps = {
  showPlayerBarAndHide,
  setPlayerTarget,
  setPlayerPaused,
  setPlayerPlaying,
  setPlayingVideo,
  playNext
}

const ConnectedVideoPlayer = connect(mapStateToProps, mapDispatchToProps)(VideoPlayer)

export default ConnectedVideoPlayer
