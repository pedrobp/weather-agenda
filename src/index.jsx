import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import getStore from './store/getStore'
import Main from './Main'

// import main sass file
import './sass/app.scss'

ReactDOM.render(
  <ReduxProvider store={getStore}>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </ReduxProvider>,
  document.getElementById('root')
)
