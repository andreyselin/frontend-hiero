import {actionTypes} from '../../const';


export const addConnectionTurnOn = ()=> {
    return {
        type: actionTypes.connection.add.turn.on
    };
};

export const addConnectionTurnOff = ()=> {
    return {
        type: actionTypes.connection.add.turn.off
    };
};

export const addConnectionToggle = ()=> {
    return {
        type: actionTypes.connection.add.toggle
    };
};

export const addConnectionChooseFrom = (fromLink)=> {
    return {
        type: actionTypes.connection.add.choose.from,
        payload: fromLink
    };
};

export const addConnectionChooseTo = (toLink)=> {
    return {
        type: actionTypes.connection.add.choose.to,
        payload: toLink
    };
};

export const removeConnection = (connection) => {
    return {
        type: actionTypes.connection.remove,
        payload: connection
    };
};

export const updateAllConnections = (newConnections) => {
    return {
        type: actionTypes.connection.updateAll,
        payload: newConnections
    };
};

export const clearAllConnections = () => {
    return {
        type: actionTypes.connection.clearAll
    };
};