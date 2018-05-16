import React from 'react'
import Youtube from 'react-youtube'
import { connect } from 'react-redux'
import { setPlayingVideo } from '../reducers/videoPlayingReducer'
import AddToUserLinksButtons from './AddToUserLinksButtons'
import { clearPlayingPlaylist } from '../reducers/playlistPlayingReducer'
import { Item, Icon, Button, Dimmer, Popup, Image } from 'semantic-ui-react'
import { searchForRelatedVideos } from '../reducers/ytRelatedVideosReducer'

class YTSearchResult extends React.Component {
  constructor() {
    super()
    this.state = {
      active: false
    }
  }
  playVideo = async () => {
    await this.props.setPlayingVideo(this.props.item)
    await this.props.clearPlayingPlaylist()
    await this.props.searchForRelatedVideos(this.props.item.linkId, 50)
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
    console.log('Rendering YTSearchResult')
    const active = this.state.active
    const content = (
      <Icon name='play' size='huge' />
    )
    let published = null
    if (this.props.item.published !== undefined) {
    for (let i = 0; i < 10; i++) {
      if (published === null) {
        published = this.props.item.published[i]
      } else {
        published = published + this.props.item.published[i]
      }
    }
    }
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
          <Item.Description><strong>Added: </strong>{published}</Item.Description>
          <Item.Description><strong>Views: </strong>{this.props.item.views}</Item.Description>
          <Item.Extra>
            {this.props.loggedUser !== null
              ? <Popup
                  trigger={<Button title='Add to' compact color='blue' icon floated='right'>
                      <Icon name='add' size='large' />
                    </Button>}
                  content={<AddToUserLinksButtons link={this.props.item} />}
                  position='top right'
                  on='click'
                  hideOnScroll
                />
              : <div></div>
            }
          </Item.Extra>
        </Item.Content>
      </Item>
    )
  }
}
/*<Grid.Column>
  <img onClick={this.playVideo}
    src={this.props.item.thumbnail}
    alt={this.props.item.title}
    style={{cursor: 'pointer', display: 'inline-block'}}
  />
  id: {this.props.item.linkId}, title: {this.props.item.title}, count: {this.props.count}
  {this.props.loggedUser !== null
    ? <AddToUserLinksButtons link={this.props.item} />
    : <div></div>
  }
</Grid.Column>*/
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

const ConnectedYTSearchResult = connect(mapStateToProps, mapDispatchToProps)(YTSearchResult)

export default ConnectedYTSearchResult
