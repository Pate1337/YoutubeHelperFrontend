import React from 'react'
import { connect } from 'react-redux'
import { playNext } from '../reducers/playlistPlayingReducer'
import { playPrevious } from '../reducers/playlistPlayingReducer'
import { shufflePlaylist } from '../reducers/playlistPlayingReducer'
import { showPlayer } from '../reducers/playlistPlayingReducer'
import { ProgressBar, PlayButton } from 'react-player-controls'

class HiddenPlaylist extends React.Component {
  /*Lisätään linkin lisäyksen yhteydessä videon pituus, saadaan toi
  palkki toimimaan.*/

  playPrevious = async (event) => {
    event.preventDefault()
    await this.props.playPrevious()
  }

  shuffle = async (event) => {
    event.preventDefault()
    await this.props.shufflePlaylist()
  }

  playNext = async (event) => {
    console.log('playNext')
    event.preventDefault()
    await this.props.playNext()
  }

  showPlaylist = async (event) => {
    event.preventDefault()
    await this.props.showPlayer()
  }

  render() {
    const showBar = { display: (this.props.hidden === true) ? '' : 'none' }
    if (this.props.playlist !== null) {
      return (
        <div style={showBar}>
          Playing {this.props.playlist.title}
          <button onClick={this.shuffle}>
            Random
          </button>
          <button onClick={this.playPrevious}>
            Previous
          </button>
          <button onClick={this.playNext}>
            Next
          </button>
          <button onClick={this.showPlaylist}>
            Show playlist
          </button>
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    playlist: state.playingPlaylist.playlist,
    hidden: state.playingPlaylist.hidden
  }
}

const mapDispatchToProps = {
  shufflePlaylist,
  playNext,
  playPrevious,
  showPlayer
}

const ConnectedHiddenPlaylist = connect(mapStateToProps, mapDispatchToProps)(HiddenPlaylist)

export default ConnectedHiddenPlaylist
