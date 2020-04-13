import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store';
import actionCable from 'actioncable';


const CableApp = {}

CableApp.cable = actionCable.createConsumer('ws://localhost:3000/cable')

// const compose enhancers for better dev tools

ReactDOM.render(<Provider store={store} ><App cableApp={CableApp} /></ Provider>, document.getElementById('root'));


serviceWorker.unregister();
