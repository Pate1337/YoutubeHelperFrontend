import React from 'react'
import { usersInitialization } from './reducers/userReducer'
import { searchResultInitialization } from './reducers/ytReducer'
import { loggedUserInitialization } from './reducers/loggedUserReducer'
import { connect } from 'react-redux'
import YTSearchBar from './components/YTSearchBar'
import YTSearchResults from './components/YTSearchResults'
import LoginForm from './components/LoginForm'
import LoggedBar from './components/LoggedBar'
import FavouriteLinks from './components/FavouriteLinks'
import { userLinks } from './reducers/userLinksReducer'
import RegisterForm from './components/RegisterForm'
import PlaylistForm from './components/PlaylistForm'
import Playlists from './components/Playlists'
import RelatedLinks from './components/RelatedLinks'
import UserLists from './components/UserLists'
import Users from './components/Users'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Welcome from './components/Welcome'
import Home from './components/Home'
import Menu from './components/Menu'
import PlaylistView from './components/PlaylistView'
import VideoPlayer from './components/VideoPlayer'
import { Container } from 'semantic-ui-react'
import { Grid, Segment, Sticky, Sidebar } from 'semantic-ui-react'
import Notification from './components/Notification'
import RelatedSidebar from './components/RelatedSidebar'

class App extends React.Component {

  async componentWillMount() {
    console.log('Mounting App')
    await this.props.loggedUserInitialization()
    await this.props.usersInitialization()
    await this.props.searchResultInitialization()
    await this.props.userLinks()
  }

  playlistById = (id) => {
    console.log('id paramssissa: ' + id)
    const playlist = this.props.playlists.find(p => p._id === id)
    console.log('playlist: ' + playlist)
    /*console.log('playlist._id: ' + playlist._id)*/
    return playlist
  }

  render() {
    console.log('Rendering App')
    console.log('Käyttäjät: ' + this.props.users.length)
    const loggedBarStyle = {
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 100
    }
    const mainPageStyle = {
      marginTop: '160px'
    }
    const overflow = {
      overflow: (this.props.playerPlaying) ? 'visible' : 'hidden'
    }
    let computerStyle = {}
    if (window.innerWidth > 750) {
      computerStyle = {width: '80%'}
    }
    return (
      <div style={overflow}>
        <Router>
          <div>
            <div style={mainPageStyle}>
              <Container>
                <Grid>
                  <Grid.Column style={computerStyle}>
                    <Notification />
                    <Route path='/'
                      render={() => <VideoPlayer />} />
                    <Route path='/login'
                      render={({history}) => <LoginForm history={history} />} />
                    <Route path='/signup'
                      render={({history}) => <RegisterForm history={history} />} />
                    {this.props.loggedUser === null
                      ? <Route exact path='/'
                        render={() => <Welcome />} />
                      : <div>
                          <Route exact path='/'
                            render={() => <Home />} />
                          <Route exact path='/myPlaylists'
                            render={() => <PlaylistForm />} />
                          <Route exact path='/myPlaylists'
                            render={({history}) => <Playlists history={history} />} />
                        </div>
                    }
                    <Route path='/myFavourites'
                      render={() => <FavouriteLinks />} />
                    <Route path='/recommended'
                      render={() => <RelatedLinks />} />
                    <Route path='/users'
                      render={() => <Users />} />
                    <Route path='/mobileSearch'
                      render={({history}) => <YTSearchBar history={history} />} />
                    <Route path='/search'
                      render={() => <YTSearchBar />} />
                    <Route path='/search'
                      render={() => <YTSearchResults />} />
                    <Route path='/myPlaylists/:id' render={({match}) =>
                      <PlaylistView playlist={this.playlistById(match.params.id)} />} />
                    <RelatedSidebar />
                  </Grid.Column>
                </Grid>
              </Container>
            </div>
            <div style={loggedBarStyle}>
              <Route path='/'
                render={({history}) => <LoggedBar history={history} />} />
            </div>
          </div>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    loggedUser: state.loggedUser,
    favourites: state.userLinks.favourites,
    playlists: state.userLinks.playlists,
    playerPlaying: state.playingVideo.playerPlaying
  }
}

const mapDispatchToProps = {
  usersInitialization,
  searchResultInitialization,
  loggedUserInitialization,
  userLinks
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp
