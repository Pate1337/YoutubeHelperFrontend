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
  }

  addToFavourites = async () => {
    let isRelated = false
    let isFavourited = false
    let linkExists
    if (this.props.usersRelated.length !== 0 && this.props.favourites.length !== 0) {
      linkExists = this.props.usersRelated
        .filter(f => f.link.linkId === this.props.videoId)
      if (linkExists === undefined || linkExists === null || linkExists.length === 0) {
        /*linkki ei ole käyttäjän related*/
      } else {
        isRelated = true
      }
      const favExists = this.props.favourites
        .filter(l => l.linkId === this.props.videoId)
      if (favExists === undefined || favExists === null || favExists.length === 0) {
        /*linkki ei ole käyttäjän suosikeissa*/
      } else {
        isFavourited = true
      }
    }

    if (!isFavourited) {
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

      if (isRelated) {
        await this.props.removeRelatedFromUser(linkExists[0].link._id)
      }
      const relatedLinks = await this.props.searchForRelatedVideos(linkObject.linkId, 10)

      let linksToAdd = []
      let updateCounts = []
      for (let i = 0; i < relatedLinks.length; i++) {
        const favourites = this.props.favourites.find(f => f.linkId === relatedLinks[i].linkId)

        if (favourites !== undefined) {
          continue
        }
        let found = false
        for (let j = 0; j < this.props.playlists.length; j++) {
          let playlists = this.props.playlists[j].links.find(l => l.linkId === relatedLinks[i].linkId)
          if (playlists !== undefined) {
            found = true
          }
          if (found) {
            break
          }
        }
        if (found) {
          continue
        }
        const usersRelated = this.props.usersRelated.find(l => l.link.linkId === relatedLinks[i].linkId)
        if (usersRelated !== undefined) {
          updateCounts.push(usersRelated)
          continue
        }
        linksToAdd.push(relatedLinks[i])
      }

      if (updateCounts.length !== 0 ) {
        await this.props.updateRelatedCount(updateCounts)
      }
      if (linksToAdd.length !== 0) {
        await this.props.addToUserRelated(linksToAdd)
      }
    } else {
      await this.props.setNotification(`${this.props.link.title} is already in favourites`, '', 'error', true)
      setTimeout(async () => {
        await this.props.hideNotification(`${this.props.link.title} is already in favourites`)
      }, 4000)
    }
    await this.props.serverFree()
  }

  addToPlaylist = async (plistId) => {
    let isRelated = false
    const linkExists = this.props.usersRelated
      .filter(f => f.link.linkId === this.props.videoId)
    if (linkExists === undefined || linkExists === null || linkExists.length === 0) {

    } else {
      isRelated = true
    }

    const playlistId = plistId
    const linkObject = {
      title: this.props.link.title,
      thumbnail: this.props.link.thumbnail,
      linkId: this.props.videoId
    }
    const response = await this.props.addLinkToPlaylist(linkObject, playlistId)
    if (response !== 'error') {
      await this.props.setNotification(`${linkObject.title} added to playlist`, '', 'success', true)
      setTimeout(async () => {
        await this.props.hideNotification(`${linkObject.title} added to playlist`)
      }, 4000)
      let playlist = null
      if (this.props.playingPlaylist.playlist !== null &&
        playlistId === this.props.playingPlaylist.playlist._id) {
        playlist = this.props.playlists.find(p => p._id === playlistId)
        const link = playlist.links[playlist.links.length - 1]
        await this.props.addToPlayingPlaylist(link)
      } else if (this.props.playingPlaylist.playlist === null) {
        playlist = this.props.playlists.find(p => p._id === playlistId)
        await this.props.initPlayingPlaylist(playlist)
        const index = playlist.links
          .findIndex(l => linkObject.linkId === l.linkId)
        await this.props.play(index)
      }

      if (isRelated) {
        await this.props.removeRelatedFromUser(linkExists[0].link._id)
      }
      const relatedLinks = await this.props.searchForRelatedVideos(linkObject.linkId, 10)
      let linksToAdd = []
      let updateCounts = []
      for (let i = 0; i < relatedLinks.length; i++) {
        const favourites = this.props.favourites.find(f => f.linkId === relatedLinks[i].linkId)
        if (favourites !== undefined) {
          continue
        }
        let found = false
        for (let j = 0; j < this.props.playlists.length; j++) {
          let playlists = this.props.playlists[j].links.find(l => l.linkId === relatedLinks[i].linkId)
          if (playlists !== undefined) {
            found = true
          }
          if (found) {
            break
          }
        }
        if (found) {
          continue
        }
        const usersRelated = this.props.usersRelated.find(l => l.link.linkId === relatedLinks[i].linkId)
        if (usersRelated !== undefined) {
          updateCounts.push(usersRelated)
          continue
        }
        linksToAdd.push(relatedLinks[i])
      }
      if (updateCounts.length !== 0) {
        await this.props.updateRelatedCount(updateCounts)
      }
      if (linksToAdd.length !== 0) {
        await this.props.addToUserRelated(linksToAdd)
      }
    } else {
      await this.props.setNotification(`${this.props.link.title} is already in playlist`, '', 'error', true)
      setTimeout(async () => {
        await this.props.hideNotification(`${this.props.link.title} is already in playlist`)
      }, 4000)
    }
    await this.props.serverFree()
  }


  render() {
    const showFavourite = { display: (this.props.favouritesAvailable && this.state.showFavourite) ? '' : 'none' }

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

const mapStateToProps = (state, ownProps) => {
  const favourites = state.userLinks.favourites
  const playlists = state.userLinks.playlists
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
    link = ownProps.recommend
    for (let i = 0; i < favourites.length; i++) {
      if (favourites[i].linkId === videoId) {
        favouritesAvailable = false
        break
      }
    }
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
