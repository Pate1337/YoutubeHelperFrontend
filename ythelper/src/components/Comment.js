import React from 'react'
import { connect } from 'react-redux'
import { removeOneComment } from '../reducers/commentReducer'

class Comment extends React.Component {
  constructor() {
    super()
  }


  render() {
    console.log('Rendering Comment')
    return (
      <div>
        <p>{this.props.received} by: {this.props.sender.id.name}<button onClick={this.removeOneComment}>Delete</button></p>
      </div>
    )
  }

  removeOneComment = async (event) => {
    event.preventDefault()
    console.log('removeOneComment Comments.js', this.props.cId)
    await this.props.removeOneComment(this.props.cId)
  }

}



const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser
    //rComments: state.userComments hae käyttäjän vastaanotetut kommentit
  }
}

const mapDispatchToProps = {
  removeOneComment
}

const ConnectedComment = connect(mapStateToProps, mapDispatchToProps)(Comment)

export default ConnectedComment