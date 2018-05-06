import React from 'react'
import { connect } from 'react-redux'
import AddToUserLinksButtons from './AddToUserLinksButtons'
import { initPlayingPlaylist, play } from '../reducers/playlistPlayingReducer'
import { setPlayingVideo } from '../reducers/videoPlayingReducer'

class PlaylistLink extends React.Component {
  constructor() {
    super()
    this.state = {
      showButtons: false
    }
  }

  toggleButtons = () => {
    this.setState({
      showButtons: !this.state.showButtons
    })
  }

  playVideo = async () => {
    if (this.props.playingPlaylist.playlist === null) {
      console.log('playingPlaylist === null')
      await this.props.initPlayingPlaylist(this.props.playlist)
      const index = this.props.playingPlaylist.playlist.links
        .findIndex(l => this.props.link._id === l._id)
      console.log('indeksi on: ' + index)
      await this.props.play(index)
      await this.props.setPlayingVideo(this.props.playingPlaylist.playlist.links[index])
    } else if (this.props.playingPlaylist.playlist._id !== this.props.playlist._id) {
      await this.props.initPlayingPlaylist(this.props.playlist)
      const index = this.props.playingPlaylist.playlist.links
        .findIndex(l => this.props.link._id === l._id)
      await this.props.play(index)
      await this.props.setPlayingVideo(this.props.playingPlaylist.playlist.links[index])
    } else if (this.props.playingPlaylist.playlist._id === this.props.playlist._id) {
      const index = this.props.playingPlaylist.playlist.links
        .findIndex(l => this.props.link._id === l._id)
      await this.props.play(index)
      await this.props.setPlayingVideo(this.props.playingPlaylist.playlist.links[index])
    }
  }

  render() {
    return (
      <div>
        <img onClick={this.playVideo}
          src={this.props.link.thumbnail}
          alt={this.props.link.title}
          style={{cursor: 'pointer', display: 'inline-block'}}
        />
        id: {this.props.link.linkId}, title: {this.props.link.title}
        {(!this.state.showButtons)
          ? <button onClick={this.toggleButtons}>Add to</button>
          : <div><AddToUserLinksButtons playlist={this.props.link} />
            <button onClick={this.toggleButtons}>Back</button></div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    link: ownProps.link,
    playlist: ownProps.playlist,
    playingPlaylist: state.playingPlaylist
  }
}

const mapDispatchToProps = {
  initPlayingPlaylist,
  setPlayingVideo,
  play
}

const ConnectedPlaylistLink = connect(mapStateToProps, mapDispatchToProps)(PlaylistLink)

export default ConnectedPlaylistLink
