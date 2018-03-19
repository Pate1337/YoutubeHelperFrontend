import React from 'react'

class FavouriteLink extends React.Component {

/*  delete = async (event) => {
    event.preventDefault()

  }*/
  render() {
    console.log('Rendering FavouriteLink')
    return (
      <div>
        <p>{this.props.item.title}</p>
      </div>
    )
  }
}

export default FavouriteLink
