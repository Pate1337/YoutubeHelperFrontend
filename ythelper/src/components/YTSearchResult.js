import React from 'react'
import Youtube from 'react-youtube'
import { connect } from 'react-redux'
import { addFavouriteForUser } from '../reducers/userLinksReducer'
import { usersInitialization } from '../reducers/userReducer'
import { addLinkToPlaylist } from '../reducers/userLinksReducer'
import { addToPlayingPlaylist } from '../reducers/playlistPlayingReducer'
import { searchForRelatedVideos } from '../reducers/ytRelatedVideosReducer'
import { removeRelatedFromUser } from '../reducers/userLinksReducer'
import { addToUserRelated } from '../reducers/userLinksReducer'

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

    /*Tarkistetaan, onko linkki jo käyttäjän related.*/
    const linkExists = this.props.usersRelated
      .filter(f => f.link.linkId === this.props.item.id)
    if (linkExists === undefined || linkExists === null || linkExists.length === 0) {
      /*linkki ei ole käyttäjän related*/
    } else {
      /*Käyttäjän relatedeista pitää poistaa kyseinen linkki.*/
      console.log('LINKKI ON KÄYTTÄJÄN RELATED')
      console.log('LINKIN ID: ' + linkExists[0].link._id)
      await this.props.removeRelatedFromUser(linkExists[0].link._id)
      /*Tää toimii*/
    }
      /*Pitää varmaan saada myös toi thumbnail tuonne linkkitauluun*/
      const linkObject = {
        title: this.props.item.title,
        thumbnail: this.props.item.thumbnail,
        linkId: this.props.item.id
      }

      const response = await this.props.addFavouriteForUser(linkObject)
      if (response !== 'error') {
        console.log('lisätty')
        /*await this.props.usersInitialization()*/
        /*Tässä vaiheessa, kun tiedetään että linkin lisääminen on onnistunut,
        voidaan hakea kyseisen videon related videos.*/
        await this.props.searchForRelatedVideos(linkObject.linkId)
        const relatedLinks = this.props.relatedLinks
        console.log('Haetut related linkit: ')
        relatedLinks.forEach(l => {
          console.log(l.linkId)
        })
        /*console.log('relatedVideos.length: ' + relatedLinks.length)*/
        let linksToAdd = []
        let found = false
        for (let i = 0; i < relatedLinks.length; i++) {
          const favourites = this.props.favourites.find(f => f.linkId === relatedLinks[i].linkId)
          /*favourites = undefined kun ei löydä mitään.*/
          if (favourites !== undefined) {
            /*Tällöin linkkiä ei haluta lisätä related*/
            continue
          }
          for (let j = 0; j < this.props.playlists.length; j++) {
            let playlists = this.props.playlists[j].links.find(l => l.linkId === relatedLinks[i].linkId)
            if (playlists !== undefined) {
              found = true
              /*Tällä playlistillä oli kyseinen linkki.*/
            }
            if (found) {
              break
            }
          }
          if (found) {
            /*Jos jollain playlistillä oli linkki, hypätän seuraavan related*/
            continue
          }
          const usersRelated = this.props.usersRelated.find(l => l.link.linkId === relatedLinks[i].linkId)
          if (usersRelated !== undefined) {
            /*Kyseinen related oli jo käyttäjän relatedLinkeissä*/
            /*Tää pitää tallentaa, jotta saadaan countti päivitettyä*/
            continue
          }
          /*Jos päästään tänne asti, niin linkki voidaan lisätä käyttäjän
          relatedLinkseihin*/
          console.log('Tämä linkki lisätään: ' + relatedLinks[i].title)
          linksToAdd.push(relatedLinks[i])
        }
        console.log('Kaikkien jälkeen linksToAdd.length: ' + linksToAdd.length)
        /*Muuta tämä siten, että yksi kerrallaan lisätään!*/
        await this.props.addToUserRelated(linksToAdd)
        /*Tähän vissii viel se kutsu usersInitialization*/
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
        /*TÄÄLLÄ MOKA, linkObjectilla ei edes ole _id:tä!!*/
        /*Pitää siis hakea äsken lisätty linkki ja lisätä se
        playingPlaylistille*/
        const playlist = this.props.playlists.find(p => p._id === playlistId)
        const link = playlist.links[playlist.links.length - 1]
        await this.props.addToPlayingPlaylist(link)
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
    playingPlaylist: state.playingPlaylist,
    usersRelated: state.userLinks.relatedLinks,
    relatedLinks: state.relatedLinks
  }
}

const mapDispatchToProps = {
  addFavouriteForUser,
  addLinkToPlaylist,
  usersInitialization,
  addToPlayingPlaylist,
  searchForRelatedVideos,
  removeRelatedFromUser,
  addToUserRelated
}

const ConnectedYTSearchResult = connect(mapStateToProps, mapDispatchToProps)(YTSearchResult)

export default ConnectedYTSearchResult
