import React from 'react'
import { connect } from 'react-redux'
/*import { initPlayingPlaylist } from '../reducers/playlistPlayingReducer'*/
import PlaylistLink from './PlaylistLink'
/*import Player from './Player'*/

class Playlist extends React.Component {
  constructor() {
    super()
    this.state = {
      showPlaylistLinks: false
    }
  }

  /*setPlayingPlaylist = async (event) => {
    event.preventDefault()
    await this.props.initPlayingPlaylist(this.props.anyPlaylist)

    const youtube = document.getElementById('youtube')
    youtube.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
  }*/

  toggleVisibility = () => {
    this.setState({
      showPlaylistLinks: !this.state.showPlaylistLinks
    })
  }

  render() {
    console.log('Rendering Playlist')
    /*if (this.props.playingPlaylist.links.length === 0 ||
      this.props.anyPlaylist.links.length === 0) {
      return (
        <div>
          <h3>{this.props.anyPlaylist.title}, links: {this.props.anyPlaylist.links.length}</h3>
        </div>
      )
    } else {
      if (this.props.playingPlaylist._id === this.props.anyPlaylist._id &&
        this.props.playedOnce === true) {
        return (
          <div>
            <Player />
          </div>
        )
      } else {
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
    }*/
    return (
      <div>
        <div onClick={this.toggleVisibility} style={{cursor: 'pointer', display: 'inline-block'}}>
          <h3>{this.props.playlist.title} </h3> links: {this.props.playlist.links.length}
        </div>
        {(this.state.showPlaylistLinks && this.props.playlist.links.length !== 0)
          ? this.props.playlist.links.map(l => <PlaylistLink key={l._id} link={l} playlist={this.props.playlist} />)
          : <div></div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
/*  let playlist
  if (state.playingPlaylist.playlist === null) {
    playlist = state.userLinks.playlists
      .find(p => p._id === ownProps.item._id)
  } else {
    playlist = state.playingPlaylist.playlist
  }*/
  return {
    /*playingPlaylist: playlist,
    anyPlaylist: ownProps.item,*/
    /*playedOnce: state.playingPlaylist.playedOnce*/
    playlist: ownProps.item
  }
}
/*
const mapDispatchToProps = {
  initPlayingPlaylist
}
*/
const ConnectedPlaylist = connect(mapStateToProps)(Playlist)

export default ConnectedPlaylist
