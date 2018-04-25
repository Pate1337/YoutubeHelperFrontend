import React from 'react'
import { connect } from 'react-redux'
import RecommendedLink from './RecommendedLink'
import { Link } from 'react-router-dom'

class RelatedLinks extends React.Component {
  constructor() {
    super()
    this.state = {
      filter: ''
    }
  }

  handleFilterChange = (event) => {
    this.setState({
      filter: event.target.value
    })
  }
  render() {
    if (this.props.relatedLinks !== undefined && this.props.relatedLinks.length !== 0) {
      const linksToShow =
        this.props.relatedLinks.filter(rLink =>
          rLink.link.title.toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1)
      return (
        <div>
          <h2>Recommended</h2>
          <div>
            Search from recommended
            <input value={this.state.filter} onChange={this.handleFilterChange}/>
          </div>
          <ol>
            {linksToShow.map(l => <li key={l.link._id}><RecommendedLink recommend={l.link} count={l.count} /></li>)}
          </ol>
        </div>
      )
    } else if (this.props.loggedUser === null) {
      return (
        <div>
          <h2>Recommended</h2>
          Recommendations are only for signed up users.&nbsp;
          <Link to='/signup'>Sign up</Link> now!
        </div>
      )
    } else {
      <div>
        <h2>Recommended</h2>
        Search from Youtube and add a video to your favourites or playlists in order to get recommendations.
      </div>
    }

  }
}
/*<ol>
  {linksToShow.map(l => <li key={l.link._id}>{l.link.title}, id: {l.link.linkId} count: {l.count}</li>)}
</ol>*/

const sortByCount = (a, b) => {
  return parseInt(b.count, 10) - parseInt(a.count, 10)
}

const mapStateToProps = (state) => {
  let relatedLinks
  if (state.userLinks.relatedLinks === null || state.userLinks.relatedLinks === undefined
    || state.userLinks.relatedLinks.length == 0) {
    relatedLinks = state.userLinks.relatedLinks
  } else {
    relatedLinks = state.userLinks.relatedLinks.sort(sortByCount)
  }
  return {
    relatedLinks: relatedLinks,
    loggedUser: state.loggedUser
  }
}

const ConnectedRelatedLinks = connect(mapStateToProps)(RelatedLinks)

export default ConnectedRelatedLinks
