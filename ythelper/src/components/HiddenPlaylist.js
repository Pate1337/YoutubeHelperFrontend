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

class HiddenPlaylist extends React.Component {
  /*Lisätään linkin lisäyksen yhteydessä videon pituus, saadaan toi
  palkki toimimaan.*/
  constructor() {
    super()
    this.state = {
      seekDone: false
    }
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
    console.log('playNext')
    await this.props.playNext()
  }

  showPlaylist = async (event) => {
    console.log('SHOWPLAYLIST HIDDENPLAYLIST')
    event.preventDefault()
    await this.props.showPlayer()
    /*Kaivetaan toi Youtube Tagi tänne*/
    /*Laitetaan playeri soimaan*/
    /*Siinä vaiheessa kun playeri rupee soittaan, niin pitää olla tiedossa
    currentTime !!! Eli toi alempi tonne pauseen!*/
    const player = document.getElementById('player')
    player.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*')
    console.log('Playeri rupee soittaan')
    /*Tämä soitin pauselle*/
    const youtube = document.getElementById('youtube')
    youtube.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
    console.log('Palkin pitäis olla pausella')
    /*Tämä jälkeen pausessa päästään laittamaan currentTime*/
  }

  random = async (event) => {
    event.preventDefault()
    await this.props.playRandom()
  }

  onPlay = (event) => {
    /*Ensimmäisellä renderöinnillä!*/
    console.log('onPlay hiddenplaylist.')
    if (!this.props.playedOnce || this.props.playerPlaying) {
      /*Pause vain jos soitin soittaa (eka kerta kun soitin avataan)*/
      event.target.pauseVideo()
    } else {
      /*Eli kun on palkin vuoro soittaa*/
      console.log('Palkki rupes soimaan! Ja Playeri meni paussille')
      /*Tähän seekTo*/
      console.log('Ja currentTime: ' + this.props.currentTime)
      if (!this.state.seekDone) {
        console.log('Nyt kutsutaan seekTo')
        event.target.seekTo(this.props.currentTime)
        this.setState({
          seekDone: true
        })
      }
      /*Nyt tässä metodissa pitää vielä tarkistaa, ettei seekTo
      jää ikuiseen looppiin!!*/
    }
  }

  pause = (event) => {
    /*Sama täällä. Normi paussituksen yhteydessä ei tarvi muuttaa statee.*/
    if (this.props.playerPlaying) {
      console.log('ollaan pausessa')
      const currentTime = event.target.getCurrentTime()
      console.log('currentTime: ' + currentTime)
      this.props.setCurrentTime(currentTime)
      /*Tää on nyt null, koska ekal kerral ei oo renderöity*/
      this.setState({
        seekDone: false
      })
    }
  }


  render() {
    console.log('Renderin hiddenPlaylist')
    const showBar = { display: (this.props.playerPlaying === false) ? '' : 'none',
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
    /*Renderöidään tää heti. Kun playerissä ruvetaan soittamaan, tää on mutella.
    Kun playerissä painetaan pikkupalkki, otetaan tää pois mutelta.
    Kun tää painetaan pois, laitetaan tää taas */
    /*if (this.props.playlist !== null && this.props.playerPlaying === false) {*/
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
  /*  } else {
      return (
        <div></div>
      )
    }*/
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
    currentTime: state.playingPlaylist.currentTime
  }
}

const mapDispatchToProps = {
  shufflePlaylist,
  playNext,
  playPrevious,
  showPlayer,
  playRandom,
  setCurrentTime
}

const ConnectedHiddenPlaylist = connect(mapStateToProps, mapDispatchToProps)(HiddenPlaylist)

export default ConnectedHiddenPlaylist
