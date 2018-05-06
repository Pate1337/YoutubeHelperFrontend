import React from 'react'
import { connect } from 'react-redux'
import YTSearchResult from './YTSearchResult'
import { Grid } from 'semantic-ui-react'

class YTSearchResults extends React.Component {

  render() {
    console.log('Rendering YTSearchResults')
    return (
      <Grid>
        <Grid.Column>
          {this.props.ytSearchResults.map(r =>
            <YTSearchResult key={r.linkId} item={r} />
          )}
        </Grid.Column>
      </Grid>
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
