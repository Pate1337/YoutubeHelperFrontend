import React from 'react'
import { connect } from 'react-redux'
import YTSearchResult from './YTSearchResult'
import { Grid, Item } from 'semantic-ui-react'

class YTSearchResults extends React.Component {

  render() {
    console.log('Rendering YTSearchResults')
    return (
      <Grid>
        <Grid.Column>
          <h2>Results ({this.props.ytSearchResults.length})</h2>
          <Item.Group divided unstackable>
            {this.props.ytSearchResults.map(r =>
              <YTSearchResult key={r.linkId} item={r} />
            )}
          </Item.Group>
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
