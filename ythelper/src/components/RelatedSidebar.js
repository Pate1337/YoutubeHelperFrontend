import React from 'react'
import { connect } from 'react-redux'
import { Rail, Segment, Item, Button, Transition, Icon } from 'semantic-ui-react'
import RecommendedLink from './RecommendedLink'

class RelatedSidebar extends React.Component {
  constructor() {
    super()
    this.state = {
      visible: false
    }
  }
  toggleVisibility = () => {
    console.log('toggle visibility')
    this.setState({
      visible: !this.state.visible
    })
  }

  scrollTop = () => {
    const header = document.getElementById('relatedHeader')
    header.scrollIntoView()
  }

  render() {
    if (window.innerWidth >= 1100 && this.props.playerPlaying) {
      return (
        <Rail attached style={{width: '40%'}} position='right'>
          <Segment style={{overflow: 'auto'}}>
            <h3>Related videos</h3>
            <Item.Group divided unstackable>
              {this.props.relatedLinks.map(l =>
                <RecommendedLink key={l.linkId} recommend={l} sidebar={true} />)}
            </Item.Group>
          </Segment>
        </Rail>
      )
    } else if (window.innerWidth >= 750 && this.props.playerPlaying) {
      return (
        <Rail attached style={{width: '30%'}} position='right'>
          <Segment style={{overflow: 'auto'}}>
            <h3>Related videos</h3>
            <Item.Group unstackable divided>
              {this.props.relatedLinks.map(l =>
                <RecommendedLink key={l.linkId} recommend={l} sidebar={true} />)}
            </Item.Group>
          </Segment>
        </Rail>
      )
    } else if (this.props.playerPlaying) {
      const sidebarStyle = {
        width: '84%',
        height: window.innerHeight,
        position: 'fixed',
        top: 0,
        right: '-4%',
        overflowY: 'auto',
        overflowX: 'hidden',
        display: (this.state.visible) ? '' : 'none',
        zIndex: 1004
      }

      return (
        <div>
          <Button icon attached='left' color='black' style={{position: 'fixed', right: '0%', top: 130, zIndex: 1004}} onClick={this.toggleVisibility}>
            <Icon name='arrow left' />
          </Button>
          <Button icon attached='left' color='black' style={{position: 'fixed', zIndex: 1004, right: '80%', height: window.innerHeight, width: '30px', top: 0, display: (this.state.visible) ? '' : 'none'}} onClick={this.toggleVisibility}>
            <Icon style={{right: '82%', position: 'fixed', top: '50%'}} name='arrow right' />
          </Button>
          <Transition.Group style={sidebarStyle} animation='slide left' duration={200}>
            {this.state.visible &&
              <Segment onClick={this.scrollTop} basic style={{background: 'white'}}>
              <h3 id='relatedHeader'>Related videos</h3>
              <Item.Group divided>
                {this.props.relatedLinks.map(l =>
                  <RecommendedLink key={l.linkId} recommend={l} sidebar={true} />)}
              </Item.Group>
              </Segment>}
          </Transition.Group>
        </div>
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
    relatedLinks: state.relatedLinks,
    playerPlaying: state.playingVideo.playerPlaying
  }
}

const ConnectedRelatedSidebar = connect(mapStateToProps)(RelatedSidebar)

export default ConnectedRelatedSidebar
