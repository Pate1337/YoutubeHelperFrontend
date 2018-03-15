import React from 'react'
import { connect } from 'react-redux'

class YTSearchResults extends React.Component {

  render() {
    console.log('Rendering YTSearchResults')
    return (
      <div>
        {this.props.ytSearchResults}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ytSearchResults: state.ytSearchResults
  }
}

const ConnectedYTSearchResults = connect(mapStateToProps)(YTSearchResults)

export default ConnectedYTSearchResults
