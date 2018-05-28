import React from 'react'
import { connect } from 'react-redux'
import AddToUserLinksButtons from './AddToUserLinksButtons'
import { initPlayingPlaylist, play, deleteFromPlayingPlaylist, clearPlayingPlaylist } from '../reducers/playlistPlayingReducer'
import { setPlayingVideo } from '../reducers/videoPlayingReducer'
import { Segment, Item, Icon, Button, Dimmer, Popup, Image, Modal, Header, Loader } from 'semantic-ui-react'
import { searchForRelatedVideos } from '../reducers/ytRelatedVideosReducer'
import { setLoading, setLoaded } from '../reducers/loaderReducer'
import { deleteLinkFromPlaylist } from '../reducers/userLinksReducer'

class PlaylistLink extends React.Component {
  constructor() {
    super()
    this.state = {
      showButtons: false,
      active: false,
      modalOpen: false
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
    await this.props.setLoading()
    await this.props.searchForRelatedVideos(this.props.link.linkId, 50)
    await this.props.setLoaded()
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

  removeLink = async () => {
    this.setState({
      modalOpen: false
    })
    const response = await this.props.deleteLinkFromPlaylist(this.props.link, this.props.playlist._id)
    if (response !== 'error') {
      console.log('POISTETTU')
      if (this.props.playingPlaylist.playlist !== null &&
        this.props.playlist._id === this.props.playingPlaylist.playlist._id) {
        console.log('Poistetaan myös playingPlaylistiltä')
        await this.props.deleteFromPlayingPlaylist(this.props.link)
        if (this.props.playingVideo._id === this.props.link._id) {
          await this.props.clearPlayingPlaylist()
        }
      }
    } else {
      console.log('Ei poistettu')
    }
  }

  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    })
  }

  render() {
    console.log('Rendering PlaylistLink')
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
          <Item.Description>id: {this.props.link.linkId}, yolo: {this.props.link._id}</Item.Description>
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
            <Modal trigger={
                <Button title='Remove from playlist' icon compact floated='right' onClick={this.toggleModal}>
                  <Icon name='trash' size='large' />
                </Button>
              }
              open={this.state.modalOpen}
            >
              <Header icon='trash' content='Delete from playlist' />
              <Modal.Content image>
                <Image src={this.props.link.thumbnail} />
                <Modal.Description>
                  <p>Are you sure you want to delete <strong>{this.props.link.title}</strong> from playlist?</p>
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
                <Button color='red' onClick={this.toggleModal}>
                  <Icon name='remove' /> No
                </Button>
                <Button color='green' onClick={this.removeLink}>
                  <Icon name='checkmark' /> Yes
                </Button>
              </Modal.Actions>
            </Modal>
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
    playingPlaylist: state.playingPlaylist,
    playingVideo: state.playingVideo.link
  }
}

const mapDispatchToProps = {
  initPlayingPlaylist,
  setPlayingVideo,
  play,
  searchForRelatedVideos,
  setLoading,
  setLoaded,
  deleteLinkFromPlaylist,
  deleteFromPlayingPlaylist,
  clearPlayingPlaylist
}

const ConnectedPlaylistLink = connect(mapStateToProps, mapDispatchToProps)(PlaylistLink)

export default ConnectedPlaylistLink
