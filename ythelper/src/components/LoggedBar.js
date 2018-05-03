import React from 'react'
import { connect } from 'react-redux'
import { removeLoggedUser } from '../reducers/loggedUserReducer'
/*import { removeFavourites } from '../reducers/favouriteLinksReducer'
import { removePlaylists } from '../reducers/playlistsReducer'*/
import { removeUserLinks } from '../reducers/userLinksReducer'
import { clearSearchResults } from '../reducers/ytReducer'
import { clearPlayingPlaylist } from '../reducers/playlistPlayingReducer'
import { clearPlayingVideo } from '../reducers/videoPlayingReducer'
import { setActiveItem } from '../reducers/menuReducer'
import { Link } from 'react-router-dom'
import { Grid, Segment, Button, Icon } from 'semantic-ui-react'
import HiddenPlaylist from './HiddenPlaylist'
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
    }
  }

  render() {
    console.log('Rendering LoggedBar')
    return (

      <Grid columns='equal' inverted doubling>
        <Grid.Row color='black' textAlign='center'>
          <Grid.Column width={2}>
            <Segment color='black' inverted>
              logo
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <HiddenPlaylist />
          </Grid.Column>
          {this.props.loggedUser !== null
            ? <Grid.Column width={4}>
                <Segment color='black' inverted>
                  <Link to='/myFavourites'>
                    Favourites
                  </Link>&nbsp;
                </Segment>
              </Grid.Column>
            : <Grid.Column width={4}>
              </Grid.Column>
          }
          {this.props.loggedUser !== null
            ? <Grid.Column width={3}>
                <Segment color='black' inverted>
                  <Link to='/myPlaylists'>
                    Playlists
                  </Link>
                </Segment>
              </Grid.Column>
            : <Grid.Column width={3}>
              </Grid.Column>
          }
          {this.props.loggedUser !== null
            ? <Grid.Column width={5}>
                <Segment color='black' inverted>
                  {this.props.loggedUser.username}&nbsp;
                  <Button inverted size='mini' icon onClick={this.logOut}>
                    <Icon name='sign out' />
                  </Button>&nbsp;
                </Segment>
              </Grid.Column>
            : <Grid.Column width={5}>
                <Segment color='black' inverted>
                  <Button.Group>
                    <Button basic color='blue' onClick={this.handleButtonClick} content='Login' />
                    <Button.Or />
                    <Button basic color='blue' onClick={this.handleButtonClick} content='Sign up' />
                  </Button.Group>
                </Segment>
              </Grid.Column>
          }
        </Grid.Row>
        <Grid.Row color='black' centered>
          <Grid.Column>
            <Route path='/'
              render={({history}) => <Menu history={history} />} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}
/*<Segment color='black' inverted>
  <Link to='/login'>Login</Link>&nbsp; OR <Link to='/signup'>Create an account</Link>
</Segment>*/
/*<Route path='/'
  render={({history}) => <Menu history={history} />} />*/
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
