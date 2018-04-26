import React from 'react'
import { connect } from 'react-redux'
import { removeLoggedUser } from '../reducers/loggedUserReducer'
/*import { removeFavourites } from '../reducers/favouriteLinksReducer'
import { removePlaylists } from '../reducers/playlistsReducer'*/
import { removeUserLinks } from '../reducers/userLinksReducer'
import { clearSearchResults } from '../reducers/ytReducer'
import { clearPlayingPlaylist } from '../reducers/playlistPlayingReducer'
import { clearPlayingVideo } from '../reducers/videoPlayingReducer'
import { Link } from 'react-router-dom'
import { Grid, Segment } from 'semantic-ui-react'
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
    this.props.history.push('/')
  }

  render() {
    console.log('Rendering LoggedBar')
    return (
      <div>
        {this.props.loggedUser !== null
          ? <Grid columns='equal' inverted doubling divided celled>
              <Grid.Row color='black' textAlign='center'>
                <Grid.Column width={2}>
                  <Segment color='black' inverted>logo</Segment>
                </Grid.Column>
                <Grid.Column>
                  <HiddenPlaylist />
                </Grid.Column>
                <Grid.Column width={2}>
                  <Segment color='black' inverted>
                    <Link to='/myFavourites'>
                      My favourites
                    </Link>&nbsp;
                  </Segment>
                </Grid.Column>
                <Grid.Column width={2}>
                  <Segment color='black' inverted>
                    <Link to='/myPlaylists'>
                      My playlists
                    </Link>
                  </Segment>
                </Grid.Column>
                <Grid.Column width={5}>
                  <Segment color='black' inverted>
                    {this.props.loggedUser.username} logged in&nbsp;
                    <button onClick={this.logOut}>
                      Logout
                    </button>&nbsp;
                  </Segment>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row color='black' centered>

                  <Route path='/'
                    render={({history}) => <Menu history={history} />} />

              </Grid.Row>
            </Grid>
          : <Grid columns='equal' inverted doubling divided celled>
              <Grid.Row color='black' textAlign='center'>
                <Grid.Column width={2}>
                  <Segment color='black' inverted>logo</Segment>
                </Grid.Column>
                <Grid.Column>
                  <HiddenPlaylist />
                </Grid.Column>
                <Grid.Column width={2}>
                </Grid.Column>
                <Grid.Column width={2}>
                </Grid.Column>
                <Grid.Column width={5}>
                  <Segment color='black' inverted>
                    <Link to='/login'>Login</Link>&nbsp; OR <Link to='/signup'>Create an account</Link>
                  </Segment>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row color='black' centered>

                  <Route path='/'
                    render={({history}) => <Menu history={history} />} />

              </Grid.Row>
            </Grid>
          }
      </div>
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
  clearPlayingVideo
}

const ConnectedLoggedBar = connect(mapStateToProps, mapDispatchToProps)(LoggedBar)

export default ConnectedLoggedBar
