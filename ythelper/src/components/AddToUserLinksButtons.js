import React from 'react'
import { connect } from 'react-redux'
import { serverSetOnUse, serverFree } from '../reducers/serverReducer'
import { addFavouriteForUser, removeRelatedFromUser,
  updateRelatedCount, addToUserRelated, addLinkToPlaylist } from '../reducers/userLinksReducer'
import { usersInitialization } from '../reducers/userReducer'
import { searchForRelatedVideos } from '../reducers/ytRelatedVideosReducer'
import { addToPlayingPlaylist } from '../reducers/playlistPlayingReducer'
import { Button, Icon, Dimmer, Loader } from 'semantic-ui-react'
import { setNotification, hideNotification } from '../reducers/notificationReducer'
import { initPlayingPlaylist, play } from '../reducers/playlistPlayingReducer'

class AddToUserLinksButtons extends React.Component {
  constructor() {
    super()
    this.state = {
      showPlaylists: false,
      showFavourite: true,
      clickedPlaylistId: null
    }
  }

  togglePlaylists = () => {
    this.setState({
      showPlaylists: !this.state.showPlaylists
    })
  }

  handleFavourite = async () => {
    console.log('this.props.serverOnUse: ' + this.props.serverOnUse)
    if (!this.props.serverOnUse) {
      this.setState({
        showFavourite: false
      })
      await this.props.serverSetOnUse()
      this.addToFavourites()
    } else {
      await this.props.setNotification(`${this.props.link.title} was not added to favourites`, 'Try again later', 'error', true)
      setTimeout(async () => {
        await this.props.hideNotification(`${this.props.link.title} was not added to favourites`)
      }, 4000)
    }

    /*const timer = setInterval(() => {
      console.log('intervallia')
      if (!this.props.serverOnUse) {
        this.addToFavourites()
        clearInterval(timer)
      }
    }, 1000)*/
  }

  handlePlaylist = async (event) => {
    const id = event.target.id
    if (!this.props.serverOnUse) {
      this.setState({
        clickedPlaylistId: id
      })
      await this.props.serverSetOnUse()
      this.addToPlaylist(id)
    } else {
      await this.props.setNotification(`${this.props.link.title} was not added to playlist`, 'Try again later', 'error', true)
      setTimeout(async () => {
        await this.props.hideNotification(`${this.props.link.title} was not added to playlist`)
      }, 4000)
    }
    /*console.log('this.props.serverOnUse: ' + this.props.serverOnUse)
    const timer = setInterval(() => {
      const playlistId = id
      console.log('intervallia')
      if (!this.props.serverOnUse) {
        this.addToPlaylist(playlistId)
        clearInterval(timer)
      }
    }, 1000)*/
  }

  addToFavourites = async () => {
    /*await this.props.serverSetOnUse()*/
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
        console.log('Linkki oli related')
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
        console.log('linkki oli jo favouriteissa')
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
      await this.props.setNotification(`${linkObject.title} added to favourites`, '', 'success', true)
      setTimeout(async () => {
        await this.props.hideNotification(`${linkObject.title} added to favourites`)
      }, 4000)

      console.log('linkki lisätty favouritteihin')
      /*await this.props.usersInitialization()*/
      if (isRelated) {
        await this.props.removeRelatedFromUser(linkExists[0].link._id)
        /*while (remResponse === 'error') {
          console.log('yritetään poistaa uudestaan')
          remResponse = await this.props.removeRelatedFromUser(linkExists[0].link._id)
        }*/
        console.log('LINKKI POISTETTU KÄYTTÄJÄN EHDOTUKSISTA!')
      }
      /*Tässä vaiheessa, kun tiedetään että linkin lisääminen on onnistunut,
      voidaan hakea kyseisen videon related videos.*/
      const relatedLinks = await this.props.searchForRelatedVideos(linkObject.linkId, 10)
      /*const relatedLinks = this.props.relatedLinks*/

      console.log('Haettujen related linkkien pituus: ' + relatedLinks.length)
      let linksToAdd = []
      let updateCounts = []
      console.log('Käydään läp ikaikki related linkit')
      for (let i = 0; i < relatedLinks.length; i++) {
        const favourites = this.props.favourites.find(f => f.linkId === relatedLinks[i].linkId)

        if (favourites !== undefined) {
          console.log('Uusi related löytyi favouriteista')
          /*Tällöin linkkiä ei haluta lisätä related*/
          continue
        }
        let found = false
        for (let j = 0; j < this.props.playlists.length; j++) {
          let playlists = this.props.playlists[j].links.find(l => l.linkId === relatedLinks[i].linkId)
          if (playlists !== undefined) {
            console.log('Uusi related oli jo soittolistassa')
            found = true
            /*Tällä playlistillä oli kyseinen linkki.*/
          }
          if (found) {
            console.log('Koska uusi related oli jo playlistillä, ei tarvi käydä muita soittolistoja läpi')
            break
          }
        }
        if (found) {
          console.log('Koska uusi related oli playlistillä, käydään läpi uusi related')
          /*Jos jollain playlistillä oli linkki, hypätän seuraavan related*/
          continue
        }
        const usersRelated = this.props.usersRelated.find(l => l.link.linkId === relatedLinks[i].linkId)
        if (usersRelated !== undefined) {
          console.log('Uusi related löytyi jo relatedeista, joten lisätään counttia')
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
        console.log('Uusi related laitetaan relatedeihin')
      }
      console.log('Kaikkien jälkeen linksToAdd.length: ' + linksToAdd.length)
      console.log('updateCounts: ' + updateCounts.length)
      if (updateCounts.length !== 0 ) {
        await this.props.updateRelatedCount(updateCounts)
      }
      if (linksToAdd.length !== 0) {
        await this.props.addToUserRelated(linksToAdd)
        /*while (error === 'error') {
          console.log('YRITETÄÄN UUDESTAAN')
          error = await this.props.addToUserRelated(linksToAdd)
        }*/
      }
    } else {
      console.log('LINKKIÄ EI LISÄTTY SUOSIKEIHIN!')
      await this.props.setNotification(`${this.props.link.title} is already in favourites`, '', 'error', true)
      setTimeout(async () => {
        await this.props.hideNotification(`${this.props.link.title} is already in favourites`)
      }, 4000)
    }
    await this.props.serverFree()
    console.log('server free')
  }

