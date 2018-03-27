import React from 'react';
import ReactDOM from 'react-dom';
import App from './00-App';
import registerServiceWorker from './registerServiceWorker';
//import 'bootstrap/dist/css/bootstrap.css';
// import '../public/fontawesome-all.js'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
