import React from 'react'
import { Menu as MenuItem, Segment, Icon } from 'semantic-ui-react'
import { setActiveItem } from '../reducers/menuReducer'
import { connect } from 'react-redux'

class Menu extends React.Component {

  handleItemClick = async (event, { name }) => {
    if (name === 'home') {
      await this.props.setActiveItem('/')
    } else {
      await this.props.setActiveItem('/' + name)
    }
    let address = '/' + name
    if (name === 'home') {
      address = '/'
    } else if (name === 'search' && window.innerHeight <= 800) {
      address = '/mobileSearch'
    }
    if (this.props.playerPlaying && window.innerWidth > 750) {
      window.scrollTo(0, 560)
    } else if (this.props.playerPlaying && window.innerWidth <= 750) {
      window.scrollTo(0, 310)
    }
    this.props.history.push(address)
  }

  render() {
    const activeItem = this.props.activeItem
    return (
      <Segment basic inverted>
        <MenuItem inverted pointing secondary widths={4}>
          <MenuItem.Item
            name='home' active={activeItem === '/'}
            onClick={this.handleItemClick}
            content={
              <Icon title='Home' name='home' size='large' />
            }
          />
          <MenuItem.Item
            name='users' active={activeItem === '/users'}
            onClick={this.handleItemClick}
            content={
              <Icon title='Users' name='users' size='large' />
            }
          />
          <MenuItem.Item
            name='recommended' active={activeItem === '/recommended'}
            onClick={this.handleItemClick}
            content={
              <Icon title='Recommendations' name='book' size='large' />
            }
          />
          <MenuItem.Item
            name='search' active={activeItem === '/search'}
            onClick={this.handleItemClick}
            content={
              <div title='Search from Youtube'><Icon name='youtube' size='large' /><Icon name='search' size='large' /></div>
            }
          />
        </MenuItem>
      </Segment>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    activeItem: state.activeItem,
    playerPlaying: state.playingVideo.playerPlaying
  }
}

const mapDispatchToProps = {
  setActiveItem
}

const ConnectedMenu = connect(mapStateToProps, mapDispatchToProps)(Menu)
export default ConnectedMenu
