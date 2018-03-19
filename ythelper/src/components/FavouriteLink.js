import React from 'react'

class FavouriteLink extends React.Component {

/*  delete = async (event) => {
    event.preventDefault()

  }*/
  render() {
    console.log('Rendering FavouriteLink')
    return (
      <div>
        {this.props.item.title}
      </div>
    )
  }
}

export default FavouriteLink
