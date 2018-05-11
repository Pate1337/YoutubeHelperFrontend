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
import VideoPlayer from './components/VideoPlayer'
import { Container } from 'semantic-ui-react'
import { Grid, Segment, Sticky } from 'semantic-ui-react'
import Notification from './components/Notification'

class App extends React.Component {

  async componentWillMount() {
    console.log('Mounting App')
    await this.props.loggedUserInitialization()
    await this.props.usersInitialization()
    await this.props.searchResultInitialization()
    await this.props.userLinks()
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
      overflow: 'hidden'
    }
    return (
      <div  style={overflow}>
        <Router>
          <div>
            <div style={mainPageStyle}>
              <Container>
                <Grid>
                  <Grid.Column>
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
                          <Route path='/myPlaylists'
                            render={() => <PlaylistForm />} />
                          <Route path='/myPlaylists'
                            render={() => <Playlists />} />
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
    playlists: state.userLinks.playlists
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
