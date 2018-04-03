import React from 'react'
import { connect } from 'react-redux'
import YTSearchResult from './YTSearchResult'

class YTSearchResults extends React.Component {

  render() {
    console.log('Rendering YTSearchResults')
    return (
      <div>
        {this.props.ytSearchResults.map(r =>
          <YTSearchResult key={r.linkId} item={r} />
        )}
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
