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
import { updateRelatedCount } from '../reducers/userLinksReducer'
import { serverSetOnUse } from '../reducers/serverReducer'
import { serverFree } from '../reducers/serverReducer'

class YTSearchResult extends React.Component {
  constructor() {
    super()
    this.state = {
      playVideo: false,
      showPlaylists: false,
      showFavouriteButton: true,
      showPlaylistButton: true
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

  handleFavourite = async () => {
    console.log('this.props.serverOnUse: ' + this.props.serverOnUse)
    const timer = setInterval(() => {
      console.log('intervallia')
      if (!this.props.serverOnUse) {
        this.addToFavourites()
        clearInterval(timer)
      }
    }, 1000)
  }

  handlePlaylist = async (event) => {
    const id = event.target.id
    console.log('this.props.serverOnUse: ' + this.props.serverOnUse)
    const timer = setInterval(() => {
      const playlistId = id
      console.log('intervallia')
      if (!this.props.serverOnUse) {
        this.addToPlaylist(playlistId)
        clearInterval(timer)
      }
    }, 1000)
  }

  addToFavourites = async () => {
    /*Backend kunnossa*/
    await this.props.serverSetOnUse()
    console.log('addToFavourites YTSearchResult')
    this.setState({
      showFavouriteButton: false
    })
    /*Tarkistetaan, onko linkki jo käyttäjän related.*/
    let isRelated = false
    let isFavourited = false
    let linkExists
    if (this.props.usersRelated.length !== 0 && this.props.favourites.length !== 0) {
      linkExists = this.props.usersRelated
        .filter(f => f.link.linkId === this.props.item.linkId)
      if (linkExists === undefined || linkExists === null || linkExists.length === 0) {
        /*linkki ei ole käyttäjän related*/
        console.log('EI OLE RELATED')
      } else {
        /*Käyttäjän relatedeista pitää poistaa kyseinen linkki.*/
        isRelated = true
        /*Tää toimii*/
      }
      /*Tarkistetaan, onko jo suosikeissa*/
      const favExists = this.props.favourites
        .filter(l => l.linkId === this.props.item.linkId)
      if (favExists === undefined || favExists === null || favExists.length === 0) {
        /*linkki ei ole käyttäjän suosikeissa*/
        console.log('EI OLE FAVORITEISSA')
      } else {
        isFavourited = true
      }
    }

    if (!isFavourited) {
      let timeout = false
      const linkObject = {
        title: this.props.item.title,
        thumbnail: this.props.item.thumbnail,
        linkId: this.props.item.linkId
      }
      await this.props.addFavouriteForUser(linkObject)

      console.log('lisätty')
      await this.props.usersInitialization()
      if (isRelated) {
        let remResponse = await this.props.removeRelatedFromUser(linkExists[0].link._id)
        while (remResponse === 'error') {
          console.log('yritetään poistaa uudestaan')
          remResponse = await this.props.removeRelatedFromUser(linkExists[0].link._id)
        }
        console.log('LINKKI POISTETTU KÄYTTÄJÄN EHDOTUKSISTA!')
      }
      /*Tässä vaiheessa, kun tiedetään että linkin lisääminen on onnistunut,
      voidaan hakea kyseisen videon related videos.*/
      await this.props.searchForRelatedVideos(linkObject.linkId)
      const relatedLinks = this.props.relatedLinks

      let linksToAdd = []
      let updateCounts = []
      let found = false
      for (let i = 0; i < relatedLinks.length; i++) {
        const favourites = this.props.favourites.find(f => f.linkId === relatedLinks[i].linkId)

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
          let resp = await this.props.updateRelatedCount(usersRelated)
          while (resp === 'error') {
            console.log('YRITETÄÄN UUSIKS')
            resp = await this.props.updateRelatedCount(usersRelated)
          }
          continue
        }
        /*Jos päästään tänne asti, niin linkki voidaan lisätä käyttäjän
        relatedLinkseihin*/
        linksToAdd.push(relatedLinks[i])
      }
      console.log('Kaikkien jälkeen linksToAdd.length: ' + linksToAdd.length)
      if (linksToAdd.length !== 0) {
        let error = await this.props.addToUserRelated(linksToAdd)
        while (error === 'error') {
          console.log('YRITETÄÄN UUDESTAAN')
          error = await this.props.addToUserRelated(linksToAdd)
        }
      }
    } else {
      console.log('LINKKIÄ EI LISÄTTY SUOSIKEIHIN!')
    }
    await this.props.serverFree()
  }

  togglePlaylists = () => {
    console.log('togglePlaylists YTSearchResult')
    this.setState({
      showPlaylists: !this.state.showPlaylists
    })
  }

  addToPlaylist = async (plistId) => {
    /*Backend on kunnossa*/
    await this.props.serverSetOnUse()
    console.log('addToPlaylist YTSearchResult')
    /*Tarkistetaan, onko linkki jo käyttäjän related.*/
    let isRelated = false
    const linkExists = this.props.usersRelated
      .filter(f => f.link.linkId === this.props.item.linkId)
    if (linkExists === undefined || linkExists === null || linkExists.length === 0) {
      /*linkki ei ole käyttäjän related*/
      console.log('EI OLE RELATED')
    } else {
      /*Käyttäjän relatedeista pitää poistaa kyseinen linkki.*/
      isRelated = true
      /*Tää toimii*/
    }

    const playlistId = plistId
    const linkObject = {
      title: this.props.item.title,
      thumbnail: this.props.item.thumbnail,
      linkId: this.props.item.linkId
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
      if (isRelated) {
        await this.props.removeRelatedFromUser(linkExists[0].link._id)
        console.log('LINKKI POISTETTU KÄYTTÄJÄN EHDOTUKSISTA!')
      }
      /*Tässä vaiheessa, kun tiedetään että linkin lisääminen on onnistunut,
      voidaan hakea kyseisen videon related videos.*/
      await this.props.searchForRelatedVideos(linkObject.linkId)
      const relatedLinks = this.props.relatedLinks
      /*console.log('relatedVideos.length: ' + relatedLinks.length)*/
      let linksToAdd = []
      let updateCounts = []
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
          /*updateCounts.push(l)*/
          await this.props.updateRelatedCount(usersRelated)
          continue
        }
        /*Jos päästään tänne asti, niin linkki voidaan lisätä käyttäjän
        relatedLinkseihin*/
        linksToAdd.push(relatedLinks[i])
      }
      console.log('Kaikkien jälkeen linksToAdd.length: ' + linksToAdd.length)
      if (linksToAdd.length !== 0) {
        await this.props.addToUserRelated(linksToAdd)
      }
    } else {
      console.log('Linkkiä ei lisätty soittolistaan')
      this.setState({
        showPlaylists: false
      })
    }
    await this.props.serverFree()
  }


  render() {
    console.log('Rendering YTSearchResult')
    /*Toi react-youtube on ihan uskomaton lifesaver*/
    /*Ei haluta edes ladata muita kuin se jonka playVideo muuttui true*/
    /*Tuleeko pyyntö ehdotukselta vai listaiksesta*/
    let opts
    if (this.props.oneLinkOnly) {
      opts = {
        height: '315',
        width: '560',
        playerVars: {
          autoplay: 0,
          rel: 0
        }
      }
    } else {
      opts = {
        height: '315',
        width: '560',
        playerVars: {
          autoplay: 1,
          rel: 0
        }
      }
    }
    if (this.state.playVideo) {
      const showPlaylist = { display: (this.props.loggedUser !== null && this.state.showPlaylistButton) ? '' : 'none' }
      const showFavourite = { display: (this.props.loggedUser !== null && this.state.showFavouriteButton) ? '' : 'none' }
      const showPlaylists = { display: (this.state.showPlaylists === true) ? '' : 'none' }
      console.log('this.state.showPlaylists: ' + this.state.showPlaylists)
      console.log('this.props.playlists.length: ' + this.props.playlists.length)

      return (
        <div>
          <Youtube
            videoId={this.props.item.linkId}
            opts={opts}
            onReady={this.onReady}
            onEnd={this.onEnd}
          />
          <button onClick={this.toggleVisibility}>
            Hide
          </button>
          <button onClick={this.handleFavourite} style={showFavourite}>
            Add to Favourites
          </button>
          <button onClick={this.togglePlaylists} style={showPlaylist}>
            Add to Playlist
          </button>
          {this.props.playlists.map(p =>
            <button key={p._id} id={p._id} onClick={this.handlePlaylist} style={showPlaylists}>
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
const mapStateToProps = (state, ownProps) => {
  let oneLinkOnly
  let item
  if (ownProps.suggestion !== undefined) {
    console.log('Saavuttiin ehdotuksesta')
    oneLinkOnly = true
    item = ownProps.suggestion
  } else {
    console.log('Saavuttiin listauksesta')
    oneLinkOnly = false
    item = ownProps.item
  }
  return {
    item: item,
    loggedUser: state.loggedUser,
    favourites: state.userLinks.favourites,
    playlists: state.userLinks.playlists,
    playingPlaylist: state.playingPlaylist,
    usersRelated: state.userLinks.relatedLinks,
    relatedLinks: state.relatedLinks,
    serverOnUse: state.serverOnUse,
    oneLinkOnly: oneLinkOnly
  }
}

const mapDispatchToProps = {
  addFavouriteForUser,
  addLinkToPlaylist,
  usersInitialization,
  addToPlayingPlaylist,
  searchForRelatedVideos,
  removeRelatedFromUser,
  addToUserRelated,
  updateRelatedCount,
  serverSetOnUse,
  serverFree
}

const ConnectedYTSearchResult = connect(mapStateToProps, mapDispatchToProps)(YTSearchResult)

export default ConnectedYTSearchResult
