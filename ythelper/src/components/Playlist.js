import React from 'react'
import Youtube from 'react-youtube'
import { connect } from 'react-redux'

class Playlist extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showPlayer: false,
      links: this.props.item.links,
      index: 0
    }
  }

  toggleVisibility = () => {
    this.setState({
      showPlayer: !this.state.showPlayer
    })
  }

  playNext = (event) => {
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
  render() {
    console.log('Rendering Playlist')
    if (this.props.playlist.links.length === 0) {
      return (
        <div>
          <h3>{this.props.item.title}, links: {this.props.playlist.links.length}</h3>
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
            <h3 onClick={this.toggleVisibility}>{this.props.item.title},
              links: {this.props.playlist.links.length},
              (press to hide)</h3>
            <Youtube
              videoId={this.props.playlist.links[this.state.index].linkId}
              opts={opts}
              onEnd={this.playNext}
            />
          </div>
        )
      } else {
        return (
          <div>
            <h3 onClick={this.toggleVisibility}>{this.props.item.title},
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
    playlist: playlist,
    item: ownProps.item
  }
}

const ConnectedPlaylist = connect(mapStateToProps)(Playlist)

export default ConnectedPlaylist
