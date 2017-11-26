import {initialAppState} from '../api/dataFromServer';
import actionTypes from '../../constants/actionTypes';
import addConnectionModes from '../../constants/addConnectionModes';

export default function addConnection(state = initialAppState.newConnection, action) {
    
    if (action.type === actionTypes.connection.add.turn.on) {
        let newLink = Math.random().toString(36).slice(2);
        return {
            'mode':addConnectionModes.connectionModeOn,
            'connection': {
                link: newLink,
                fromLink: null,
                toLink: null
            }
        }
    }
    
    if (action.type === actionTypes.connection.add.turn.off) {}
    
    if (action.type === actionTypes.connection.add.choose.from) {
        let toReturn = {...state};
        toReturn.mode = addConnectionModes.fromGlyphChosen;
        toReturn.connection.fromLink = action.payload;
        return toReturn;
    }

    if (action.type === actionTypes.connection.add.choose.to) {
        let toReturn = {...state};
        toReturn.mode = addConnectionModes.connectionModeOff;
        toReturn.connection.toLink = action.payload;
        return toReturn;
    }


    return state;
}

