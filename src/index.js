import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.scss';
import App from './App';
import { FakeAPI } from './helpers/FakeAPI';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
