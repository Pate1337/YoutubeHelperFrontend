import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu as MenuItem, Segment } from 'semantic-ui-react'

class Menu extends React.Component {
  constructor() {
    super()
    this.state = {
      activeItem: 'home'
    }
  }
  handleItemClick = (event, { name }) => {
    console.log('name = ' + name)
    this.setState({
      activeItem: name
    })
    let address = '/' + name
    if (name === 'home') {
      address = '/'
    }
    this.props.history.push(address)
  }
  render() {
    /*const activeStyle = {
      backgroundColor: "grey"
    }*/
    const { activeItem } = this.state
    return (
      <Segment inverted>
        <MenuItem inverted pointing secondary>
          <MenuItem.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
          <MenuItem.Item name='users' active={activeItem === 'users'} onClick={this.handleItemClick} />
          <MenuItem.Item name='recommended' active={activeItem === 'recommended'} onClick={this.handleItemClick} />
          <MenuItem.Item name='search' active={activeItem === 'search'} onClick={this.handleItemClick} />
        </MenuItem>
      </Segment>
    )
  }
}

/*<div>
  <NavLink exact to='/' activeStyle={activeStyle}>
    Home
  </NavLink>&nbsp;
  <NavLink exact to='/users' activeStyle={activeStyle}>
    Users
  </NavLink>&nbsp;
  <NavLink exact to='/recommended' activeStyle={activeStyle}>
    Recommended
  </NavLink>&nbsp;
  <NavLink exact to='/search' activeStyle={activeStyle}>
    Search
  </NavLink>&nbsp;
</div>*/
export default Menu
