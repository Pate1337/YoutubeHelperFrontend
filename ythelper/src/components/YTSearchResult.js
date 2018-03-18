import React from 'react'
import Youtube from 'react-youtube'
import { connect } from 'react-redux'
import { addFavouriteForUser } from '../reducers/userReducer'
/*import { usersFavourites } from '../reducers/favouriteLinksReducer'*/
import { userLinks } from '../reducers/userLinksReducer'

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

  addToFavourites = async (event) => {
    console.log('addToFavourites YTSearchResult')
    event.preventDefault()
    console.log('loggedUser.id: ' + this.props.loggedUser.id)
    /*loggedUserilla ei ole kenttää links, ei tule loginservicelta.*/

    /*Tarkistetaan, onko linkki jo käyttäjän linkeissä.*/
    const linkExists = this.props.favourites
      .filter(f => f.linkId === this.props.item.id)
    if (linkExists.length === 0) {
      const url = 'https://www.youtube.com/watch?v=' + this.props.item.id

      /*Pitää varmaan saada myös toi thumbnail tuonne linkkitauluun*/
      const linkObject = {
        title: this.props.item.title,
        url: url,
        linkId: this.props.item.id
      }
      /*Tämä kutsuu siis userServicen metodia, joka postaa backendiin.
      Siellä linkki lisätään linkkitietokantaan sekä käyttäjän kenttään links*/
      await this.props.addFavouriteForUser(linkObject, this.props.loggedUser.id)
      /*await this.props.usersFavourites()*/
      await this.props.userLinks()
      /*Tässä pitäisi kentien vielä päivittää kaikkien linkkien tila*/
    } else {
      console.log('Linkki on jo käyttäjän suosikeissa!')
    }
  }


  render() {
    console.log('Rendering YTSearchResult')
    /*Toi react-youtube on ihan uskomaton lifesaver*/
    /*Ei haluta edes ladata muita kuin se jonka playVideo muuttui true*/
    if (this.state.playVideo) {
      const showFavouriteButton = { display: (this.props.loggedUser !== null) ? '' : 'none' }
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
          <button onClick={this.addToFavourites} style={showFavouriteButton}>
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
    favourites: state.userLinks.favourites
  }
}

const mapDispatchToProps = {
  addFavouriteForUser,
  /*usersFavourites*/
  userLinks
}

const ConnectedYTSearchResult = connect(mapStateToProps, mapDispatchToProps)(YTSearchResult)

export default ConnectedYTSearchResult
