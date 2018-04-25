import React from 'react'
import { connect } from 'react-redux'
import { serverSetOnUse, serverFree } from '../reducers/serverReducer'
import { addFavouriteForUser, removeRelatedFromUser,
  updateRelatedCount, addToUserRelated, addLinkToPlaylist } from '../reducers/userLinksReducer'
import { usersInitialization } from '../reducers/userReducer'
import { searchForRelatedVideos } from '../reducers/ytRelatedVideosReducer'
import { addToPlayingPlaylist } from '../reducers/playlistPlayingReducer'

class AddToUserLinksButtons extends React.Component {
  constructor() {
    super()
    this.state = {
      showPlaylists: false
    }
  }

  togglePlaylists = () => {
    this.setState({
      showPlaylists: !this.state.showPlaylists
    })
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
    /*Tarkistetaan, onko linkki jo käyttäjän related.*/
    let isRelated = false
    let isFavourited = false
    let linkExists
    if (this.props.usersRelated.length !== 0 && this.props.favourites.length !== 0) {
      linkExists = this.props.usersRelated
        .filter(f => f.link.linkId === this.props.videoId)
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
        .filter(l => l.linkId === this.props.videoId)
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
        title: this.props.link.title,
        thumbnail: this.props.link.thumbnail,
        linkId: this.props.videoId
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
          /*let resp = await this.props.updateRelatedCount(usersRelated)
          while (resp === 'error') {
            console.log('YRITETÄÄN UUSIKS')
            resp = await this.props.updateRelatedCount(usersRelated)
          }*/
          updateCounts.push(usersRelated)
          continue
        }
        /*Jos päästään tänne asti, niin linkki voidaan lisätä käyttäjän
        relatedLinkseihin*/
        linksToAdd.push(relatedLinks[i])
      }
      console.log('Kaikkien jälkeen linksToAdd.length: ' + linksToAdd.length)
      console.log('updateCounts: ' + updateCounts.length)
      if (updateCounts.length !== 0 ) {
        await this.props.updateRelatedCount(updateCounts)
      }
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
    console.log('server free')
  }

  addToPlaylist = async (plistId) => {
    /*Backend on kunnossa*/
    await this.props.serverSetOnUse()
    console.log('addToPlaylist YTSearchResult')
    /*Tarkistetaan, onko linkki jo käyttäjän related.*/
    let isRelated = false
    const linkExists = this.props.usersRelated
      .filter(f => f.link.linkId === this.props.videoId)
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
      title: this.props.link.title,
      thumbnail: this.props.link.thumbnail,
      linkId: this.props.videoId
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

      if (isRelated) {
        await this.props.removeRelatedFromUser(linkExists[0].link._id)
        console.log('LINKKI POISTETTU KÄYTTÄJÄN EHDOTUKSISTA!')
      }
      /*Tässä vaiheessa, kun tiedetään että linkin lisääminen on onnistunut,
      voidaan hakea kyseisen videon related videos.*/
      await this.props.searchForRelatedVideos(linkObject.linkId)
      const relatedLinks = this.props.relatedLinks
      console.log('Yotuube apista tulleet linkit: ' + relatedLinks.length)
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
          console.log('Related oli käyttäjän relatedeissa')
          updateCounts.push(usersRelated)
          /*await this.props.updateRelatedCount(usersRelated)*/
          continue
        }
        /*Jos päästään tänne asti, niin linkki voidaan lisätä käyttäjän
        relatedLinkseihin*/
        linksToAdd.push(relatedLinks[i])
      }
      console.log('Kaikkien jälkeen linksToAdd.length: ' + linksToAdd.length)
      console.log('Countti päivitetään: ' + updateCounts.length)
      if (updateCounts.length !== 0) {
        await this.props.updateRelatedCount(updateCounts)
      }
      if (linksToAdd.length !== 0) {
        await this.props.addToUserRelated(linksToAdd)
      }
    } else {
      console.log('Linkkiä ei lisätty soittolistaan')
    }
    await this.props.serverFree()
    console.log('server free')
  }


  render() {
    console.log('Rendering AddToUserLinksButtons')
    const showFavourite = { display: (this.props.favouritesAvailable) ? '' : 'none' }
    const showPlaylist = { display: (this.props.availablePlaylists.length !== 0) ? '' : 'none' }

    return (
      <div>
        <button onClick={this.handleFavourite} style={showFavourite}>
          Add to Favourites
        </button>
        <button onClick={this.togglePlaylists} style={showPlaylist}>
          Add to Playlist
        </button>
        {(this.props.availablePlaylists.length !== 0 && this.state.showPlaylists)
          ? this.props.availablePlaylists.map(p =>
            <button key={p._id} id={p._id} onClick={this.handlePlaylist}>
              Add to {p.title}
            </button>)
          : <div></div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  /*Otetaan vaan tarvittavat käyttöön.*/
  /*Ensin tarkistetaan, onko linkki jo suosikeissa.*/
  const favourites = state.userLinks.favourites
  const playlists = state.userLinks.playlists
  /*const videoId = state.playingVideo.link.linkId*/
  let videoId
  let favouritesAvailable = true
  let availablePlaylists = []
  let link
  if (state.loggedUser === null) {
    videoId = ownProps.link.linkId
    link = ownProps.link
    favouritesAvailable = false
  } else if (ownProps.recommend !== undefined) {
    videoId = ownProps.recommend.linkId
    /*availablePlaylists = state.userLinks.playlists*/
    link = ownProps.recommend
    for (let i = 0; i < favourites.length; i++) {
      if (favourites[i].linkId === videoId) {
        favouritesAvailable = false
        break
      }
    }
    /*Seuraavaksi soittolistat*/
    for (let i = 0; i < playlists.length; i++) {
      let found = false
      for (let j = 0; j < playlists[i].links.length; j++) {
        if (playlists[i].links[j].linkId === videoId) {
          found = true
          break
        }
      }
      if (!found) {
        availablePlaylists.push(playlists[i])
      }
    }
  } else if (ownProps.link !== undefined) {
    videoId = ownProps.link.linkId
    link = ownProps.link
    for (let i = 0; i < favourites.length; i++) {
      if (favourites[i].linkId === videoId) {
        favouritesAvailable = false
        break
      }
    }
    /*Seuraavaksi soittolistat*/
    for (let i = 0; i < playlists.length; i++) {
      let found = false
      for (let j = 0; j < playlists[i].links.length; j++) {
        if (playlists[i].links[j].linkId === videoId) {
          found = true
          break
        }
      }
      if (!found) {
        availablePlaylists.push(playlists[i])
      }
    }
  } else if (ownProps.favourite !== undefined) {
    videoId = ownProps.favourite.linkId
    link = ownProps.favourite
    favouritesAvailable = false
    /*Pelkät soittolistat*/
    for (let i = 0; i < playlists.length; i++) {
      let found = false
      for (let j = 0; j < playlists[i].links.length; j++) {
        if (playlists[i].links[j].linkId === videoId) {
          found = true
          break
        }
      }
      if (!found) {
        availablePlaylists.push(playlists[i])
      }
    }
  } else if (ownProps.playlist !== undefined) {
    videoId = ownProps.playlist.linkId
    link = ownProps.playlist
    for (let i = 0; i < favourites.length; i++) {
      if (favourites[i].linkId === videoId) {
        favouritesAvailable = false
        break
      }
    }
    /*Seuraavaksi soittolistat*/
    for (let i = 0; i < playlists.length; i++) {
      let found = false
      for (let j = 0; j < playlists[i].links.length; j++) {
        if (playlists[i].links[j].linkId === videoId) {
          found = true
          break
        }
      }
      if (!found) {
        availablePlaylists.push(playlists[i])
      }
    }
  }

  return {
    favourites: favourites,
    playlists: playlists,
    videoId: videoId,
    /*link: state.playingVideo.link,*/
    link: link,
    favouritesAvailable: favouritesAvailable,
    availablePlaylists: availablePlaylists,
    serverOnUse: state.serverOnUse,
    usersRelated: state.userLinks.relatedLinks,
    playingPlaylist: state.playingPlaylist,
    relatedLinks: state.relatedLinks
  }
}

const mapDispatchToProps = {
  serverSetOnUse,
  addFavouriteForUser,
  usersInitialization,
  removeRelatedFromUser,
  searchForRelatedVideos,
  updateRelatedCount,
  addToUserRelated,
  serverFree,
  addLinkToPlaylist,
  addToPlayingPlaylist
}

const ConnectedAddToUserLinksButton = connect(mapStateToProps, mapDispatchToProps)(AddToUserLinksButtons)

export default ConnectedAddToUserLinksButton
