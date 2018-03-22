import React from 'react'
import { connect } from 'react-redux'
import { playNext } from '../reducers/playlistPlayingReducer'
import { playPrevious } from '../reducers/playlistPlayingReducer'
import { shufflePlaylist } from '../reducers/playlistPlayingReducer'
import { showPlayer } from '../reducers/playlistPlayingReducer'
import { playRandom } from '../reducers/playlistPlayingReducer'
import { Player, ControlBar } from 'video-react'
import ReactPlayer from 'react-player'
import ReactPlayerControls from 'react-player-controls'
import Youtube from 'react-youtube'

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
    await this.props.playNext()
  }

  showPlaylist = async (event) => {
    event.preventDefault()
    await this.props.showPlayer()
  }

  random = async (event) => {
    event.preventDefault()
    await this.props.playRandom()
  }

  ready = (event) => {
    console.log('ready')
    event.target.playVideo()
  }

  onPlay = (event) => {
    /*Tänne tulee sit metodi seekTo() jolla saadaan reducerin tuoma
    aika tänne.*/
    /*event.target.seekTo(10, false)*/
    if (event.data == Youtube.PlayerState.PLAYING) {
      console.log('ok tää toimii yolo')
    }
  }

  stateChange = (event) => {
    console.log('Kun toi menee siihen mutoo et sitä ei renderöidä, niin kappas')
  }

  render() {
    console.log('Renderin hiddenPlaylist')
    const showBar = { display: (this.props.hidden === true) ? '' : 'none',
      backgroundColor: 'black', color: 'white'}
    const opts = {
      height: '45',
      width: '300',
      playerVars: {
        autoplay: 1,
        rel: 0,
        autohide: 0,
        showinfo: 0
      },
      frameborder: 0
    }
    if (this.props.playlist !== null && this.props.playerPlaying === false) {
      return (
        <div style={showBar}>
          Playing {this.props.playlist.title}
          <Youtube
            videoId={this.props.playlist.links[this.props.index].linkId}
            opts={opts}
            onEnd={this.playNext}
            onReady={this.ready}
            onPlay={this.onPlay}
          />
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
  console.log('mapStateToProps hiddenPlaylist: ' + state.playingPlaylist.playerPlaying)
  return {
    playlist: state.playingPlaylist.playlist,
    hidden: state.playingPlaylist.hidden,
    index: state.playingPlaylist.index,
    playerPlaying: state.playingPlaylist.playerPlaying
  }
}

const mapDispatchToProps = {
  shufflePlaylist,
  playNext,
  playPrevious,
  showPlayer,
  playRandom
}

const ConnectedHiddenPlaylist = connect(mapStateToProps, mapDispatchToProps)(HiddenPlaylist)

export default ConnectedHiddenPlaylist
