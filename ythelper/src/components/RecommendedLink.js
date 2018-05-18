import React from 'react'
import { connect } from 'react-redux'
import { setPlayingVideo } from '../reducers/videoPlayingReducer'
import AddToUserLinksButtons from './AddToUserLinksButtons'
import { clearPlayingPlaylist } from '../reducers/playlistPlayingReducer'
import { Dimmer, Icon, Image, Item, Button, Popup, Segment, Modal, Header } from 'semantic-ui-react'
import { searchForRelatedVideos } from '../reducers/ytRelatedVideosReducer'

class RecommendedLink extends React.Component {
  constructor() {
    super()
    this.state = {
      showButtons: false,
      active: false,
      modalOpen: false
    }
  }

  playVideo = async () => {
    await this.props.setPlayingVideo(this.props.recommend)
    await this.props.clearPlayingPlaylist()
    await this.props.searchForRelatedVideos(this.props.recommend.linkId, 50)
  }

  toggleButtons = () => {
    this.setState({
      showButtons: !this.state.showButtons
    })
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

  removeLink = () => {
    console.log('Not supported yet')
    this.setState({
      modalOpen: false
    })
  }

  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    })
  }

  render() {
    const active = this.state.active
    const content = (
      <Icon name='play' size='huge' />
    )
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
            src={this.props.recommend.thumbnail}
            onClick={this.playVideo}
            style={{cursor: 'pointer', position: 'relative', zIndex: 0}}
          />
        </Item.Image>
        <Item.Content>
          <Item.Header>{this.props.recommend.title}</Item.Header>
          <Item.Description>id: {this.props.recommend.linkId}, count: {this.props.count}</Item.Description>
          <Item.Extra style={onlyForUsers}>
            <Popup
              trigger={<Button title='Add to' compact color='blue' icon floated='right' onClick={this.toggleButtons}>
                  <Icon name='add' size='large' />
                </Button>}
              content={<AddToUserLinksButtons recommend={this.props.recommend} />}
              position='top right'
              on='click'
              hideOnScroll
            />

            <Modal trigger={
                <Button title='Remove from recommendations' icon compact floated='right' onClick={this.toggleModal} style={{display: (this.props.sidebar !== undefined) ? 'none' : ''}}>
                  <Icon name='trash' size='large' />
                </Button>
              }
              open={this.state.modalOpen}
            >
              <Header icon='trash' content='Delete from recommendations' />
              <Modal.Content image>
                <Image src={this.props.recommend.thumbnail} />
                <Modal.Description>
                  <p>Are you sure you want to delete <strong>{this.props.recommend.title}</strong> from recommendations?</p>
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
/*<div style={{marginRight: '10px', height: '95px', width: '124px'}}>*/
const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser
  }
}
const mapDispatchToProps = {
  setPlayingVideo,
  clearPlayingPlaylist,
  searchForRelatedVideos
}

const ConnectedRecommendedLink = connect(mapStateToProps, mapDispatchToProps)(RecommendedLink)

export default ConnectedRecommendedLink
