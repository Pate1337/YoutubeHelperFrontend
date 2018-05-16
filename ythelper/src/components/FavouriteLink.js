import React from 'react'
import { connect } from 'react-redux'
import { removeOneFavouriteLink } from '../reducers/userLinksReducer'
import { usersInitialization } from '../reducers/userReducer'
import { setPlayingVideo } from '../reducers/videoPlayingReducer'
import AddToUserLinksButtons from './AddToUserLinksButtons'
import { clearPlayingPlaylist } from '../reducers/playlistPlayingReducer'
import { Item, Icon, Button, Dimmer, Popup, Image } from 'semantic-ui-react'
import { searchForRelatedVideos } from '../reducers/ytRelatedVideosReducer'

class FavouriteLink extends React.Component {
  constructor() {
    super()
    this.state = {
      showButtons: false,
      active: false
    }
  }

  playVideo = async () => {
    await this.props.setPlayingVideo(this.props.item)
    await this.props.clearPlayingPlaylist()
    await this.props.searchForRelatedVideos(this.props.item.linkId, 50)
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

  render() {
    console.log('Rendering FavouriteLink')
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
            src={this.props.item.thumbnail}
            onClick={this.playVideo}
            style={{cursor: 'pointer', position: 'relative', zIndex: 0}}
          />
        </Item.Image>
        <Item.Content>
          <Item.Header>{this.props.item.title}</Item.Header>
          <Item.Description>id: {this.props.item.linkId}</Item.Description>
          <Item.Extra>
            <Popup
              trigger={<Button title='Add to' compact color='blue' icon floated='right'>
                  <Icon name='add' size='large' />
                </Button>}
              content={<AddToUserLinksButtons favourite={this.props.item} />}
              position='top right'
              on='click'
              hideOnScroll
            />
            <Button title='Remove from favourites' icon compact floated='right' onClick={this.removeOneFavouriteLink}>
              <Icon name='trash' size='large' />
            </Button>
          </Item.Extra>
        </Item.Content>
      </Item>
    )
  }

  removeOneFavouriteLink = async (event) => {
    event.preventDefault()
    console.log('test')
    await this.props.removeOneFavouriteLink(this.props.item._id)
    await this.props.usersInitialization()
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    item: ownProps.item
  }
}

const mapDispatchToProps = {
  removeOneFavouriteLink,
  usersInitialization,
  setPlayingVideo,
  clearPlayingPlaylist,
  searchForRelatedVideos
}

const ConnectedFavouriteLink = connect(mapStateToProps, mapDispatchToProps)(FavouriteLink)

export default ConnectedFavouriteLink
