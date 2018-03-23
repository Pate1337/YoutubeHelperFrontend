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
import { setCurrentTime } from '../reducers/playlistPlayingReducer'
import { seekDone } from '../reducers/playlistPlayingReducer'
import { seekRequired } from '../reducers/playlistPlayingReducer'

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
    await this.props.playNext()
  }

  showPlaylist = async (event) => {
    event.preventDefault()
    await this.props.showPlayer()

    const youtube = document.getElementById('youtube')
    console.log('AIKA kun lähtee: ' + Date.now())
    youtube.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
    /*await this.props.seekRequired()*/
    const player = document.getElementById('player')
    /*Pakko vetää timeoutti et toi helvetin postMessage kerkee pauseen ton*/
    console.log('this.props.currentTime ennen ku lähtee: ' + this.props.currentTime)
    setTimeout(() => {
      const data = {event: 'command', func: 'seekTo', args: [this.props.currentTime + 0.1, true]}
      const message = JSON.stringify(data)
      player.contentWindow.postMessage(message, '*')
      player.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*')
    }, 30)
  }

  random = async (event) => {
    event.preventDefault()
    await this.props.playRandom()
  }

  onPlay = async (event) => {
    /*Ensimmäisellä renderöinnillä!*/
    if (!this.props.playedOnce || this.props.playerPlaying) {
      event.target.pauseVideo()
    } /*else {

      if (this.props.needSeek) {
        console.log('TARVII SEEKATA')
        event.target.seekTo(this.props.currentTime)
        await this.props.seekDone()
      }
    }*/
  }

  pause = async (event) => {
    console.log('pause HiddenPlayer')
    const currentTime = event.target.getCurrentTime()
    console.log('gecurrentTime() pausessa: ' + currentTime)
    await this.props.setCurrentTime(currentTime, Date.now())
    console.log('this.props.currentTime pausessa: ' + this.props.currentTime)
  }


  render() {
    console.log('Renderin hiddenPlaylist')
    const showBar = { display: (this.props.playerPlaying === false) ? '' : 'none',
      backgroundColor: 'black', color: 'white'}
    const opts = {
      height: '45',
      width: '400',
      playerVars: {
        autoplay: 1,
        rel: 0,
        autohide: 0,
        showinfo: 0
      },
      frameborder: 0
    }
    return (
      <div id='playlistBar' style={showBar}>
        Playing {this.props.playlist.title}
        <Youtube
          id='youtube'
          videoId={this.props.playlist.links[this.props.index].linkId}
          opts={opts}
          onEnd={this.playNext}
          onPlay={this.onPlay}
          onPause={this.pause}
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
  }
}

const mapStateToProps = (state) => {
  console.log('mapStateToProps hiddenPlaylist: ' + state.playingPlaylist.playerPlaying)
  let playlist
  if (state.playingPlaylist.playlist === null) {
    playlist = {
      title: 'testi',
      links: [{
        title: 'testi',
        linkId: 'CbefkFUWW_g'
      }]
    }
  } else {
    playlist = state.playingPlaylist.playlist
  }
  return {
    playlist: playlist,
    index: state.playingPlaylist.index,
    playerPlaying: state.playingPlaylist.playerPlaying,
    playedOnce: state.playingPlaylist.playedOnce,
    currentTime: state.playingPlaylist.currentTime,
    startTime: state.playingPlaylist.startTime,
    needSeek: state.playingPlaylist.needSeek
  }
}

const mapDispatchToProps = {
  shufflePlaylist,
  playNext,
  playPrevious,
  showPlayer,
  playRandom,
  setCurrentTime,
  seekDone,
  seekRequired
}

const ConnectedHiddenPlaylist = connect(mapStateToProps, mapDispatchToProps)(HiddenPlaylist)

export default ConnectedHiddenPlaylist
