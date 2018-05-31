import React from 'react'
import { connect } from 'react-redux'
import Youtube from 'react-youtube'
import RecommendedLink from './RecommendedLink'
import { Item, Grid } from 'semantic-ui-react'
import { setActiveItem } from '../reducers/menuReducer'

class Home extends React.Component {


  componentDidMount() {
    this.props.setActiveItem('/')
  }

  render() {
    const onlyShowOnComputer = { display: (window.innerWidth > 750) ? '' : 'none', marginTop: '30px' }
    const onlyShowOnMobile = { display: (window.innerWidth <= 750) ? '' : 'none', marginTop: '30px' }
    let count = 0
    let links = []
    if (this.props.randomLinks !== undefined && this.props.randomLinks.length !== 0) {
      links = this.props.randomLinks
      console.log('KEY: ' + links[0]._id)
    }
    const showHeader = { display: (links.length !== 0) ? '' : 'none' }
    return (
      <div style={{marginTop: '10px'}}>
      <Grid>
      <Grid.Column>
        <h3>Welcome {this.props.loggedUser.username}!</h3>
        <p>Start by searching videos from Youtube.</p>
        <p>
          Soon you will have so many recommended videos that
          you dont even need to search for videos!
        </p>
        <div style={onlyShowOnComputer}>
        <h3 style={showHeader}>You might like some of these</h3>
        <Grid columns={2}>
          {links.map(l => {
            return (
              <Grid.Column key={l._id}>
                <Item.Group unstackable key={l._id}>
                  <RecommendedLink recommend={l} key={l._id} />
                </Item.Group>
              </Grid.Column>
            )
            count++
          })}
        </Grid>
        </div>
        <div style={onlyShowOnMobile}>
          <h3 style={showHeader}>You might like some of these</h3>
            {links.map(l => {
              return (
                  <Item.Group unstackable key={l._id}>
                    <RecommendedLink recommend={l} key={l._id} />
                  </Item.Group>
              )
              count++
            })}
        </div>
      </Grid.Column>
      </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser,
    recommendedLinks: state.userLinks.relatedLinks,
    randomLinks: state.userLinks.randomLinks
  }
}

const mapDispatchToProps = {
  setActiveItem
}

const ConnectedHome = connect(mapStateToProps, mapDispatchToProps)(Home)

export default ConnectedHome
