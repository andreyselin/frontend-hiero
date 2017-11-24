import {initialContext, initialAppState} from '../api/dataFromServer';
import actionTypes from '../../constants/actionTypes';
import addConnectionModes from '../../constants/addConnectionModes';

export default function addConnection(state = initialAppState.newConnection, action) {

    if (action.type === actionTypes.connection.add.turn.on) {

        let newLink = Math.random().toString(36).slice(2);
        console.log("action", action, state);

        return {
            'mode':addConnectionModes.ConnectionModeOn,
            'connection': {
                link: newLink,
                fromLink: null,
                toLink: null
            }
        }
    }

    return state;
}

