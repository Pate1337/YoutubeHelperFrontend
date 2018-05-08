import React from 'react'
import { connect } from 'react-redux'
import AddToUserLinksButtons from './AddToUserLinksButtons'
import { initPlayingPlaylist, play } from '../reducers/playlistPlayingReducer'
import { setPlayingVideo } from '../reducers/videoPlayingReducer'
import { Item, Icon, Button, Dimmer, Popup, Image } from 'semantic-ui-react'

class PlaylistLink extends React.Component {
  constructor() {
    super()
    this.state = {
      showButtons: false,
      active: false
    }
  }

  toggleButtons = () => {
    this.setState({
      showButtons: !this.state.showButtons
    })
  }

  playVideo = async () => {
    if (this.props.playingPlaylist.playlist === null) {
      console.log('playingPlaylist === null')
      await this.props.initPlayingPlaylist(this.props.playlist)
      const index = this.props.playingPlaylist.playlist.links
        .findIndex(l => this.props.link._id === l._id)
      console.log('indeksi on: ' + index)
      await this.props.play(index)
      await this.props.setPlayingVideo(this.props.playingPlaylist.playlist.links[index])
    } else if (this.props.playingPlaylist.playlist._id !== this.props.playlist._id) {
      await this.props.initPlayingPlaylist(this.props.playlist)
      const index = this.props.playingPlaylist.playlist.links
        .findIndex(l => this.props.link._id === l._id)
      await this.props.play(index)
      await this.props.setPlayingVideo(this.props.playingPlaylist.playlist.links[index])
    } else if (this.props.playingPlaylist.playlist._id === this.props.playlist._id) {
      const index = this.props.playingPlaylist.playlist.links
        .findIndex(l => this.props.link._id === l._id)
      await this.props.play(index)
      await this.props.setPlayingVideo(this.props.playingPlaylist.playlist.links[index])
    }
  }

  handleShow = () => {
    this.setState({
      active: true
    })
  }
  handleHide = () => {
    this.setState({
      active: false
    })
  }

  render() {
    const active = this.state.active
    const content = (
      <Icon name='play' size='huge' />
    )
    return (
      <Item>
        <Item.Image style={{width: '124px'}}>
          <Dimmer.Dimmable
            as={Image}
            dimmed={active}
            dimmer={{ active, content }}
            onMouseEnter={this.handleShow}
            onMouseLeave={this.handleHide}
            src={this.props.link.thumbnail}
            onClick={this.playVideo}
            style={{cursor: 'pointer', position: 'relative', zIndex: 0}}
          />
        </Item.Image>
        <Item.Content>
          <Item.Header>{this.props.link.title}</Item.Header>
          <Item.Description>id: {this.props.link.linkId}</Item.Description>
          <Item.Extra>
            <Popup
              trigger={<Button title='Add to' compact color='blue' icon floated='right'>
                  <Icon name='add' size='large' />
                </Button>}
              content={<AddToUserLinksButtons link={this.props.link} />}
              position='top right'
              on='click'
              hideOnScroll
            />
          </Item.Extra>
        </Item.Content>
      </Item>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    link: ownProps.link,
    playlist: ownProps.playlist,
    playingPlaylist: state.playingPlaylist
  }
}

const mapDispatchToProps = {
  initPlayingPlaylist,
  setPlayingVideo,
  play
}

const ConnectedPlaylistLink = connect(mapStateToProps, mapDispatchToProps)(PlaylistLink)

export default ConnectedPlaylistLink
