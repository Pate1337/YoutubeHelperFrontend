import React from 'react'
import { connect } from 'react-redux'
import { addLoggedUser } from '../reducers/loggedUserReducer'
/*import { usersFavourites } from '../reducers/favouriteLinksReducer'
import { usersPlaylists } from '../reducers/playlistsReducer'*/
import { userLinks } from '../reducers/userLinksReducer'
import { setActiveItem } from '../reducers/menuReducer'
import { Form, Button, Segment, TransitionablePortal, Message } from 'semantic-ui-react'
import { setNotification, hideNotification } from '../reducers/notificationReducer'

class LoginForm extends React.Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: ''
    }
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleLogin = async (event) => {
    console.log('handleLogin LoginForm')
    event.preventDefault()
    const user = {
      username: this.state.username,
      password: this.state.password
    }
    const response = await this.props.addLoggedUser(user)
    /*this.props.usersFavourites()
    this.props.usersPlaylists()*/
    this.props.userLinks()
    /*Tässä vaiheessa ihan simppeli tarkistus jos kirjautuminen ei onnistu*/
    if (response !== 'error') {
      console.log('Logged in')
      this.props.history.push('/')
      await this.props.setActiveItem('/')
      await this.props.setNotification(`Logged in as ${user.username}`, '', 'success', true)
      setTimeout(async () => {
        await this.props.hideNotification(`Logged in as ${user.username}`)
      }, 3000)
    } else {
      this.setState({
        username: '',
        password: ''
      })
      await this.props.setNotification('Wrong username or password', '', 'error', true)
      setTimeout(async () => {
        await this.props.hideNotification('Wrong username or password')
      }, 3000)
    }
  }

  render() {
    console.log('Rendering LoginForm')
    return (
      <div style={{width: '60%'}}>
        <h2>Login</h2>
        <Form error onSubmit={this.handleLogin}>
          <Form.Input
            type='text'
            name='username'
            value={this.state.username}
            onChange={this.handleLoginFieldChange}
            label='Username:'
            placeholder='Username'
            error={this.state.error}
          />
          <Form.Input
            type='password'
            name='password'
            value={this.state.password}
            onChange={this.handleLoginFieldChange}
            label='Password'
            placeholder='Password'
            error={this.state.error}
          />
          <Button type='submit'>
            Login
          </Button>
        </Form>
      </div>
    )
  }
}
/*<TransitionablePortal open={this.state.error} transition={{animation: 'slide right', duration: 400}}>

    <Message
      error={false}
      success={false}
      warning={true}
      header='Wrong username or password'
      content='moi'
      style={{left: '10%', position: 'fixed', top: '90%', zIndex: 1000}}
    />

</TransitionablePortal>*/
/*<button onClick={() => this.props.history.push('/')}>
  Hide
</button>*/
const mapDispatchToProps = {
  addLoggedUser,
  /*usersFavourites,
  usersPlaylists*/
  userLinks,
  setActiveItem,
  setNotification,
  hideNotification
}

const ConnectedLoginForm = connect(null, mapDispatchToProps)(LoginForm)

export default ConnectedLoginForm
