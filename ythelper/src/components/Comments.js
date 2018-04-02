import React from 'react'
import { connect } from 'react-redux'
import { addReceivedComment } from '../reducers/commentReducer'
import { addSentComment } from '../reducers/commentReducer'
import Comment from './Comment'

class Comments extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showComments: true,
      comment: ''
    }
  }

  toggleVisibility = () => {
    this.setState({
      showComments: !this.state.showComments
    })
  }

  handleCommentField = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleComment = async (event) => {
    event.preventDefault()
    const sComment = {
      content: this.state.comment,
      receiver: this.props.cuser,
      sender: this.props.loggedUser.id
    }
    console.log('Comments.js handleComment')
    const response = await this.props.addSentComment(sComment)
    this.setState({
      comment: ''
    })
  }


  render() {
    console.log('Rendering CommentS')
    console.log(this.props.cuser)
    if(this.state.showComments) {
      return (
        <div>
          <h3 onClick={this.toggleVisibility}>Comments (click to hide)</h3>
          <p>Testing</p>
          <Comment />
          <form onSubmit={this.handleComment}>
            Type a comment to send:
              <input
              type='text'
              name='comment'
              value={this.state.comment}
              onChange={this.handleCommentField}
              />
            <button type='submit'>
              Send
            </button>
          </form>
        </div>
      )
    } else {
      return (
        <h3 onClick={this.toggleVisibility}>Comments (click to show)</h3>
      )
    }
    
  }
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser,
    //receivedComments: state.userComments.received
  }
}

const mapDispatchToProps = {
  addReceivedComment,
  addSentComment
}

const ConnectedComments = connect(mapStateToProps, mapDispatchToProps)(Comments)


export default ConnectedComments