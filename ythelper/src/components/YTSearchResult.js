import React from 'react'
import Youtube from 'react-youtube'
import { connect } from 'react-redux'
import { addFavouriteForUser } from '../reducers/userLinksReducer'
import { usersInitialization } from '../reducers/userReducer'
import { addLinkToPlaylist } from '../reducers/userLinksReducer'
import { addToPlayingPlaylist } from '../reducers/playlistPlayingReducer'

class YTSearchResult extends React.Component {
  constructor() {
    super()
    this.state = {
      playVideo: false,
      showPlaylists: false
    }
  }
  /*Ehkä myöhemmin laitetaan searchResult stateen tieto siitä onko video
  näkyvillä vai ei. Tai taas kerran localStorageen.*/
  toggleVisibility = () => {
    this.setState({
      playVideo: !this.state.playVideo
    })
  }

  onReady = (event) => {
    console.log('Video on valmis toistettavaksi')
  }

  onEnd = (event) => {
    /*Ja tänne saadaankin sitten toiminnallisuus soittolistan luomiseksi :DDD*/
    console.log('Video on päättynyt')
  }

  addToFavourites = async (event) => {
    /*Backend kunnossa*/
    console.log('addToFavourites YTSearchResult')
    event.preventDefault()

    /*Tarkistetaan, onko linkki jo käyttäjän linkeissä.*/
    const linkExists = this.props.favourites
      .filter(f => f.linkId === this.props.item.id)
    /*if (linkExists.length === 0) {*/

      /*Pitää varmaan saada myös toi thumbnail tuonne linkkitauluun*/
      const linkObject = {
        title: this.props.item.title,
        thumbnail: this.props.item.thumbnail,
        linkId: this.props.item.id
      }

      const response = await this.props.addFavouriteForUser(linkObject)
      if (response !== 'error') {
        console.log('lisätty')
        await this.props.usersInitialization()
      } else {
        console.log('Ei lisätty')
      }

      /*Tässä pitäisi kentien vielä päivittää kaikkien linkkien tila*/
  /*  } else {
      console.log('Linkki on jo käyttäjän suosikeissa!')
    }*/
  }

  togglePlaylists = () => {
    console.log('togglePlaylists YTSearchResult')
    this.setState({
      showPlaylists: !this.state.showPlaylists
    })
  }

  addToPlaylist = async (event) => {
    /*Backend on kunnossa*/
    console.log('addToPlaylist YTSearchResult')
    event.preventDefault()
    const playlistId = event.target.id
    const linkObject = {
      title: this.props.item.title,
      thumbnail: this.props.item.thumbnail,
      linkId: this.props.item.id
    }
    const response = await this.props.addLinkToPlaylist(linkObject, playlistId)
    if (response !== 'error') {
      console.log('Linkki lisätty soittolistaan!')
      /*Pitää lisätä myös playingPlaylistille*/
      if (this.props.playingPlaylist.playlist !== null &&
        playlistId === this.props.playingPlaylist.playlist._id) {
        await this.props.addToPlayingPlaylist(linkObject)
      }
      this.setState({
        showPlaylists: false
      })
    } else {
      console.log('Linkkiä ei lisätty soittolistaan')
      this.setState({
        showPlaylists: false
      })
    }
  }


  render() {
    console.log('Rendering YTSearchResult')
    /*Toi react-youtube on ihan uskomaton lifesaver*/
    /*Ei haluta edes ladata muita kuin se jonka playVideo muuttui true*/
    if (this.state.playVideo) {
      const showButtons = { display: (this.props.loggedUser !== null) ? '' : 'none' }
      const showPlaylists = { display: (this.state.showPlaylists === true) ? '' : 'none' }
      console.log('this.state.showPlaylists: ' + this.state.showPlaylists)
      console.log('this.props.playlists.length: ' + this.props.playlists.length)
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
          <Youtube
            videoId={this.props.item.id}
            opts={opts}
            onReady={this.onReady}
            onEnd={this.onEnd}
          />
          <button onClick={this.toggleVisibility}>
            Hide
          </button>
          <button onClick={this.addToFavourites} style={showButtons}>
            Add to Favourites
          </button>
          <button onClick={this.togglePlaylists} style={showButtons}>
            Add to Playlist
          </button>
          {this.props.playlists.map(p =>
            <button key={p._id} id={p._id} onClick={this.addToPlaylist} style={showPlaylists}>
              Add to {p.title}
            </button>
          )}
        </div>
      )
    } else {
      return (
        <div>
          <img onClick={this.toggleVisibility}
            src={this.props.item.thumbnail}
            alt={this.props.item.title}
            style={{cursor: 'pointer', display: 'inline-block'}}
          />
          id: {this.props.item.id}, title: {this.props.item.title}
        </div>
      )
    }
  }
}
const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser,
    favourites: state.userLinks.favourites,
    playlists: state.userLinks.playlists,
    playingPlaylist: state.playingPlaylist
  }
}

const mapDispatchToProps = {
  addFavouriteForUser,
  addLinkToPlaylist,
  usersInitialization,
  addToPlayingPlaylist
}

const ConnectedYTSearchResult = connect(mapStateToProps, mapDispatchToProps)(YTSearchResult)

export default ConnectedYTSearchResult
