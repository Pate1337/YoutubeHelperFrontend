import React from 'react'
import { connect } from 'react-redux'
/*import PlaylistLink from './PlaylistLink'*/
import { Item, Image, Icon, Dimmer, Modal, Button, Header } from 'semantic-ui-react'

class Playlist extends React.Component {
  constructor() {
    super()
    this.state = {
      active: false,
      modalOpen: false
    }
  }

  onPlaylistClick = (event) => {
    event.preventDefault()
    this.props.history.push(`/myPlaylists/${this.props.playlist._id}`)
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
  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    })
  }
  removePlaylist = () => {
    console.log('Not supported yet!')
    this.setState({
      modalOpen: false
    })
  }

  render() {
    const active = this.state.active
    const content = (
      <Icon name='play' size='huge' />
    )
    let src = 'https://i.ytimg.com/vi/gOaMva1OpWk/default.jpg'
    if (this.props.playlist.links.length !== 0) {
      src = this.props.playlist.links[0].thumbnail
    }
    const onlyForUsers = { display: (this.props.loggedUser !== null) ? '' : 'none'}
    return (

          <Item>
            <Item.Image style={{width: '124px'}}>
              <Dimmer.Dimmable
                as={Image}
                dimmed={active}
                dimmer={{ active, content }}
                onMouseEnter={this.handleShow}
                onMouseLeave={this.handleHide}
                src={src}
                onClick={this.onPlaylistClick}
                label={{ corner: 'right', icon: 'list' }}
                style={{cursor: 'pointer', position: 'relative', zIndex: 0}}
              />
            </Item.Image>
            <Item.Content>
              <Item.Header>{this.props.playlist.title}</Item.Header>
              <Item.Description>Links: {this.props.playlist.links.length}</Item.Description>
              <Item.Extra style={onlyForUsers}>
                <Modal trigger={
                    <Button title='Remove playlist' icon compact floated='right' onClick={this.toggleModal} style={{display: (this.props.sidebar !== undefined) ? 'none' : ''}}>
                      <Icon name='trash' size='large' />
                    </Button>
                  }
                  open={this.state.modalOpen}
                >
                  <Header icon='trash' content='Delete playlist' />
                  <Modal.Content image>
                    <Image src={src} />
                    <Modal.Description>
                      <p>Are you sure you want to delete <strong>{this.props.playlist.title}</strong>?</p>
                    </Modal.Description>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button color='red' onClick={this.toggleModal}>
                      <Icon name='remove' /> No
                    </Button>
                    <Button color='green' onClick={this.removePlaylist}>
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
  let playlist
  if (state.playingPlaylist.playlist === null) {
    playlist = ownProps.item
  } else if (state.playingPlaylist.playlist._id === ownProps.item._id) {
    playlist = state.playingPlaylist.playlist
  } else {
    playlist = ownProps.item
  }
  return {
    playlist: playlist,
    loggedUser: state.loggedUser
  }
}

const ConnectedPlaylist = connect(mapStateToProps)(Playlist)

export default ConnectedPlaylist
