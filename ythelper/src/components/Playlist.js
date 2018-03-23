import React from 'react'
import Youtube from 'react-youtube'
import { connect } from 'react-redux'
import { shufflePlaylist } from '../reducers/playlistPlayingReducer'
import { initPlayingPlaylist } from '../reducers/playlistPlayingReducer'
import { playNext } from '../reducers/playlistPlayingReducer'
import { playPrevious } from '../reducers/playlistPlayingReducer'
import { play } from '../reducers/playlistPlayingReducer'
import { hidePlayer } from '../reducers/playlistPlayingReducer'
import { showPlayer } from '../reducers/playlistPlayingReducer'
import { playRandom } from '../reducers/playlistPlayingReducer'
import { playing } from '../reducers/playlistPlayingReducer'
import { setCurrentTime } from '../reducers/playlistPlayingReducer'
import { seekDone } from '../reducers/playlistPlayingReducer'
import { seekRequired } from '../reducers/playlistPlayingReducer'

class Playlist extends React.Component {

  playNext = async () => {
    console.log('playNext')
    await this.props.playNext()
  }


  shuffle = async (event) => {
    event.preventDefault()
    await this.props.shufflePlaylist()
  }


  playPrevious = async (event) => {
    event.preventDefault()
    await this.props.playPrevious()
  }


  play = async (event) => {
    event.preventDefault()
    const index = this.props.playlist.links.findIndex(l => event.target.id === l._id)
    await this.props.play(index)
  }

  hidePlayer = async (event) => {
    event.preventDefault()
    await this.props.hidePlayer()

    const player = document.getElementById('player')
    player.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')

    await this.props.seekRequired()
    const youtube = document.getElementById('youtube')
    youtube.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*')
  }

  setPlayingPlaylist = async (event) => {
    event.preventDefault()
    await this.props.initPlayingPlaylist(this.props.anyPlaylist)

    const youtube = document.getElementById('youtube')
    youtube.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
  }

  showPlayer = async (event) => {
    event.preventDefault()
    await this.props.showPlayer()

    const youtube = document.getElementById('youtube')
    youtube.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')

    await this.props.seekRequired()
    const player = document.getElementById('player')
    player.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*')

  }

  random = async (event) => {
    event.preventDefault()
    await this.props.playRandom()
  }

  onPlay = async (event) => {
    console.log('needSeek playlist: ' + this.props.needSeek)
    if (this.props.needSeek) {
      console.log('NEED TO SEEK')
      event.target.seekTo(this.props.currentTime)
      await this.props.seekDone()
    }
  }

  pause = (event) => {
    const currentTime = event.target.getCurrentTime()
    this.props.setCurrentTime(currentTime, Date.now())
  }

  render() {
    console.log('Rendering Playlist')
    if (this.props.playlist.links.length === 0 ||
      this.props.anyPlaylist.links.length === 0) {
      return (
        <div>
          <h3>{this.props.anyPlaylist.title}, links: {this.props.anyPlaylist.links.length}</h3>
        </div>
      )
    } else {
      const opts = {
        height: '315',
        width: '560',
        playerVars: {
          autoplay: 1,
          rel: 0
        }
      }
      /*Jos kyseinen soittolista on playingPlaylist ja soittolista on
      kertaalleen soitettu, eli playlistPlaying !== null, sillon näytetään
      koko paska. Eli ekalla kerralla playedOnce = false, joten
      näytetään vain nimet. Kun painetaan playlistia, se laitetaan
      playlistPlayingiin ja asetetaan playedOnce = true. Silloin
      soittolista näytetään, jos id:t täsmäävät, eli listattu soittolista
      on soittovuorossa oleva soittolista.*/
      if (this.props.playlist._id === this.props.anyPlaylist._id &&
        this.props.playedOnce === true) {
        const playerShown = { display: (this.props.playerPlaying) ? '' : 'none'}
        const playerNotShown = { display: (this.props.playerPlaying) ? 'none' : ''}
        return (
          <div>
            <div style={playerShown}>
              <h3>
                <div onClick={this.hidePlayer} style={{cursor: 'pointer', display: 'inline-block'}}>
                  {this.props.playlist.title},
                  links: {this.props.playlist.links.length},
                  (press to play in background)
                </div>
              </h3>
              <Youtube
                id='player'
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
              <br />
              <br />
              <strong>Press song name to play</strong>
              <ol>
                {this.props.playlist.links.map(l =>
                  <li
                    key={l._id}>
                    <div
                      id={l._id}
                      onClick={this.play}
                      style={{cursor: 'pointer', display: 'inline-block'}}
                    >
                      {l.title}
                    </div>
                  </li>
                )}
              </ol>
            </div>
            <div style={playerNotShown}>
              <h3>
                <div onClick={this.showPlayer} style={{cursor: 'pointer', display: 'inline-block'}}>
                  {this.props.playlist.title},
                  links: {this.props.playlist.links.length},
                  (press to play)
                </div>
              </h3>
            </div>
          </div>
        )
      } else {
        /*soittolista ei ole playingPlaylist TAI sitä ei ole kertaakaan soitettu.
        Näytetään vain jotain. Kun ekan kerran painetaan onClicckiä, niin
        playlistPlayedReducer initialisoidaan ja asetetaan myös playedOnce=true.
        Sillon tänne ei päädytä muuta kuin jos soittolista ei ole soitettavana*/
        /*Täällä pitää näyttää muiden kuin playinPlaylistin tiedot.*/
        return (
          <div>
            <h3>
              <div onClick={this.setPlayingPlaylist} style={{cursor: 'pointer', display: 'inline-block'}}>
                {this.props.anyPlaylist.title},
                links: {this.props.anyPlaylist.links.length},
                (press to play)
              </div>
            </h3>
          </div>
        )
      }
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  let playlist
  if (state.playingPlaylist.playlist === null) {
    playlist = state.userLinks.playlists
      .find(p => p._id === ownProps.item._id)
  } else {
    playlist = state.playingPlaylist.playlist
  }
  return {
    playlist: playlist,
    anyPlaylist: ownProps.item,
    index: state.playingPlaylist.index,
    playedOnce: state.playingPlaylist.playedOnce,
    playerPlaying: state.playingPlaylist.playerPlaying,
    currentTime: state.playingPlaylist.currentTime,
    startTime: state.playingPlaylist.startTime,
    needSeek: state.playingPlaylist.needSeek
  }
}

const mapDispatchToProps = {
  initPlayingPlaylist,
  shufflePlaylist,
  playNext,
  playPrevious,
  play,
  hidePlayer,
  showPlayer,
  playRandom,
  setCurrentTime,
  seekDone,
  seekRequired
}

const ConnectedPlaylist = connect(mapStateToProps, mapDispatchToProps)(Playlist)

export default ConnectedPlaylist
