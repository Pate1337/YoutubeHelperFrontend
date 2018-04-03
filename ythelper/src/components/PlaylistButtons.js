import React from 'react'
import { connect } from 'react-redux'
import { playNext, playPrevious, shufflePlaylist, playRandom } from '../reducers/playlistPlayingReducer'
import { setPlayingVideo } from '../reducers/videoPlayingReducer'

class PlaylistButtons extends React.Component {

  random = async (event) => {
    event.preventDefault()
    await this.props.playRandom()
    await this.props.setPlayingVideo(this.props.playingPlaylist.links[this.props.index])
  }

  playPrevious = async (event) => {
    event.preventDefault()
    await this.props.playPrevious()
    await this.props.setPlayingVideo(this.props.playingPlaylist.links[this.props.index])
  }

  shuffle = async (event) => {
    event.preventDefault()
    await this.props.shufflePlaylist()
  }

  playNext = async (event) => {
    await this.props.playNext()
    await this.props.setPlayingVideo(this.props.playingPlaylist.links[this.props.index])
  }

  render() {
    const showPlaylistButtons = { display: (this.props.playingPlaylist !== null) ? '' : 'none' }
    console.log('playlistPlaying: ' + this.props.playingPlaylist)
    return (
      <div>
        <div style={showPlaylistButtons}>
          <button onClick={this.shuffle}>
            Shuffle playlist
          </button>
          <button onClick={this.random}>
            Play random
          </button>
          <button onClick={this.playPrevious}>
            Previous
          </button>
          <button onClick={this.playNext}>
            Next
          </button>
        </div>
      </div>
    )
  }
}

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
  setPlayingVideo
}

const ConnectedPlaylistButtons = connect(mapStateToProps, mapDispatchToProps)(PlaylistButtons)

export default ConnectedPlaylistButtons
