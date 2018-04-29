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
import { Container } from 'semantic-ui-react'
import { Grid, Segment, Sticky } from 'semantic-ui-react'

class App extends React.Component {
  constructor() {
    super()
    this.state = {

    }
  }

/*ComponentDidMount toinen vaihtoehto*/
  async componentWillMount() {
    console.log('Mounting App')
    await this.props.loggedUserInitialization()
    await this.props.usersInitialization()
    await this.props.searchResultInitialization()
    await this.props.userLinks()
    /*Tänne pakko käyttää window.location.pathname et saadaan refreshin
    yhteydessä oleva urli. Ja se asetetaan menuReduceriin*/
    console.log('PATHNAME: ' + window.location.pathname)
  }

  handleContextRef = contextRef => this.setState({ contextRef })

  render() {
    console.log('Rendering App')
    console.log('Käyttäjät: ' + this.props.users.length)
    /*const { contextRef } = this.state*/
    /*if (this.props.loggedUser === null) {*/
      return (
        <Grid>
        <Grid.Column>
        <div>
          <Router>
            <div>
              
              <Route path='/'
                render={({history}) => <LoggedBar history={history} />} />

              <Container>
              <Grid>
              <Grid.Column>

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
              <Route path='/search'
                render={() => <YTSearchBar />} />
              <Route path='/search'
                render={() => <YTSearchResults />} />
              </Grid.Column>
              </Grid>
              </Container>
            </div>
          </Router>
        </div>
        </Grid.Column>
        </Grid>
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
