import React from 'react'
import { connect } from 'react-redux'
import RecommendedLink from './RecommendedLink'
import { Link } from 'react-router-dom'
import { Item, Sticky, Grid, Input, Segment, Pagination, Icon } from 'semantic-ui-react'

class RelatedLinks extends React.Component {
  constructor() {
    super()
    this.state = {
      filter: '',
      activePage: 1
    }
  }

  handleContextRef = contextRef => this.setState({ contextRef })

  handleFilterChange = (event) => {
    this.setState({
      filter: event.target.value,
      activePage: 1
    })
  }

  handlePaginationChange = (event, { activePage }) => {
    if (window.innerWidth <= 750 && this.props.playerPlaying) {
      window.scrollTo({
        top: 353,
        behaviour: 'smooth'
      })
    } else if (this.props.playerPlaying) {
      window.scrollTo({
        top: 603,
        behaviour: 'smooth'
      })
    } else {
      window.scrollTo({
        top: 53,
        behaviour: 'smooth'
      })
    }
    this.setState({
      activePage
    })
  }

  render() {
    const onTop = {
      position: 'relative',
      zIndex: 1
    }
    let boundaryRange = 1
    let showEllipsis = true
    if (window.innerWidth <= 750) {
      boundaryRange = 0
      showEllipsis = false
    }
    let content
    if (showEllipsis) {
      content = {content: <Icon name='ellipsis horizontal' />, icon: true}
    } else {
      content = null
    }
    const { contextRef } = this.state
    if (this.props.relatedLinks !== undefined && this.props.relatedLinks.length !== 0) {
      const linksToShow =
        this.props.relatedLinks.filter(rLink =>
          rLink.link.title.toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1)
      const totalPages = Math.ceil(linksToShow.length / 20)
      let startIndex = 0
      if (this.state.activePage > 1) {
        startIndex = (this.state.activePage - 1) * 20 - 1
      }
      let linksAtPage = []
      let i = 0
      while (i < 20) {
        if (startIndex === linksToShow.length - 1 || linksToShow.length === 0) {
          break
        }
        linksAtPage.push(linksToShow[startIndex])
        startIndex++
        i++
      }
      return (
        <Grid>
          <Grid.Column>
            <div ref={this.handleContextRef}>
              <h2>Recommended</h2>
              <Sticky context={contextRef} offset={135} style={onTop}>
                <Input fluid icon='search' value={this.state.filter} onChange={this.handleFilterChange} placeholder='Search from recommendations...' />
              </Sticky>
              <div style={{marginTop: '20px'}}>
                <Pagination
                  inverted
                  activePage={this.state.activePage}
                  boundaryRange={boundaryRange}
                  onPageChange={this.handlePaginationChange}
                  siblingRange={1}
                  totalPages={totalPages}
                  ellipsisItem={content}
                  firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                  lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                  prevItem={{ content: <Icon name='angle left' />, icon: true }}
                  nextItem={{ content: <Icon name='angle right' />, icon: true }}
                />
              </div>
              <Item.Group divided>
                {linksAtPage.map(l => <RecommendedLink key={l.link._id} recommend={l.link} count={l.count} />)}
              </Item.Group>
              <div style={{position: 'relative', zIndex: 1001}}>
                <Pagination
                  inverted
                  activePage={this.state.activePage}
                  boundaryRange={boundaryRange}
                  onPageChange={this.handlePaginationChange}
                  siblingRange={1}
                  totalPages={totalPages}
                  ellipsisItem={content}
                  firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                  lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                  prevItem={{ content: <Icon name='angle left' />, icon: true }}
                  nextItem={{ content: <Icon name='angle right' />, icon: true }}
                />
              </div>
            </div>
          </Grid.Column>
        </Grid>
      )
    } else if (this.props.loggedUser === null) {
      return (
        <Grid>
          <Grid.Column>
            <h2>Recommended</h2>
            Recommendations are only for signed up users.&nbsp;
            <Link to='/signup'>Sign up</Link> now!
          </Grid.Column>
        </Grid>
      )
    } else {
      return (
        <Grid>
          <Grid.Column>
            <h2>Recommended</h2>
            Search from Youtube and add a video to your favourites or playlists in order to get recommendations.
          </Grid.Column>
        </Grid>
      )
    }

  }
}

const mapStateToProps = (state) => {
  return {
    relatedLinks: state.userLinks.relatedLinks,
    loggedUser: state.loggedUser,
    playerPlaying: state.playingVideo.playerPlaying
  }
}

const ConnectedRelatedLinks = connect(mapStateToProps)(RelatedLinks)

export default ConnectedRelatedLinks
