/*import React from 'react'
import Youtube from 'react-youtube'
import { connect } from 'react-redux'
import { playNext, seekDone, setCurrentTime, playRandom, shufflePlaylist,
 playPrevious, play, showPlayer, seekRequired, hidePlayer } from '../reducers/playlistPlayingReducer'

class Player extends React.Component {
  constructor() {
    super()
    this.state = {
      sendSeek: false
    }
  }
  playNext = async () => {
    console.log('playNext')
    await this.props.playNext()
  }

  onPlay = async (event) => {
    console.log('onPlay Player')
    console.log('AIKA KUN PERILLÄ: ' + Date.now())
    console.log('this.props.currentTime: ' + this.props.currentTime)
    console.log('getCurrentTime: ' + event.target.getCurrentTime())
    if (this.props.playerPlaying) {

    } else {
      event.target.pauseVideo()
    }
  }

  pause = (event) => {
    console.log('pause Player, aika: ' + Date.now())


  }

  random = async (event) => {
    event.preventDefault()
    await this.props.playRandom()
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
    console.log('event.target.id: ' + event.target.id)
    const index = this.props.playlist.links.findIndex(l => event.target.id === l._id)
    console.log('indeksi: ' + index)
    await this.props.play(index)
  }

  receiveMessage = async (event) => {
    console.log('event.data: ' + JSON.parse(event.data).info.currentTime)
    window.removeEventListener("message", this.receiveMessage, false)
    const youtube = document.getElementById('youtube')
    const data = {event: 'command', func: 'seekTo', args: [JSON.parse(event.data).info.currentTime, true]}
    const message = JSON.stringify(data)
    youtube.contentWindow.postMessage(message, '*')
    console.log('NYT lähetetään playvideo kutsu, aika : ' + Date.now())
    youtube.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*')
    console.log('Playvideo kutsu lähetetty: ' + Date.now())
  }

  hidePlayer = async (event) => {
    event.preventDefault()
    await this.props.hidePlayer()

    const player = document.getElementById('player')
    console.log('Aika kun pause kutsu lähetetään: ' + Date.now())
    player.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
    window.addEventListener("message", this.receiveMessage, false)


  }

  showPlayer = async (event) => {
    event.preventDefault()
    await this.props.showPlayer()

    const youtube = document.getElementById('youtube')
    youtube.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')


    const player = document.getElementById('player')
    setTimeout(() => {
      const data = {event: 'command', func: 'seekTo', args: [this.props.currentTime + 0.1, true]}
      const message = JSON.stringify(data)
      player.contentWindow.postMessage(message, '*')
      player.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*')
    }, 30)


  }

  render() {
    console.log('Rendering Player')
    const playerShown = { display: (this.props.playerPlaying) ? '' : 'none'}
    const playerNotShown = { display: (this.props.playerPlaying) ? 'none' : ''}
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
  }
}


const mapStateToProps = (state) => {
  return {
    playerPlaying: state.playingPlaylist.playerPlaying,
    playlist: state.playingPlaylist.playlist,
    index: state.playingPlaylist.index,
    needSeek: state.playingPlaylist.needSeek,
    currentTime: state.playingPlaylist.currentTime
  }
}

const mapDispatchToProps = {
  playNext,
  seekDone,
  setCurrentTime,
  playRandom,
  shufflePlaylist,
  playPrevious,
  play,
  showPlayer,
  seekRequired,
  hidePlayer
}

const ConnectedPlayer = connect(mapStateToProps, mapDispatchToProps)(Player)

export default ConnectedPlayer
*/
