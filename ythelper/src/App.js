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

class App extends React.Component {

/*ComponentDidMount toinen vaihtoehto*/
  componentWillMount() {
    console.log('Mounting App')
    this.props.loggedUserInitialization()
    this.props.usersInitialization()
    this.props.searchResultInitialization()
    this.props.userLinks()
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
              <Route path='/login'
                render={({history}) => <LoginForm history={history} />} />
              <Route path='/signup'
                render={({history}) => <RegisterForm history={history} />} />
              {this.props.loggedUser === null
                ? <Route path='/'
                  render={() => <Welcome />} />
                : <div>
                    <Route path='/'
                    render={() => <Home />} />
                    <Users />
                    <UserLists />
                    <PlaylistForm />
                  </div>
              }
              <YTSearchBar />
              <YTSearchResults />
              {this.props.loggedUser === null
                ? <div></div>
                : <RelatedLinks />
              }
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
