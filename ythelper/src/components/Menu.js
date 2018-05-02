import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu as MenuItem, Segment, Icon } from 'semantic-ui-react'
import { setActiveItem } from '../reducers/menuReducer'
import { connect } from 'react-redux'

class Menu extends React.Component {
  /*constructor() {
    super()
    this.state = {
      activeItem: window.location.pathname
    }
  }*/
  handleItemClick = async (event, { name }) => {
    console.log('name = ' + name)
    if (name === 'home') {
      await this.props.setActiveItem('/')
      /*this.setState({
        activeItem: '/'
      })*/
    } else {
      await this.props.setActiveItem('/' + name)
      /*this.setState({
        activeItem: '/' + name
      })*/
    }
    /*await this.props.setActiveItem(name)*/
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
    console.log('Render Menu')
    const activeItem = this.props.activeItem
    console.log('activeItem: ' + activeItem)
    return (
      <Segment inverted>
        <MenuItem inverted pointing secondary widths={4}>
          <MenuItem.Item name='home' active={activeItem === '/'} onClick={this.handleItemClick} content={<Icon name='home' size='large' />}/>
          <MenuItem.Item name='users' active={activeItem === '/users'} onClick={this.handleItemClick} content={<Icon name='users' size='large' />}/>
          <MenuItem.Item name='recommended' active={activeItem === '/recommended'} onClick={this.handleItemClick} content={<Icon name='book' size='large' />}/>
          <MenuItem.Item name='search' active={activeItem === '/search'} onClick={this.handleItemClick} content={<div><Icon name='youtube' size='large' /><Icon name='search' size='large' /></div>}/>
        </MenuItem>
      </Segment>
    )
  }
}
/*active={activeItem === 'home'} onClick={this.handleItemClick}*/
/*const Nav = props => (
  <NavLink
    exact
    {...props}
    activeClassName='active'
  />
)*/

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

const mapStateToProps = (state) => {
  return {
    activeItem: state.activeItem
  }
}

const mapDispatchToProps = {
  setActiveItem
}

const ConnectedMenu = connect(mapStateToProps, mapDispatchToProps)(Menu)
export default ConnectedMenu
