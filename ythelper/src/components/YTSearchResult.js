import React from 'react'
import Youtube from 'react-youtube'
import { connect } from 'react-redux'
import { addFavouriteForUser } from '../reducers/userReducer'

class YTSearchResult extends React.Component {
  constructor() {
    super()
    this.state = {
      playVideo: false
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

  addToFavourites = (event) => {
    console.log('addToFavourites YTSearchResult')
    event.preventDefault()
    console.log('loggedUser.id: ' + this.props.loggedUser.id)
    /*loggedUserilla ei ole kenttää links, ei tule loginservicelta.*/
    /*Tarkistetaan, onko linkki jo käyttäjän linkeissä.*/
    const loggedUser = this.props.users.filter(u => u.id === this.props.loggedUser.id)
    console.log('filtteröinnillä saatu loggedUser.links: ' + loggedUser[0].links)
    let linkExists = []
    if (loggedUser[0].links.length !== 0) {
      linkExists = loggedUser[0].links.filter(l => l.linkId === this.props.item.id)
    }
    if (linkExists.length === 0) {
      const url = 'https://www.youtube.com/watch?v=' + this.props.item.id
      console.log('video id: ' + this.props.item.id)
      console.log('video title: ' + this.props.item.title)
      console.log('video url: ' + url)
      const linkObject = {
        title: this.props.item.title,
        url: url,
        linkId: this.props.item.id
      }
      /*Tämä kutsuu siis linkServicen metodia, joka postaa backendiin.
      Siellä linkki lisätään linkkitietokantaan sekä käyttäjän kenttään links*/
      this.props.addFavouriteForUser(linkObject, this.props.loggedUser.id)
      /*Tässä pitäisi kentien vielä päivittää kaikkien linkkien tila*/
    } else {
      console.log('Linkki on jo käyttäjän suosikeissa!')
    }
  }


  render() {
    console.log('Rendering YTSearchResult')
    const showFavouriteButton = { display: this.props.loggedUser !== null ? '' : 'none' }
    /*Toi react-youtube on ihan uskomaton lifesaver*/
    /*Ei haluta edes ladata muita kuin se jonka playVideo muuttui true*/
    if (this.state.playVideo) {
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
          <button onClick={this.addToFavourites}>
            Add to Favourites
          </button>
        </div>
      )
    } else {
      return (
        <div>
          <img onClick={this.toggleVisibility} src={this.props.item.thumbnail} alt={this.props.item.title}/>
          id: {this.props.item.id}, title: {this.props.item.title}
        </div>
      )
    }
  }
}
const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser,
    users: state.users
  }
}

const mapDispatchToProps = {
  addFavouriteForUser
}

const ConnectedYTSearchResult = connect(mapStateToProps, mapDispatchToProps)(YTSearchResult)

export default ConnectedYTSearchResult
