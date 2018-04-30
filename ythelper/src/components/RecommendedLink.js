import React from 'react'
import { connect } from 'react-redux'
import { setPlayingVideo } from '../reducers/videoPlayingReducer'
import AddToUserLinksButtons from './AddToUserLinksButtons'
import { clearPlayingPlaylist } from '../reducers/playlistPlayingReducer'
import { Dimmer, Icon, Image } from 'semantic-ui-react'

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
      <div>
        <Icon name='play' size='huge' />
      </div>
    )
    return (
      <div>
        <Dimmer.Dimmable
          as={Image}
          dimmed={active}
          dimmer={{ active, content }}
          onMouseEnter={this.handleShow}
          onMouseLeave={this.handleHide}
          src={this.props.recommend.thumbnail}
          onClick={this.playVideo}
          style={{cursor: 'pointer', display: 'inline-block'}}
        />
        id: {this.props.recommend.linkId}, title: {this.props.recommend.title}, count: {this.props.count}
        {(!this.state.showButtons)
          ? <button onClick={this.toggleButtons}>Add to</button>
          : <div><AddToUserLinksButtons recommend={this.props.recommend} />
            <button onClick={this.toggleButtons}>Back</button></div>
        }
      </div>
    )
  }
}
/*<img onClick={this.playVideo}
  src={this.props.recommend.thumbnail}
  alt={this.props.recommend.title}
  style={{cursor: 'pointer', display: 'inline-block'}}
/>*/
const mapDispatchToProps = {
  setPlayingVideo,
  clearPlayingPlaylist
}

const ConnectedRecommendedLink = connect(null, mapDispatchToProps)(RecommendedLink)

export default ConnectedRecommendedLink
