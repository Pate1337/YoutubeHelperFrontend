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

class Playlist extends React.Component {
  /*Laitetaan kaikki statet storeen. Niin arvoja voidaan muuttaa myös
  muissa komponenteissa, esim. Appin ylhäällä olevassa Playlistissä.*/


/*Kutsutaan Reduceria*/
  playNext = async () => {
    console.log('playNext')
    await this.props.playNext()
  }

/*Täällä kutsutaan Reduceria*/
  shuffle = async (event) => {
    event.preventDefault()
    await this.props.shufflePlaylist()
  }

/*Kutsutaan Reduceria*/
  playPrevious = async (event) => {
    event.preventDefault()
    await this.props.playPrevious()
  }

/*Kai se täytyy täälläkin kutsua Reduceria*/
  play = async (event) => {
    event.preventDefault()
    /*Etsitään linkin indeksi taulukossa this.props.playlist.links*/
    const index = this.props.playlist.links.findIndex(l => event.target.id === l._id)
    console.log('index: ' + index)
    await this.props.play(index)
  }

  hidePlayer = async (event) => {
    event.preventDefault()
    await this.props.hidePlayer()
  }

  setPlayingPlaylist = async (event) => {
    event.preventDefault()
    await this.props.initPlayingPlaylist(this.props.anyPlaylist)
  }

  showPlayer = async (event) => {
    event.preventDefault()
    await this.props.showPlayer()
  }

  random = async (event) => {
    event.preventDefault()
    await this.props.playRandom()
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
        const playerShown = { display: (this.props.hidden === false) ? '' : 'none'}
        const playerNotShown = { display: (this.props.hidden === false) ? 'none' : ''}
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
                videoId={this.props.playlist.links[this.props.index].linkId}
                opts={opts}
                onEnd={this.playNext}
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
    hidden: state.playingPlaylist.hidden,
    index: state.playingPlaylist.index,
    playedOnce: state.playingPlaylist.playedOnce
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
  playRandom
}

const ConnectedPlaylist = connect(mapStateToProps, mapDispatchToProps)(Playlist)

export default ConnectedPlaylist
