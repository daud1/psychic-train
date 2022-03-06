import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './assets/index.css';
import { MainContextProvider } from './mainContext';

ReactDOM.render(
  <React.StrictMode>
    <MainContextProvider>
      <App />
    </MainContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
