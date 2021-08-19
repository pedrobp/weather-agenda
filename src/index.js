import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import getStore from './store/getStore';
import Main from './Main';
import reportWebVitals from './reportWebVitals';

// import main sass file
import './sass/app.scss';

ReactDOM.render(
  <ReduxProvider store={getStore}>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </ReduxProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
