import React from 'react'
import Youtube from 'react-youtube'
import { connect } from 'react-redux'
import { showPlayerBarAndHide, setPlayerTarget, setPlayerPaused,
  setPlayerPlaying, setPlayingVideo } from '../reducers/videoPlayingReducer'
import PlaylistButtons from './PlaylistButtons'
import AddToUserLinksButtons from './AddToUserLinksButtons'
import { playNext } from '../reducers/playlistPlayingReducer'
import { Grid, Popup, Icon, Button } from 'semantic-ui-react'

class VideoPlayer extends React.Component {
  constructor() {
    super()
    this.state = {
      computerStyle: {
        position: 'relative',
        width: '80%',
        height: '600px'
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
        width: '30%',
        height: '50%'
      },
      mobilePopup: {
        right: '1%',
        position: 'fixed',
        bottom: '1%',
        zIndex: 1000,
        width: '50%',
        height: '20%'
      },
      popup: false
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
    this.setState({
      popup: !this.state.popup
    })
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
    const showPlayer = { display: (this.props.playerPlaying && this.props.playedOnce) ? '' : 'none'}
    const showButtons = { display: (window.innerWidth <= 600 && this.state.popup) ? 'none' : ''}
    const clickVideo = { onClick: (window.innerWidth <= 600 && this.state.popup) ? '' : this.changePosition }
    let opts = null
    if (window.innerWidth <= 600) {
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
        height: '80%',
        playerVars: {
          autoplay: 1,
          rel: 0
        }
      }
    }
    let style = null
    if (!this.state.popup) {
      if (window.innerWidth <= 600) {
        style = this.state.mobileStyle
      } else {
        style = this.state.computerStyle
      }
    } else {
      if (window.innerWidth <= 600) {
        style = this.state.mobilePopup
      } else if (window.innerWidth <= 1200) {
        style = this.state.smallComputerPopup
      } else {
        style = this.state.bigComputerPopup
      }
    }
    console.log('IKKUNAN KOKO' + window.innerWidth + ', ' + window.innerHeight )
    return (
        <div style={showPlayer}>
          <Grid celled>
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

          <div>
          <button onClick={this.changePosition}>
            Change position
          </button>
          <div style={showButtons}>
          <button onClick={this.hidePlayer}>
            Hide player
          </button>
          <PlaylistButtons />
          <Popup
            trigger={<Button compact color='blue' icon>
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

      </div>
    )
  }
}
/*const showPlayer = { display: (this.props.playerPlaying && this.props.playedOnce) ? '' : 'none', width: '100%', height: '500px', borderStyle: 'solid'}*/
/*<div style={showPlayer}>
  <div style={this.state.position}>
  <Grid style={{width: '100%', height: '100%', borderStyle: 'solid'}}>
  <Grid.Column streched='true'>
  {(this.props.playingPlaylist.playlist !== null)
    ? <div>
        <h3>Playing {this.props.playingPlaylist.playlist.title}:&nbsp;
        {this.props.link.title}</h3>
      </div>
    : <div><h3>Playing {this.props.link.title}</h3></div>
  }

  <Youtube
    id='player'
    videoId={this.props.link.linkId}
    opts={opts}
    onPlay={this.onPlay}
    onPause={this.pause}
    onEnd={this.onEnd}
  />
  <div>
  <button onClick={this.hidePlayer}>
    Hide player
  </button>
  <button onClick={this.changePosition}>
    Change position
  </button>
  <PlaylistButtons />
  <Popup
    trigger={<Button compact color='blue' icon floated='right'>
        <Icon name='add' size='large' />
      </Button>}
    content={<AddToUserLinksButtons link={this.props.link} />}
    position='top right'
    on='click'
    hideOnScroll
  />
  </div>
  </Grid.Column>
  </Grid>
  </div>
</div>*/
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
