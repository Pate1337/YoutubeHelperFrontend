import React from 'react'
import { connect } from 'react-redux'
import { setPlayingVideo } from '../reducers/videoPlayingReducer'
import AddToUserLinksButtons from './AddToUserLinksButtons'

class RecommendedLink extends React.Component {
  constructor() {
    super()
    this.state = {
      showButtons: false
    }
  }

  playVideo = async () => {
    await this.props.setPlayingVideo(this.props.recommend)
  }

  toggleButtons = () => {
    this.setState({
      showButtons: !this.state.showButtons
    })
  }

  render() {

    return (
      <div>
        <img onClick={this.playVideo}
          src={this.props.recommend.thumbnail}
          alt={this.props.recommend.title}
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

const mapDispatchToProps = {
  setPlayingVideo
}

const ConnectedRecommendedLink = connect(null, mapDispatchToProps)(RecommendedLink)

export default ConnectedRecommendedLink
