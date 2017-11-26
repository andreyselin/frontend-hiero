import {initialContext} from '../api/dataFromServer';
import actionTypes from '../../constants/actionTypes';
import Store from '../store.js';

export default function connections(state = initialContext.connections, action) {


    // actionTypes.connection.add.choose.to
    // is used twice - here and in addConnectionReducer
    // it is going to work okay for unknown reasons,
    // but for sure there must be better way to do it
    if (action.type === actionTypes.connection.add.choose.to) {
        return [
            ...state,
            Store.getState().app.addConnection.connection
        ];
    }

    return state;
}

