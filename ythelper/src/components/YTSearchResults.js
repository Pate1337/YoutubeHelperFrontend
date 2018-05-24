import React from 'react'
import { connect } from 'react-redux'
import YTSearchResult from './YTSearchResult'
import { Grid, Item, Dimmer, Loader, Segment } from 'semantic-ui-react'

class YTSearchResults extends React.Component {

  render() {
    console.log('Rendering YTSearchResults')
    const show = { display: (this.props.ytSearchResults.length === 0) ? 'none' : ''}
    if (!this.props.searching) {
    return (
      <Grid style={{overflow: 'hidden'}}>
        <Grid.Column>
          <h2 style={show}>Results ({this.props.ytSearchResults.length})</h2>
          <Item.Group divided unstackable>
            {this.props.ytSearchResults.map(r =>
              <YTSearchResult key={r.linkId} item={r} />
            )}
          </Item.Group>
        </Grid.Column>
      </Grid>
    )
  } else {
    return (
      <Segment style={{position: 'fixed', top: 0, right: 0, width: window.innerWidth, height: window.innerHeight}} basic>
        <Dimmer active inverted>
          <Loader size='large'>Loading...</Loader>
        </Dimmer>
      </Segment>
    )
  }
  }
}

const mapStateToProps = (state) => {
  return {
    ytSearchResults: state.ytSearchResults.links,
    searching: state.ytSearchResults.searching
  }
}

const ConnectedYTSearchResults = connect(mapStateToProps)(YTSearchResults)

export default ConnectedYTSearchResults
