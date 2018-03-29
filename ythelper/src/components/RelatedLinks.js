import React from 'react'
import { connect } from 'react-redux'

class RelatedLinks extends React.Component {
  constructor() {
    super()
    this.state = {
      filter: ''
    }
  }

  handleFilterChange = (event) => {
    this.setState({
      filter: event.target.value
    })
  }
  render() {
    if (this.props.relatedLinks !== undefined && this.props.relatedLinks.length !== 0) {
      const linksToShow =
        this.props.relatedLinks.filter(rLink =>
          rLink.link.title.toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1)
      return (
        <div>
          <h2>Recommended</h2>
          <div>
            Search from recommended
            <input value={this.state.filter} onChange={this.handleFilterChange}/>
          </div>
          <ol>
            {linksToShow.map(l => <li key={l.link._id}>{l.link.title}, id: {l.link.linkId} count: {l.count}</li>)}
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
  if (state.userLinks.relatedLinks === null || state.userLinks.relatedLinks === undefined
    || state.userLinks.relatedLinks.length == 0) {
    relatedLinks = state.userLinks.relatedLinks
  } else {
    relatedLinks = state.userLinks.relatedLinks.sort(sortByCount)
  }
  return {
    relatedLinks: relatedLinks
  }
}

const ConnectedRelatedLinks = connect(mapStateToProps)(RelatedLinks)

export default ConnectedRelatedLinks
