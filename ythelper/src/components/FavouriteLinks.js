import React from 'react'
import { connect } from 'react-redux'
import FavouriteLink from './FavouriteLink'

class FavouriteLinks extends React.Component {

  render() {
    console.log('Rendering FavouriteLinks')
    console.log('favouriteLiks.length: ' + this.props.favouriteLinks.length)
    console.log('link._id: ' + this.props.favouriteLinks[0])
    return (
      <div>
        <h2>Favourites</h2>
        {this.props.favouriteLinks.map(link =>
          <FavouriteLink key={link._id} item={link} />
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser,
    favouriteLinks: state.favouriteLinks
  }
}

const ConnectedFavouriteLinks = connect(mapStateToProps)(FavouriteLinks)

export default ConnectedFavouriteLinks
