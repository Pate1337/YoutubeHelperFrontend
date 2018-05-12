import React from 'react'
import { connect } from 'react-redux'
import { removeLoggedUser } from '../reducers/loggedUserReducer'
import { removeUserLinks } from '../reducers/userLinksReducer'
import { clearSearchResults } from '../reducers/ytReducer'
import { clearPlayingPlaylist } from '../reducers/playlistPlayingReducer'
import { clearPlayingVideo } from '../reducers/videoPlayingReducer'
import { setActiveItem } from '../reducers/menuReducer'
import { Link } from 'react-router-dom'
import { Grid, Segment, Button, Icon } from 'semantic-ui-react'
import Menu from './Menu'
import { Route } from 'react-router-dom'

class LoggedBar extends React.Component {

  logOut = (event) => {
    console.log('logOut LoggedBar')
    event.preventDefault()
    this.props.removeLoggedUser()
    this.props.removeUserLinks()
    this.props.clearSearchResults()
    this.props.clearPlayingPlaylist()
    this.props.clearPlayingVideo()
    window.localStorage.removeItem('ytSearchBar')
    window.localStorage.removeItem('ytSearchResults')
    this.props.setActiveItem('/')
    this.props.history.push('/')
  }

  handleButtonClick = async (event, { content }) => {
    if (content === 'Login') {
      await this.props.setActiveItem('/login')
      this.props.history.push('/login')
    } else if (content === 'Sign up') {
      await this.props.setActiveItem('/signup')
      this.props.history.push('/signup')
    } else if (content === 'Playlists') {
      await this.props.setActiveItem('/myPlaylists')
      this.props.history.push('/myPlaylists')
    } else if (content === 'Favourites') {
      await this.props.setActiveItem('/myFavourites')
      this.props.history.push('/myFavourites')
    }
  }

  render() {
    console.log('Rendering LoggedBar')
    return (
      <Grid columns='equal' inverted doubling>
        <Grid.Row verticalAlign='top' color='black' textAlign='center' style={{height: '56px'}}>
          <Grid.Column width={4}>
            <Segment color='black' inverted>
              logo
            </Segment>
          </Grid.Column>

          {this.props.loggedUser !== null
            ? <Grid.Column>
                <Segment color='black' inverted>
                  <Button style={{position: 'relative', zIndex: 10}}compact size='mini' inverted content='Favourites' onClick={this.handleButtonClick} />
                </Segment>
              </Grid.Column>
            : <Grid.Column width={1}>
              </Grid.Column>
          }
          {this.props.loggedUser !== null
            ? <Grid.Column>
                <Segment color='black' inverted>
                  <Button style={{position: 'relative', zIndex: 10}} compact size='mini' inverted content='Playlists' onClick={this.handleButtonClick} />
                </Segment>
              </Grid.Column>
            : <Grid.Column width={1}></Grid.Column>
          }
          {this.props.loggedUser !== null
            ? <Grid.Column floated='right'>
                <Segment floated='right' color='black' inverted>
                  <Button title='Sign out' compact floated='right' inverted size='mini' icon onClick={this.logOut}>
                    <Icon name='sign out' />
                  </Button>&nbsp;
                </Segment>
              </Grid.Column>
            : <Grid.Column floated='right'>
                <Segment color='black' inverted>
                  <Button.Group floated='right' size='mini'>
                    <Button basic color='blue' onClick={this.handleButtonClick} content='Login' />
                    <Button.Or />
                    <Button basic color='blue' onClick={this.handleButtonClick} content='Sign up' />
                  </Button.Group>
                </Segment>
              </Grid.Column>
          }
        </Grid.Row>
        <Grid.Row color='black' centered style={{height: '56px'}}>
          <Grid.Column>
            <Route path='/'
              render={({history}) => <Menu history={history} />} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser
  }
}

const mapDispatchToProps = {
  removeLoggedUser,
  removeUserLinks,
  clearSearchResults,
  clearPlayingPlaylist,
  clearPlayingVideo,
  setActiveItem
}

const ConnectedLoggedBar = connect(mapStateToProps, mapDispatchToProps)(LoggedBar)

export default ConnectedLoggedBar
