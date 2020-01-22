import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.scss';

import App from './App';
import * as serviceWorker from './serviceWorker';
import { FakeAPI } from './helpers/FakeAPI';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
