import React from 'react'
import { connect } from 'react-redux'
/*import { playNext } from '../reducers/playlistPlayingReducer'
import { playPrevious } from '../reducers/playlistPlayingReducer'
import { shufflePlaylist } from '../reducers/playlistPlayingReducer'
import { showPlayer } from '../reducers/playlistPlayingReducer'
import { playRandom } from '../reducers/playlistPlayingReducer'*/
/*import { Player, ControlBar } from 'video-react'*/
/*import ReactPlayer from 'react-player'
import ReactPlayerControls from 'react-player-controls'*/
import Youtube from 'react-youtube'
/*import { setCurrentTime } from '../reducers/playlistPlayingReducer'
import { seekDone } from '../reducers/playlistPlayingReducer'
import { seekRequired } from '../reducers/playlistPlayingReducer'*/
import { setHiddenPlayerTarget, showPlayerAndHide, setHiddenPaused,
  setHiddenPlaying, setPlayingVideo } from '../reducers/videoPlayingReducer'
import PlaylistButtons from './PlaylistButtons'
import { playNext } from '../reducers/playlistPlayingReducer'
import AddToUserLinksButtons from './AddToUserLinksButtons'

class HiddenPlaylist extends React.Component {
  /*Lisätään linkin lisäyksen yhteydessä videon pituus, saadaan toi
  palkki toimimaan.*/

/*  playPrevious = async (event) => {
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
*/
/*  showPlaylist = async (event) => {
    event.preventDefault()
    await this.props.showPlayer()

    const youtube = document.getElementById('youtube')
    console.log('AIKA kun lähtee: ' + Date.now())
    youtube.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')

    const player = document.getElementById('player')

    console.log('this.props.currentTime ennen ku lähtee: ' + this.props.currentTime)
    setTimeout(() => {
      const data = {event: 'command', func: 'seekTo', args: [this.props.currentTime + 0.1, true]}
      const message = JSON.stringify(data)
      player.contentWindow.postMessage(message, '*')
      player.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*')
    }, 30)
  }
*/
  /*random = async (event) => {
    event.preventDefault()
    await this.props.playRandom()
  }
*/
  onPlay = async (event) => {
    /*Ensimmäisellä renderöinnillä!*/
    console.log('onPlay hiddenPlayer')
    await this.props.setHiddenPlaying()
    if (this.props.hiddenPlayerTarget === null) {
      event.target.pauseVideo()
      await this.props.setHiddenPlayerTarget(event.target)
    } else if (this.props.playerPlaying) {
      event.target.pauseVideo()
    }
  }

  pause = async (event) => {
    console.log('pause HiddenPlayer')
    await this.props.setHiddenPaused()
  }

  showPlayer = async () => {
    console.log('showPlayer hiddenPlaylist')
    await this.props.showPlayerAndHide()
  }

  onEnd = async () => {
    if (this.props.playingPlaylist.playlist !== null) {
      await this.props.playNext()
      await this.props.setPlayingVideo(this.props.playingPlaylist.playlist.links[this.props.index])
    }
  }


  render() {
    console.log('Renderin hiddenPlaylist')
    /* || !this.props.playedOnce tohon showBariin nii saa näkyyn heti alus*/
    const showBar = { display: (this.props.playerPlaying === false) ? '' : 'none',
      backgroundColor: 'black', color: 'white'}
    const opts = {
      height: '45',
      width: '400',
      frameborder: 0,
      playerVars: {
        autoplay: 1,
        rel: 0,
        autohide: 0,
        showinfo: 0
      }
    }
    return (
      <div id='playlistBar' style={showBar}>
        {(this.props.playingPlaylist.playlist !== null)
          ? <div>
              Playing {this.props.playingPlaylist.playlist.title}:&nbsp;
              {this.props.videoTitle}
            </div>
          : <div>Playing {this.props.videoTitle}</div>
        }
        <Youtube
          id='youtube'
          videoId={this.props.videoId}
          opts={opts}
          onEnd={this.onEnd}
          onPlay={this.onPlay}
          onPause={this.pause}
        />
        <button onClick={this.showPlayer}>
          Show player
        </button>
        <PlaylistButtons />
        <AddToUserLinksButtons link={this.props.link} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
/*  console.log('mapStateToProps hiddenPlaylist: ' + state.playingPlaylist.playerPlaying)
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
  }*/
  return {
/*    playlist: playlist,
    index: state.playingPlaylist.index,*/
  /*  playerPlaying: state.playingPlaylist.playerPlaying,*/
  /*  playedOnce: state.playingPlaylist.playedOnce,*/
  /*  currentTime: state.playingPlaylist.currentTime,*/
  /*  startTime: state.playingPlaylist.startTime,*/
  /*  needSeek: state.playingPlaylist.needSeek,*/
    hiddenPlayerTarget: state.playingVideo.hiddenPlayerTarget,
    playerPlaying: state.playingVideo.playerPlaying,
    videoId: state.playingVideo.link.linkId,
    videoTitle: state.playingVideo.link.title,
    link: state.playingVideo.link,
    playingPlaylist: state.playingPlaylist,
    index: state.playingPlaylist.index,
    playedOnce: state.playingVideo.playedOnce
  }
}

const mapDispatchToProps = {
/*  shufflePlaylist,
  playNext,
  playPrevious,*/
/*  showPlayer,*/
  /*playRandom,*/
/*  setCurrentTime,*/
/*  seekDone,
  seekRequired,*/
  setHiddenPlayerTarget,
  showPlayerAndHide,
  setHiddenPaused,
  setHiddenPlaying,
  setPlayingVideo,
  playNext
}

const ConnectedHiddenPlaylist = connect(mapStateToProps, mapDispatchToProps)(HiddenPlaylist)

export default ConnectedHiddenPlaylist
