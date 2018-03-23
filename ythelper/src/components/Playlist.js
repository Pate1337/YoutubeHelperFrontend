import React from 'react'
import { connect } from 'react-redux'
import { initPlayingPlaylist } from '../reducers/playlistPlayingReducer'
import Player from './Player'

class Playlist extends React.Component {

  setPlayingPlaylist = async (event) => {
    event.preventDefault()
    await this.props.initPlayingPlaylist(this.props.anyPlaylist)

    const youtube = document.getElementById('youtube')
    youtube.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
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
      if (this.props.playlist._id === this.props.anyPlaylist._id &&
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
    playedOnce: state.playingPlaylist.playedOnce
  }
}

const mapDispatchToProps = {
  initPlayingPlaylist
}

const ConnectedPlaylist = connect(mapStateToProps, mapDispatchToProps)(Playlist)

export default ConnectedPlaylist
