import React from 'react'
import { connect } from 'react-redux'
import Youtube from 'react-youtube'

class Home extends React.Component {

  render() {
    let random
    let rLink
    let opts
    if (this.props.recommendedLinks !== undefined && this.props.recommendedLinks.length !== 0) {
      opts = {
        height: '315',
        width: '560',
        playerVars: {
          autoplay: 0,
          rel: 0
        }
      }
      random = Math.floor(Math.random() * this.props.recommendedLinks.length)
      rLink = this.props.recommendedLinks[random]
    }
    return (
      <div>
        <h3>Welcome {this.props.loggedUser.username}!</h3>
        <p>Start by searching videos from Youtube.</p>
        <p>
          Soon you will have so many recommended videos that
          you dont even need to search for videos!
        </p>
        {(this.props.recommendedLinks !== undefined
          && this.props.recommendedLinks.length !== 0)
          ? <div>
              <strong>Here is our pick of the day for you:</strong>
              <div>
                <Youtube
                  videoId={rLink.link.linkId}
                  opts={opts}
                />
              </div>
            </div>
          : <div></div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser,
    recommendedLinks: state.userLinks.relatedLinks
  }
}

const ConnectedHome = connect(mapStateToProps)(Home)

export default ConnectedHome
