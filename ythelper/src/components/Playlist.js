import React from 'react'
import Youtube from 'react-youtube'
import { connect } from 'react-redux'
import { shufflePlaylist } from '../reducers/userLinksReducer'

class Playlist extends React.Component {
  constructor(props) {
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

  shuffle = async (event) => {
    event.preventDefault()
    await this.props.shufflePlaylist(this.props.playlist._id)
  }

  playPrevious = (event) => {
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

  play = (event) => {
    event.preventDefault()
    /*Etsitään linkin indeksi taulukossa this.props.playlist.links*/
    const index = this.props.playlist.links.findIndex(l => event.target.id === l._id)
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
      /*hidden = true vaan jos soittolista on jo kertaalleen avattu ja sen jälkeen
      piilotettu.*/

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

export default ConnectedPlaylist
