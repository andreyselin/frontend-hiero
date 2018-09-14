import {actionTypes, addConnectionModes}      from '../../const';

var initialState = {mode: addConnectionModes.connectionModeOff};


function generateNewConnectionToAdd (){
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


export default function addConnectionReducer (state = initialState, action) {
    
    if (action.type === actionTypes.connection.add.turn.on) {
        return generateNewConnectionToAdd();
    }
    
    if (action.type === actionTypes.connection.add.turn.off) {
        return {...initialState}
    }

    if (action.type === actionTypes.connection.add.toggle) {
        if (state.mode === addConnectionModes.connectionModeOn) {
            return {...initialState}
        } else {
            return generateNewConnectionToAdd();
        }
    }
    
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

