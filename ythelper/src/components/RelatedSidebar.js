import React from 'react'
import { connect } from 'react-redux'
import { Rail, Segment, Item } from 'semantic-ui-react'
import RecommendedLink from './RecommendedLink'

class RelatedSidebar extends React.Component {

  render() {
    if (window.innerWidth >= 1100) {
      return (
        <Rail attached style={{width: '40%'}} position='right'>
          <Segment style={{height: '550px', overflow: 'auto'}}>
            <h3>Related videos</h3>
            <Item.Group divided unstackable>
              {this.props.relatedLinks.map(l =>
                <RecommendedLink key={l.linkId} recommend={l} />)}
            </Item.Group>
          </Segment>
        </Rail>
      )
    } else if (window.innerWidth >= 750) {
      return (
        <Rail attached style={{width: '30%'}} position='right'>
          <Segment style={{height: '550px', overflow: 'auto'}}>
            <h3>Related videos</h3>
            <Item.Group unstackable divided>
              {this.props.relatedLinks.map(l =>
                <RecommendedLink key={l.linkId} recommend={l} />)}
            </Item.Group>
          </Segment>
        </Rail>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    relatedLinks: state.relatedLinks
  }
}

const ConnectedRelatedSidebar = connect(mapStateToProps)(RelatedSidebar)

export default ConnectedRelatedSidebar
