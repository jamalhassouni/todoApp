import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import './utils/reset.css';
import App from './components/App/App';
//import './drag.css';
import registerServiceWorker from './registerServiceWorker';
// put component into html page

ReactDOM.render(<BrowserRouter><App  /></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
