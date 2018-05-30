import React from 'react'
import { connect } from 'react-redux'
import { Grid, Item, Dimmer, Loader, Segment, Icon, Pagination, Input, Sticky } from 'semantic-ui-react'
import PlaylistLink from './PlaylistLink'
import { setActiveItem } from '../reducers/menuReducer'

class PlaylistView extends React.Component {
  constructor() {
    super()
    this.state = {
      filter: '',
      activePage: 1
    }
  }

  componentDidMount() {
    this.props.setActiveItem('/myPlaylists')
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
    if (this.props.playlist !== undefined) {
      const onTop = {
        position: 'relative',
        zIndex: 1
      }
      let boundaryRange = 1
      let showEllipsis = true
      let paginationWidth = {}
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
      const linksToShow =
        this.props.playlist.links.filter(pLink =>
          pLink.title.toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1)
      const totalPages = Math.ceil(linksToShow.length / 20)
      let startIndex = 0
      if (this.state.activePage > 1) {
        startIndex = (this.state.activePage - 1) * 20
      }
      let linksAtPage = []
      let i = 0
      while (i < 20) {
        if (startIndex === linksToShow.length || linksToShow.length === 0) {
          break
        }
        linksAtPage.push(linksToShow[startIndex])
        startIndex++
        i++
      }
      const placeholder = 'Search from ' + this.props.playlist.title + '...'
    return (
      <Grid>
        <Grid.Column>
          <div ref={this.handleContextRef}>
          <h2>{this.props.playlist.title} ({this.props.playlist.links.length})</h2>
          <div style={{height: '40px'}}>
            <Sticky context={contextRef} offset={135} style={onTop}>
              <Input fluid icon='search' value={this.state.filter} onChange={this.handleFilterChange} placeholder={placeholder} />
            </Sticky>
          </div>
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
          <Item.Group divided unstackable>
            {(linksAtPage !== 0)
              ? linksAtPage.map(l => <PlaylistLink key={l._id} link={l} playlist={this.props.playlist} />)
              : <div></div>
            }
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
  } else {
    return (
      <Segment style={{position: 'fixed', top: 0, right: 0, width: window.innerWidth, height: window.innerHeight}} basic>
        <Dimmer active inverted>
          <Loader size='large'>Loading...</Loader>
        </Dimmer>
      </Segment>
    )
  }
  }
}

const mapStateToProps = (state, ownProps) => {
  let playlist
  if (state.playingPlaylist.playlist === null) {
    playlist = ownProps.playlist
  } else if (state.playingPlaylist.playlist._id === ownProps.playlist._id) {
    playlist = state.playingPlaylist.playlist
  } else {
    playlist = ownProps.playlist
  }
  return {
    playlist: playlist,
    playerPlaying: state.playingVideo.playerPlaying
  }
}

const mapDispatchToProps = {
  setActiveItem
}

const ConnectedPlaylistView = connect(mapStateToProps, mapDispatchToProps)(PlaylistView)

export default ConnectedPlaylistView
