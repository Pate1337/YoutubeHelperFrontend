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
/*import { usersFavourites } from './reducers/favouriteLinksReducer'
import { usersPlaylists } from './reducers/playlistsReducer'*/
import { userLinks } from './reducers/userLinksReducer'
import RegisterForm from './components/RegisterForm'
import PlaylistForm from './components/PlaylistForm'
import Playlists from './components/Playlists'
import HiddenPlaylist from './components/HiddenPlaylist'
import RelatedLinks from './components/RelatedLinks'
import UserLists from './components/UserLists'
import Users from './components/Users'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Welcome from './components/Welcome'
import Home from './components/Home'
import Menu from './components/Menu'
import VideoPlayer from './components/VideoPlayer'

class App extends React.Component {

/*ComponentDidMount toinen vaihtoehto*/
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
    /*if (this.props.loggedUser === null) {*/
      return (
        <div>
          <Router>
            <div>
              <HiddenPlaylist />
              <Route path='/'
                render={({history}) => <LoggedBar history={history} />} />
              <h1>YoutubeHelper</h1>
              <Route path='/'
                render={() => <Menu />} />
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
                    <Route path='/myFavourites'
                      render={() => <FavouriteLinks />} />
                    <Route path='/myPlaylists'
                      render={() => <Playlists />} />
                    <Route path='/recommended'
                      render={() => <RelatedLinks />} />
                    <PlaylistForm />
                  </div>
              }
              <Route path='/users'
                render={() => <Users />} />
              <YTSearchBar />
              <YTSearchResults />
            </div>
          </Router>
        </div>
      )
  /*  } else {
      return (
        <div>
          <Router>
            <div>
              <LoggedBar />
              <HiddenPlaylist />
              <Users />
              <UserLists />
              <PlaylistForm />
              <YTSearchBar />
              <YTSearchResults />
              <RelatedLinks />
            </div>
          </Router>
        </div>
      )
    }*/
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
/*  usersFavourites,
  usersPlaylists*/
  userLinks
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp
