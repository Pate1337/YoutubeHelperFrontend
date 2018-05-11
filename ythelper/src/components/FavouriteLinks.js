import React from 'react'
import { connect } from 'react-redux'
import FavouriteLink from './FavouriteLink'
import { Link } from 'react-router-dom'
import { Grid, Item } from 'semantic-ui-react'
import { setActiveItem } from '../reducers/menuReducer'

class FavouriteLinks extends React.Component {
  constructor() {
    super()
    this.state = {
      showFavourites: false
    }
  }

  componentDidMount() {
    this.props.setActiveItem('/myFavourites')
  }

  render() {
    console.log('Rendering FavouriteLinks')
    console.log('favouriteLiks.length: ' + this.props.favouriteLinks.length)
    console.log('link._id: ' + this.props.favouriteLinks[0])

    if (this.props.loggedUser !== null) {
      return (
        <Grid>
          <Grid.Column>

          <h2>
            My favourites
          </h2>
          <Item.Group divided unstackable>
            {this.props.favouriteLinks.map(link =>
              <FavouriteLink key={link._id} item={link} />
            )}
          </Item.Group>
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
  }

}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser,
    favouriteLinks: state.userLinks.favourites
  }
}

const mapDispatchToProps = {
  setActiveItem
}

const ConnectedFavouriteLinks = connect(mapStateToProps, mapDispatchToProps)(FavouriteLinks)

export default ConnectedFavouriteLinks
