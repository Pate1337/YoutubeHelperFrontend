import React from 'react'
import { connect } from 'react-redux'
import { TransitionablePortal, Message } from 'semantic-ui-react'

class Notification extends React.Component {

  render() {
    return (

        <Message
          error={this.props.notificationType === 'error'}
          success={this.props.notificationType === 'success'}
          warning={this.props.notificationType === 'warning'}
          header={this.props.notificationHeader}
          content={this.props.notificationContent}
          style={{left: '0%', position: 'fixed', top: '90%', zIndex: 1000, display: (this.props.showNotification) ? '' : 'none'}}
          visible={this.props.showNotification}
        />

    )
  }
}
/*<TransitionablePortal
  open={this.props.showNotification}
  transition={{animation: 'slide right', duration: 400}}
>
  <Message
    error={this.props.notificationType === 'error'}
    success={this.props.notificationType === 'success'}
    warning={this.props.notificationType === 'warning'}
    header={this.props.notificationHeader}
    content={this.props.notificationContent}
    style={{left: '0%', position: 'fixed', top: '90%', zIndex: 1000}}
  />
</TransitionablePortal>*/
const mapStateToProps = (state) => {
  return {
    showNotification: state.notification.show,
    notificationType: state.notification.type,
    notificationHeader: state.notification.header,
    notificationContent: state.notification.content
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification
