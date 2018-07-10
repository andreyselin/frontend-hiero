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

    if (action.type === actionTypes.connection.remove) {
        console.log('Connection reducer', action.payload)
        console.log('state ', state)
        let newState = state
        let linkId = action.payload
        let removeConnectionPosition = newState.findIndex((item) => {
            return item.link === linkId
        })

        newState.splice(removeConnectionPosition, 1)

        return [
            ...newState
        ];
    }

    return state;
}

