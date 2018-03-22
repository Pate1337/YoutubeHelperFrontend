import React from 'react'
import { connect } from 'react-redux'
import { removeOneFavouriteLink } from '../reducers/userLinksReducer'

class FavouriteLink extends React.Component {
  constructor() {
    super()
  }

  render() {
    console.log('Rendering FavouriteLink')
    return (
      <div>
        <p>{this.props.item.title} <button onClick={this.removeOneFavouriteLink}>Remove From Favorites</button></p>
      </div>
    )
  }

  removeOneFavouriteLink = async (event) => {
    event.preventDefault()
    console.log('test')
    await this.props.removeOneFavouriteLink(this.props.item._id)
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    item: ownProps.item
  }
}

const mapDispatchToProps = {
  removeOneFavouriteLink
}

const ConnectedFavouriteLink = connect(mapStateToProps, mapDispatchToProps)(FavouriteLink)

export default ConnectedFavouriteLink
