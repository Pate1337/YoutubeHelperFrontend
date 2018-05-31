import React from 'react'
import { connect } from 'react-redux'
import FavouriteLink from './FavouriteLink'
import { Link } from 'react-router-dom'
import { Grid, Item, Pagination, Icon, Sticky, Input } from 'semantic-ui-react'
import { setActiveItem } from '../reducers/menuReducer'

class FavouriteLinks extends React.Component {
  constructor() {
    super()
    this.state = {
      showFavourites: false,
      activePage: 1,
      filter: ''
    }
  }

  componentDidMount() {
    this.props.setActiveItem('/myFavourites')
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
    if (this.props.loggedUser !== null) {
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
      if (this.props.favouriteLinks !== undefined && this.props.favouriteLinks.length !== 0) {
        const linksToShow =
          this.props.favouriteLinks.filter(fLink =>
            fLink.title.toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1)
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

      return (
        <Grid style={{overflow: 'hidden'}}>
          <Grid.Column>
          <div ref={this.handleContextRef}>
          <h2>
            My favourites ({this.props.favouriteLinks.length})
          </h2>
          <div style={{height: '40px'}}>
            <Sticky context={contextRef} offset={135} style={onTop}>
              <Input fluid icon='search' value={this.state.filter} onChange={this.handleFilterChange} placeholder='Search from favourites...' />
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
            {linksAtPage.map(link =>
              <FavouriteLink key={link._id} item={link} />
            )}
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
        <Grid>
          <Grid.Column>
            <h2>My favourites</h2>
          </Grid.Column>
        </Grid>
      )
    }
    } else {
      return (
        <Grid>
        <Grid.Column>
          <h2>
            My favourites
          </h2>
          Favourites are only for signed up users.
          <Link to='/signup'>Create an account</Link> now!
        </Grid.Column>
        </Grid>
      )
    }
  }

}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser,
    favouriteLinks: state.userLinks.favourites,
    playerPlaying: state.playingVideo.playerPlaying
  }
}

const mapDispatchToProps = {
  setActiveItem
}

const ConnectedFavouriteLinks = connect(mapStateToProps, mapDispatchToProps)(FavouriteLinks)

export default ConnectedFavouriteLinks
