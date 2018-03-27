import React from 'react'
import { connect } from 'react-redux'

class RelatedLinks extends React.Component {

  render() {
    if (this.props.relatedLinks !== undefined && this.props.relatedLinks.length !== 0) {
      return (
        <div>
          <h3>Ehdotukset</h3>
          <ol>
            {this.props.relatedLinks.map(l => <li key={l._id}>{l.title}</li>)}
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

const mapStateToProps = (state) => {
  return {
    relatedLinks: state.userLinks.relatedLinks
  }
}

const ConnectedRelatedLinks = connect(mapStateToProps)(RelatedLinks)

export default ConnectedRelatedLinks