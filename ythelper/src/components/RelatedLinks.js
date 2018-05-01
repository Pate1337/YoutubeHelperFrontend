import React from 'react'
import { connect } from 'react-redux'
import RecommendedLink from './RecommendedLink'
import { Link } from 'react-router-dom'
import { Item, Sticky, Grid, Input, Segment } from 'semantic-ui-react'

class RelatedLinks extends React.Component {
  constructor() {
    super()
    this.state = {
      filter: ''
    }
  }

  handleContextRef = contextRef => this.setState({ contextRef })

  handleFilterChange = (event) => {
    this.setState({
      filter: event.target.value
    })
  }
  render() {
    const onTop = {
      position: 'relative',
      zIndex: 1
    }
    const { contextRef } = this.state
    if (this.props.relatedLinks !== undefined && this.props.relatedLinks.length !== 0) {
      const linksToShow =
        this.props.relatedLinks.filter(rLink =>
          rLink.link.title.toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1)
      return (
        <Grid>
        <Grid.Column>
        <div ref={this.handleContextRef}>
          <h2>Recommended</h2>
          <Sticky context={contextRef} offset={185} style={onTop}>
            <Input fluid icon='search' value={this.state.filter} onChange={this.handleFilterChange} placeholder='Search...' />
          </Sticky>
          <Item.Group divided>
            {linksToShow.map(l => <RecommendedLink key={l.link._id} recommend={l.link} count={l.count} />)}
          </Item.Group>
        </div>
        </Grid.Column>
        </Grid>
      )
      /*<ol>
        {linksToShow.map(l => <li key={l.link._id}><RecommendedLink recommend={l.link} count={l.count} /></li>)}
      </ol>*/
    } else if (this.props.loggedUser === null) {
      return (
        <div>
          <h2>Recommended</h2>
          Recommendations are only for signed up users.&nbsp;
          <Link to='/signup'>Sign up</Link> now!
        </div>
      )
    } else {
      return (
        <div>
          <h2>Recommended</h2>
          Search from Youtube and add a video to your favourites or playlists in order to get recommendations.
        </div>
      )
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
