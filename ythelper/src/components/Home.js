import React from 'react'
import { connect } from 'react-redux'
import Youtube from 'react-youtube'
import RecommendedLink from './RecommendedLink'
import { Item } from 'semantic-ui-react'

class Home extends React.Component {

  render() {
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
              <Item.Group>
                <RecommendedLink recommend={this.props.randomLink} />
              </Item.Group>
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
    recommendedLinks: state.userLinks.relatedLinks,
    randomLink: state.userLinks.randomLink
  }
}

const ConnectedHome = connect(mapStateToProps)(Home)

export default ConnectedHome
