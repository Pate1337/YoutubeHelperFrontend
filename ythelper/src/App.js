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
import { usersFavourites } from './reducers/favouriteLinksReducer'
import RegisterForm from './components/RegisterForm';

class App extends React.Component {

/*ComponentDidMount toinen vaihtoehto*/
  componentWillMount() {
    console.log('Mounting App')
    this.props.loggedUserInitialization()
    this.props.usersInitialization()
    this.props.searchResultInitialization()
    this.props.usersFavourites()
  }

  render() {
    console.log('Rendering App')
    console.log('Käyttäjät: ' + this.props.users.length)
    /*Mun mielestä ihan ok tapa päättää mitä näytetään kun ei olla kirjauduttu
    tai ollaan kirjauduttu, on laittaa vaan ehtolauseita..*/
    if (this.props.users.length === 0) {
      return (
        <div>
          <RegisterForm />
        </div>
      )
    }
    if (this.props.loggedUser === null) {
      return (
        <div>
          <div>
            <RegisterForm />
          </div>
          <LoginForm />
          <h1>Käyttäjät</h1>
          <ul>
            {this.props.users.map(u => <li key={u.id}>
              username: {u.username},
              id: {u.id},
              name: {u.name},
              linkkien määrä: {u.links.length}
              </li>
            )}
          </ul>
          <YTSearchBar />
          <YTSearchResults />
        </div>
      )
    } else {
      return (
        <div>
          <LoggedBar />
          <h1>Käyttäjät</h1>
          <ul>
            {this.props.users.map(u => <li key={u.id}>
              username: {u.username},
              id: {u.id},
              name: {u.name},
              linkkien määrä: {u.links.length}
              </li>
            )}
          </ul>
          <FavouriteLinks />
          <YTSearchBar />
          <YTSearchResults />
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    loggedUser: state.loggedUser
  }
}

const mapDispatchToProps = {
  usersInitialization,
  searchResultInitialization,
  loggedUserInitialization,
  usersFavourites
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp
