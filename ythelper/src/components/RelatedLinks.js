import React from 'react'
import { connect } from 'react-redux'

class RelatedLinks extends React.Component {

  render() {
    if (this.props.relatedLinks !== undefined && this.props.relatedLinks.length !== 0) {
      return (
        <div>
          <h3>Ehdotukset</h3>
          <ol>
            {this.props.relatedLinks.map(l => <li key={l.link._id}>{l.link.title}, id: {l.link.linkId} count: {l.count}</li>)}
          </ol>
        </div>
      )
    } else {
      return (
        <div>Ei ehdotuksia</div>
      )
    }

  }
}

const sortByCount = (a, b) => {
  return parseInt(b.count, 10) - parseInt(a.count, 10)
}

const mapStateToProps = (state) => {
  let relatedLinks
  if (state.userLinks.relatedLinks.length !== 0) {
    relatedLinks = state.userLinks.relatedLinks.sort(sortByCount)
  } else {
    relatedLinks = state.userLinks.relatedLinks
  }
  return {
    relatedLinks: relatedLinks
  }
}

const ConnectedRelatedLinks = connect(mapStateToProps)(RelatedLinks)

export default ConnectedRelatedLinks
