import React from 'react'
/*import Youtube from 'react-youtube'*/
import { connect } from 'react-redux'
import { removeOneFavouriteLink } from '../reducers/userLinksReducer'
import { usersInitialization } from '../reducers/userReducer'
import { setPlayingVideo } from '../reducers/videoPlayingReducer'
import AddToUserLinksButtons from './AddToUserLinksButtons'
import { clearPlayingPlaylist } from '../reducers/playlistPlayingReducer'

class FavouriteLink extends React.Component {
  constructor() {
    super()
    this.state = {
      showButtons: false
    }
  }

/*  toggleVisibility = () => {
    this.setState({
      playVideo: !this.state.playVideo
    })
  }*/
  playVideo = async () => {
    await this.props.setPlayingVideo(this.props.item)
    await this.props.clearPlayingPlaylist()
  }

  toggleButtons = () => {
    this.setState({
      showButtons: !this.state.showButtons
    })
  }

  render() {
    console.log('Rendering FavouriteLink')
  /*  if (this.state.playVideo) {
      const showButtons = { display: (this.props.loggedUser !== null) ? '' : 'none' }*/
      //const showPlaylists = { display: (this.state.showPlaylists === true) ? '' : 'none' }
      //console.log('this.state.showPlaylists: ' + this.state.showPlaylists)
      //console.log('this.props.playlists.length: ' + this.props.playlists.length)
    /*  const opts = {
        height: '315',
        width: '560',
        playerVars: {
          autoplay: 1,
          rel: 0
        }
      }
      return (
        <div>
          <Youtube
            videoId={this.props.item.linkId}
            opts={opts}
          />
          <button onClick={this.toggleVisibility}>
            Hide
          </button>
        </div>
      )
    } else {*/
      return (
        <div>
          <img onClick={this.playVideo}
            src={this.props.item.thumbnail}
            alt={this.props.item.title}
            style={{cursor: 'pointer', display: 'inline-block'}}
          />
          id: {this.props.item.linkId}, title: {this.props.item.title}
          <button onClick={this.removeOneFavouriteLink}>Remove From Favorites</button>
          {(!this.state.showButtons)
            ? <button onClick={this.toggleButtons}>Add to</button>
            : <div><AddToUserLinksButtons favourite={this.props.item} />
              <button onClick={this.toggleButtons}>Back</button></div>
          }
        </div>
      )
    /*}*/

  }

  removeOneFavouriteLink = async (event) => {
    event.preventDefault()
    console.log('test')
    await this.props.removeOneFavouriteLink(this.props.item._id)
    await this.props.usersInitialization()
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    item: ownProps.item
  }
}

const mapDispatchToProps = {
  removeOneFavouriteLink,
  usersInitialization,
  setPlayingVideo,
  clearPlayingPlaylist
}

const ConnectedFavouriteLink = connect(mapStateToProps, mapDispatchToProps)(FavouriteLink)

export default ConnectedFavouriteLink
