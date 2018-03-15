import React from 'react'

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

  render() {
    console.log('Rendering YTSearchResult')
    /*let src = 'https://www.youtube.com/embed/' + this.props.item.id + '?rel=0'*/
    /*Antaa ton ylemmän olla siltä varalta että laitetaan pikkusoittimet*/
    /*Vois laittaa jo pikkusoittimen tohon alkulistausnäkymään.*/
    /*Ei haluta edes ladata muita kuin se jonka playVideo muuttui true*/
    if (this.state.playVideo) {
      let src = 'https://www.youtube.com/embed/' + this.props.item.id + '?rel=0&autoplay=1'
      return (
        <div>
          <iframe
            title={this.props.item.id}
            width="560"
            height="315"
            src={src}
            frameBorder="0"
            allowFullScreen>
          </iframe>
          <button onClick={this.toggleVisibility}>
            Hide
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

export default YTSearchResult
