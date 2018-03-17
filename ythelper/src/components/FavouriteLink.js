import React from 'react'

class FavouriteLink extends React.Component {

  render() {
    console.log('Rendering FavouriteLink')
    return (
      <div>
        <a href={this.props.item.url}>{this.props.item.title}</a>
      </div>
    )
  }
}

export default FavouriteLink
