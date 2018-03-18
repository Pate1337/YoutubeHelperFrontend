import React from 'react'

class Playlist extends React.Component {

  render() {
    console.log('Rendering Playlist')
    return (
      <div>
        title: {this.props.item.title},
        id: {this.props.item._id},
        links: {this.props.item.links.length}
      </div>
    )
  }
}

export default Playlist
