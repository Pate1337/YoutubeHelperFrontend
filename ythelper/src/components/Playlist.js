/*import React from 'react'
import Youtube from 'react-youtube'
import { connect } from 'react-redux'
import { shufflePlaylist } from '../reducers/userLinksReducer'

class Playlist extends React.Component {*/
  /*Laitetaan kaikki statet storeen. Niin arvoja voidaan muuttaa myös
  muissa komponenteissa, esim. Appin ylhäällä olevassa Playlistissä.*/
/*  constructor(props) {
    super(props)
    this.state = {
      showPlayer: false,
      index: 0,
      hidden: false
    }
  }

  toggleVisibility = () => {
    this.setState({
      showPlayer: !this.state.showPlayer,
      hidden: false
    })
  }
*/
/*Kutsutaan Reduceria*/
/*  playNext = (event) => {
    console.log('playNext')
    if (this.state.index === this.props.playlist.links.length - 1) {
      this.setState({
        index: 0
      })
    } else {
      this.setState({
        index: this.state.index + 1
      })
    }
  }
*/
/*Täällä kutsutaan Reduceria*/
/*  shuffle = async (event) => {
    event.preventDefault()
    await this.props.shufflePlaylist(this.props.playlist._id)
  }
*/
/*Kutsutaan Reduceria*/
/*  playPrevious = (event) => {
    event.preventDefault()
    if (this.state.index === 0) {
      this.setState({
        index: this.props.playlist.links.length - 1
      })
    } else {
      this.setState({
        index: this.state.index - 1
      })
    }
  }
*/
/*Kai se täytyy täälläkin kutsua Reduceria*/
/*  play = (event) => {
    event.preventDefault()*/
    /*Etsitään linkin indeksi taulukossa this.props.playlist.links*/
/*    const index = this.props.playlist.links.findIndex(l => event.target.id === l._id)
    console.log('index: ' + index)
    this.setState({
      index: index
    })
  }

  hidePlayer = () => {
    this.setState({
      hidden: true
    })
  }
*/
/*  render() {
    console.log('Rendering Playlist')
    if (this.props.playlist.links.length === 0) {
      return (
        <div>
          <h3>{this.props.playlist.title}, links: {this.props.playlist.links.length}</h3>
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

      if (this.state.showPlayer) {
        return (
          <div>
            <h3 onClick={this.toggleVisibility}>{this.props.playlist.title},
              links: {this.props.playlist.links.length},
              (press to hide)</h3>
            <Youtube
              videoId={this.props.playlist.links[this.state.index].linkId}
              opts={opts}
              onEnd={this.playNext}
            />
            <button onClick={this.shuffle}>
              Play in random order
            </button>
            <button onClick={this.playPrevious}>
              Previous
            </button>
            <button onClick={this.playNext}>
              Next
            </button>
            <ol>
              {this.props.playlist.links.map(l =>
                <li onClick={this.play} id={l._id} key={l._id}>{l.title}</li>
              )}
            </ol>
          </div>
        )
      } else {
        return (
          <div>
            <h3 onClick={this.toggleVisibility}>{this.props.playlist.title},
            links: {this.props.playlist.links.length},
            (press to play)</h3>
          </div>
        )
      }
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const playlist = state.userLinks.playlists.find(p => p._id === ownProps.item._id)
  return {
    playlist: playlist
  }
}

const mapDispatchToProps = {
  shufflePlaylist
}

const ConnectedPlaylist = connect(mapStateToProps, mapDispatchToProps)(Playlist)

export default ConnectedPlaylist*/

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

  render() {
    console.log('Rendering Playlist')
    if (this.props.playlist.links.length === 0) {
      return (
        <div>
          <h3>{this.props.playlist.title}, links: {this.props.playlist.links.length}</h3>
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
              <h3 onClick={this.hidePlayer}>{this.props.playlist.title},
                links: {this.props.playlist.links.length},
                (press to play in background)</h3>
              <Youtube
                videoId={this.props.playlist.links[this.props.index].linkId}
                opts={opts}
                onEnd={this.playNext}
              />
              <button onClick={this.shuffle}>
                Random
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
                  <li onClick={this.play} id={l._id} key={l._id}>{l.title}</li>
                )}
              </ol>
            </div>
            <div style={playerNotShown}>
              <h3 onClick={this.showPlayer}>{this.props.playlist.title},
              links: {this.props.playlist.links.length},
              (press to play)</h3>
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
            <h3 onClick={this.setPlayingPlaylist}>{this.props.anyPlaylist.title},
            links: {this.props.anyPlaylist.links.length},
            (press to play)</h3>
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
  showPlayer
}

const ConnectedPlaylist = connect(mapStateToProps, mapDispatchToProps)(Playlist)

export default ConnectedPlaylist
