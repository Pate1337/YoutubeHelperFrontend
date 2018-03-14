import React from 'react'
import { usersInitialization } from './reducers/userReducer'
import { connect } from 'react-redux'

class App extends React.Component {

/*ComponentDidMount toinen vaihtoehto*/
  componentWillMount() {
    console.log('Mounting App')
    this.props.usersInitialization()
  }

  render() {
    console.log('Rendering App')
    console.log('Käyttäjät: ' + this.props.users.length)

    return (
      <div>
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
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = {
  usersInitialization
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp
