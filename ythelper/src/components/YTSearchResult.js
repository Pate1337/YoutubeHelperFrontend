import React from 'react'

class YTSearchResult extends React.Component {

  render() {
    console.log('Rendering YTSearchResult')
    return (
      <div>
        id: {this.props.item.id}, title: {this.props.item.title}
      </div>
    )
  }
}

export default YTSearchResult
