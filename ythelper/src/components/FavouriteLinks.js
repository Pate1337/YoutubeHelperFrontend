import React from 'react'
import { connect } from 'react-redux'
import FavouriteLink from './FavouriteLink'
import { Link } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'

class FavouriteLinks extends React.Component {
  constructor() {
    super()
    this.state = {
      showFavourites: false
    }
  }

  /*toggleVisibility = () => {
    this.setState({
      showFavourites: !this.state.showFavourites
    })
  }*/
  render() {
    console.log('Rendering FavouriteLinks')
    console.log('favouriteLiks.length: ' + this.props.favouriteLinks.length)
    console.log('link._id: ' + this.props.favouriteLinks[0])
    /*const showFavourites = { display: (this.state.showFavourites) ? '' : 'none' }
    const dontShow = { display: (!this.state.showFavourites) ? 'none' : '' }*/
    /*if (this.state.showFavourites) {*/
    if (this.props.loggedUser !== null) {
      return (
        <Grid>
          <Grid.Column>

          <h2>
            My favourites
          </h2>
          {this.props.favouriteLinks.map(link =>
            <FavouriteLink key={link._id} item={link} />
          )}
        </Grid.Column>
        </Grid>
      )
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
  /*  } else {
      return (
        <div>
          <h2 onClick={this.toggleVisibility} style={{cursor: 'pointer', display: 'inline-block'}}>
            Favourites (press to show) ({this.props.favouriteLinks.length})
          </h2>
        </div>
      )
    }*/
  }

}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser,
    /*favouriteLinks: state.favouriteLinks*/
    favouriteLinks: state.userLinks.favourites
  }
}

const ConnectedFavouriteLinks = connect(mapStateToProps)(FavouriteLinks)

export default ConnectedFavouriteLinks
