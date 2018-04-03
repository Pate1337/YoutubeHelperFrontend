import React from 'react'
import { connect } from 'react-redux'
import { playNext, playPrevious, shufflePlaylist, playRandom } from '../reducers/playlistPlayingReducer'

class PlaylistButtons extends React.Component {

  random = async (event) => {
    event.preventDefault()
    await this.props.playRandom()
  }

  playPrevious = async (event) => {
      event.preventDefault()
      await this.props.playPrevious()
  }

  shuffle = async (event) => {
    event.preventDefault()
    await this.props.shufflePlaylist()
  }

  playNext = async (event) => {
    await this.props.playNext()
  }

  render() {
    const showPlaylistButtons = { display: (this.props.playlistPlaying !== null) ? '' : 'none' }
    console.log('playlistPlaying: ' + this.props.playlistPlaying)
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
    playlistPlaying: state.playingPlaylist.playlist
  }
}

const mapDispatchToProps = {
  playNext,
  playPrevious,
  shufflePlaylist,
  playRandom
}

const ConnectedPlaylistButtons = connect(mapStateToProps, mapDispatchToProps)(PlaylistButtons)

export default ConnectedPlaylistButtons
