import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './reset.css';
import App from './App';
//import './drag.css';
import registerServiceWorker from './registerServiceWorker';
// put component into html page

ReactDOM.render(<App  />, document.getElementById('root'));
registerServiceWorker();
