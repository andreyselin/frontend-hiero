// import contextService from '../../services/context';
import {actionTypes} from '../../const';
import Store from '../store.js';

export default function connections(state = [], action) {


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
        let newState = [...state];
        let linkId = action.payload;
        let removeConnectionPosition = newState.findIndex((item) => {
            return item.link === linkId;
        });

        newState.splice(removeConnectionPosition, 1);

        return [
            ...newState
        ];
    }

    if (action.type === actionTypes.connection.updateAll) {
        return action.payload;
    }

    if (action.type === actionTypes.connection.clearAll) {
        return [];
    }

    return state;
}

