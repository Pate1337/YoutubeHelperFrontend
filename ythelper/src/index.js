import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
/*import '../node_modules/video-react/dist/video-react.css'*/
import App from './App'
import store from './store'
import { Provider } from 'react-redux'

const render = () => {
  console.log('render index.js')
  /*Tää tulee todennäköisesti aiheuttaan häslinkiä jossain vaiheessa*/
  /*window.scrollTo(0, 0)*/
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)
