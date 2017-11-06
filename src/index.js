import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

document.ondragstart = function() {
    return false;
};

ReactDOM.render(<Provider store={store}>
                    <App />
                </Provider>,
                document.getElementById('AppRoot'));


registerServiceWorker();
