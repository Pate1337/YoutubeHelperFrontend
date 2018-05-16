import React from 'react'
import { connect } from 'react-redux'
import { addNewUser } from '../reducers/userReducer'
import { Grid} from 'semantic-ui-react'
import { setActiveItem } from '../reducers/menuReducer'

class RegisterForm extends React.Component {
  constructor() {
    super()
    this.state = {
      username: '',
      name: '',
      password: '',
      pwordCheck: '',
      colors: 'red'
    }
  }

  componentDidMount() {
    this.props.setActiveItem('/signup')
  }

  handleRegisterFieldChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    }, () => {
      if (this.state.pwordCheck !== this.state.password) {
        this.setState({
          colors: 'red'
        })
      }
      else {
        this.setState({
          colors: 'green'
        })
      }
    })
  }


  handleRegistering = async (event) => {
    console.log('handleRegistering RegisterForm')
    event.preventDefault()
    const user = {
      username: this.state.username,
      name: this.state.name,
      password: this.state.password
    }
    if (user.username.length < 5 || user.password.length < 8 || user.name.length < 2) {
      console.log('Username must be >4 chars and password >7 and name must be >=2')
    } else if (this.state.pwordCheck !== user.password) {
      console.log('Passwords dont match!')
    } else {
      const response = await this.props.addNewUser(user)
      this.setState({
        username: '',
        name: '',
        password: '',
        pwordCheck: ''
      })
      this.props.history.push('/')
    }
  }

  render() {
    console.log('Renderöidään uuden käyttäjän rekisteröinti formi')
    return (
      <Grid>
        <Grid.Column>
          <h2>Register a new user</h2>
          <form onSubmit={this.handleRegistering}>
            Username:
            <input
              type='text'
              name='username'
              value={this.state.username}
              onChange={this.handleRegisterFieldChange}
            />
            Name:
            <input
              type='text'
              name='name'
              value={this.state.name}
              onChange={this.handleRegisterFieldChange}
            />
            Password:
            <input
              type='password'
              name='password'
              value={this.state.password}
              onChange={this.handleRegisterFieldChange}
            />
            <p style={{ color: this.state.colors }}>Re-Enter Password:</p>
            <input
              type='password'
              name='pwordCheck'
              value={this.state.pwordCheck}
              onChange={this.handleRegisterFieldChange}
            />
            <button type='submit'>
              Register
            </button>
          </form>
          <button onClick={() => this.props.history.push('/')}>
            Hide
          </button>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapDispatchToProps = {
  addNewUser,
  setActiveItem
}

const ConnectedRegisterForm = connect(null, mapDispatchToProps)(RegisterForm)

export default ConnectedRegisterForm
