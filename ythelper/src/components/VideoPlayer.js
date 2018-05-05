import React from 'react'
import Youtube from 'react-youtube'
import { connect } from 'react-redux'
import { showPlayerBarAndHide, setPlayerTarget, setPlayerPaused,
  setPlayerPlaying, setPlayingVideo } from '../reducers/videoPlayingReducer'
import PlaylistButtons from './PlaylistButtons'
import AddToUserLinksButtons from './AddToUserLinksButtons'
import { playNext } from '../reducers/playlistPlayingReducer'
import { Grid, Popup, Icon, Button, Visibility } from 'semantic-ui-react'
import VisibilitySensor from 'react-visibility-sensor'

class VideoPlayer extends React.Component {
  constructor() {
    super()
    this.state = {
      computerStyle: {
        position: 'relative',
        width: '80%',
        height: '550px'
      },
      mobileStyle: {
        position: 'relative',
        width: '100%',
        height: '300px'
      },
      smallComputerPopup: {
        right: '0%',
        position: 'fixed',
        bottom: '1%',
        zIndex: 1000,
        width: '40%',
        height: '40%'
      },
      bigComputerPopup: {
        right: '0%',
        position: 'fixed',
        bottom: '1%',
        zIndex: 1000,
        width: '25%',
        height: '40%'
      },
      mobilePopup: {
        right: '1%',
        position: 'fixed',
        bottom: '1%',
        zIndex: 1000,
        width: '50%',
        height: '25%'
      },
      popup: false,
      firstLoad: true
    }
  }
/*  playNext = async () => {
    console.log('playNext')
    await this.props.playNext()
  }
*/
  onPlay = async (event) => {
    console.log('onPlay VideoPlayer')
    await this.props.setPlayerPlaying()
    if (this.props.playerTarget === null) {
      console.log('playerTarget === null, joten pauseVideo ja asetetaan')
      event.target.pauseVideo()
      await this.props.setPlayerTarget(event.target)
    } else if (!this.props.playerPlaying) {
      event.target.pauseVideo()
    }
  }

  hidePlayer = async (event) => {
    await this.props.showPlayerBarAndHide()
  }

  pause = async (event) => {
    console.log('pause Player')
    await this.props.setPlayerPaused()
  }

  onEnd = async () => {
    if (this.props.playingPlaylist.playlist !== null) {
      await this.props.playNext()
      await this.props.setPlayingVideo(this.props.playingPlaylist.playlist.links[this.props.index])
    }
  }

  changePosition = (event) => {
    event.preventDefault()
    console.log('changePosition')
    this.setState({
      popup: !this.state.popup
    })
  }

  handleVisibility = (isVisible) => {
    console.log('HADNLEVISIBILITY')
    if (!this.state.firstLoad) {
      if (isVisible) {
        if (this.state.popup) {
          this.setState({
            /*popup: !this.state.popup*/
            popup: false
          })
        }
      } else {
        this.setState({
          /*popup: !this.state.popup*/
          popup: true
        })
      }
    } else {
      if (isVisible) {
        this.setState({
          firstLoad: false
        })
      } else {
        this.setState({
          firstLoad: false,
          /*popup: !this.state.popup*/
          popup: true
        })
      }
    }
  }
/*changePosition = (event) => {
  event.preventDefault()
  this.setState({
    position: {
      right: '1%',
      position: 'fixed',
      top: '10%',
      zIndex: 1000,
      borderStyle: 'solid',
      width: '50%',
      height: '50%'
    }
  })
}*/
  render() {
    console.log('Rendering VideoPlayer')
    const showPlayer = { display: (this.props.playerPlaying && this.props.playedOnce) ? '' : 'none', marginBottom: '10px'}
    const showButtons = { display: (window.innerWidth <= 750 && this.state.popup) ? 'none' : ''}
    const showRelocateButton = { display: (this.state.popup) ? '' : 'none' }
    let opts = null
    if (window.innerWidth <= 750) {
      opts = {
        width: '100%',
        height: '80%',
        playerVars: {
          autoplay: 1,
          rel: 0
        }
      }
    } else {
      opts = {
        width: '100%',
        height: '90%',
        playerVars: {
          autoplay: 1,
          rel: 0
        }
      }
    }
    let changePlayerIcon = null
    let style = null
    let gridStyle = null
    if (!this.state.popup) {
      if (window.innerWidth <= 750) {
        style = this.state.mobileStyle
        gridStyle = {position: 'relative', height: '300px'}
      } else {
        style = this.state.computerStyle
        gridStyle = {position: 'relative', height: '550px'}
      }
      changePlayerIcon = 'compress'
    } else {
      if (window.innerWidth <= 750) {
        style = this.state.mobilePopup
        gridStyle = {position: 'relative', height: '300px'}
      } else if (window.innerWidth <= 1200) {
        style = this.state.smallComputerPopup
        gridStyle = {position: 'relative', height: '550px'}
      } else {
        style = this.state.bigComputerPopup
        gridStyle = {position: 'relative', height: '550px'}
      }
      changePlayerIcon = 'expand'
    }
    console.log('IKKUNAN KOKO' + window.innerWidth + ', ' + window.innerHeight )
    return (
        <div style={showPlayer}>
          <Grid style={gridStyle}>
          <Grid.Column style={style}>
          {(this.props.playingPlaylist.playlist !== null)
            ? <div style={showButtons}>
                <h4>Playing {this.props.playingPlaylist.playlist.title}</h4>
              </div>
            : <div style={showButtons}><h4>Playing {this.props.link.title}</h4></div>
          }
          <Youtube
            id='player'
            videoId={this.props.link.linkId}
            opts={opts}
            onPlay={this.onPlay}
            onPause={this.pause}
            onEnd={this.onEnd}
          />
          <div style={{position: 'relative', zIndex: 20}}>
          <Button icon floated='right' onClick={this.changePosition} style={showRelocateButton}>
            <Icon name={changePlayerIcon} size='large' />
          </Button>
          <div style={showButtons}>
          <Button.Group floated='left'>
            <PlaylistButtons />
          </Button.Group>
          <Button icon floated='right' onClick={this.hidePlayer}>
            <Icon name='hide' size='large' />
          </Button>
          <Popup
            trigger={<Button floated='right' color='blue' icon>
                <Icon name='add' size='large' />
              </Button>}
            content={<AddToUserLinksButtons link={this.props.link} />}
            position='top right'
            on='click'
            hideOnScroll
          />
          </div>
          </div>

          </Grid.Column>
          </Grid>
          <VisibilitySensor offset={{top:135}} onChange={this.handleVisibility} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    link: state.playingVideo.link,
    playerPlaying: state.playingVideo.playerPlaying,
    playerTarget: state.playingVideo.playerTarget,
    playingPlaylist: state.playingPlaylist,
    index: state.playingPlaylist.index,
    playedOnce: state.playingVideo.playedOnce
  }
}

const mapDispatchToProps = {
  showPlayerBarAndHide,
  setPlayerTarget,
  setPlayerPaused,
  setPlayerPlaying,
  setPlayingVideo,
  playNext
}

const ConnectedVideoPlayer = connect(mapStateToProps, mapDispatchToProps)(VideoPlayer)

export default ConnectedVideoPlayer