  addToPlaylist = async (plistId) => {
    /*Backend on kunnossa*/
    /*await this.props.serverSetOnUse()*/
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
      await this.props.setNotification(`${linkObject.title} added to playlist`, '', 'success', true)
      setTimeout(async () => {
        await this.props.hideNotification(`${linkObject.title} added to playlist`)
      }, 4000)
      /*Pitää lisätä myös playingPlaylistille*/
      let playlist = null
      if (this.props.playingPlaylist.playlist !== null &&
        playlistId === this.props.playingPlaylist.playlist._id) {
        /*TÄÄLLÄ MOKA, linkObjectilla ei edes ole _id:tä!!*/
        /*Pitää siis hakea äsken lisätty linkki ja lisätä se
        playingPlaylistille*/
        playlist = this.props.playlists.find(p => p._id === playlistId)
        const link = playlist.links[playlist.links.length - 1]
        await this.props.addToPlayingPlaylist(link)
      } else if (this.props.playingPlaylist.playlist === null) {
        playlist = this.props.playlists.find(p => p._id === playlistId)
        await this.props.initPlayingPlaylist(playlist)
        const index = playlist.links
          .findIndex(l => linkObject.linkId === l.linkId)
        console.log('indeksi on: ' + index)
        await this.props.play(index)
      }

      if (isRelated) {
        await this.props.removeRelatedFromUser(linkExists[0].link._id)
        console.log('LINKKI POISTETTU KÄYTTÄJÄN EHDOTUKSISTA!')
      }
      /*Tässä vaiheessa, kun tiedetään että linkin lisääminen on onnistunut,
      voidaan hakea kyseisen videon related videos.*/
      const relatedLinks = await this.props.searchForRelatedVideos(linkObject.linkId, 10)
      /*const relatedLinks = this.props.relatedLinks*/
      console.log('Yotuube apista tulleet linkit: ' + relatedLinks.length)
      /*console.log('relatedVideos.length: ' + relatedLinks.length)*/
      let linksToAdd = []
      let updateCounts = []
      console.log('Käydään läpi related linkit')
      for (let i = 0; i < relatedLinks.length; i++) {
        const favourites = this.props.favourites.find(f => f.linkId === relatedLinks[i].linkId)
        /*favourites = undefined kun ei löydä mitään.*/
        if (favourites !== undefined) {
          console.log('related oli suosikeissa')
          /*Tällöin linkkiä ei haluta lisätä related*/
          continue
        }
        let found = false
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
          console.log('related oli soittolistalla')
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
        console.log('lisätään related telatedeihin')
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
      await this.props.setNotification(`${this.props.link.title} is already in playlist`, '', 'error', true)
      setTimeout(async () => {
        await this.props.hideNotification(`${this.props.link.title} is already in playlist`)
      }, 4000)
    }
    await this.props.serverFree()
    console.log('server free')
  }


  render() {
    console.log('Rendering AddToUserLinksButtons')
    const showFavourite = { display: (this.props.favouritesAvailable && this.state.showFavourite) ? '' : 'none' }
    const showPlaylist = { display: (this.props.availablePlaylists.length !== 0) ? '' : 'none' }

    return (
      <div style={{width: '210px'}}>
        <h4>Add to</h4>
        <Dimmer active={this.props.serverOnUse}>
          <Loader>Adding link. This will only take few seconds.</Loader>
        </Dimmer>
        <Button.Group vertical fluid basic color='blue'>
          <Button disabled={this.props.serverOnUse} color='blue' icon labelPosition='left' onClick={this.handleFavourite} style={showFavourite}>
            <Icon name='favorite' />
            Favourites
          </Button>
          {(this.props.availablePlaylists.length !== 0)
            ? this.props.availablePlaylists.map(p =>
              <Button disabled={this.props.serverOnUse} color='blue' icon labelPosition='left' key={p._id} id={p._id} onClick={this.handlePlaylist}
                style={{display: (this.state.clickedPlaylistId === p._id) ? 'none' : ''}}>
                <Icon name='list' />
                {p.title}
              </Button>)
            : <div></div>
          }
        </Button.Group>
      </div>
    )
  }
}
/*<Button basic color='blue' fluid icon labelPosition='left' onClick={this.togglePlaylists} style={showPlaylist}>
  <Icon name='add' />
  Playlist
</Button>*/
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
  addToPlayingPlaylist,
  setNotification,
  hideNotification,
  initPlayingPlaylist,
  play
}

const ConnectedAddToUserLinksButton = connect(mapStateToProps, mapDispatchToProps)(AddToUserLinksButtons)

export default ConnectedAddToUserLinksButton
