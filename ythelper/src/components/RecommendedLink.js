import React from 'react'
import { connect } from 'react-redux'
import { setPlayingVideo } from '../reducers/videoPlayingReducer'
import AddToUserLinksButtons from './AddToUserLinksButtons'
import { clearPlayingPlaylist } from '../reducers/playlistPlayingReducer'
import { Dimmer, Icon, Image, Item, Button, Popup, Segment } from 'semantic-ui-react'

class RecommendedLink extends React.Component {
  constructor() {
    super()
    this.state = {
      showButtons: false,
      active: false
    }
  }

  playVideo = async () => {
    await this.props.setPlayingVideo(this.props.recommend)
    await this.props.clearPlayingPlaylist()
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
            src={this.props.recommend.thumbnail}
            onClick={this.playVideo}
            style={{cursor: 'pointer', position: 'relative', zIndex: 0}}
          />
        </Item.Image>
        <Item.Content>
          <Item.Header>{this.props.recommend.title}</Item.Header>
          <Item.Description>id: {this.props.recommend.linkId}, count: {this.props.count}</Item.Description>
          <Item.Extra>
            <Popup
              trigger={<Button title='Add to' compact color='blue' icon floated='right' onClick={this.toggleButtons}>
                  <Icon name='add' size='large' />
                </Button>}
              content={<AddToUserLinksButtons recommend={this.props.recommend} />}
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
/*<div style={{marginRight: '10px', height: '95px', width: '124px'}}>*/
const mapDispatchToProps = {
  setPlayingVideo,
  clearPlayingPlaylist
}

const ConnectedRecommendedLink = connect(null, mapDispatchToProps)(RecommendedLink)

export default ConnectedRecommendedLink
