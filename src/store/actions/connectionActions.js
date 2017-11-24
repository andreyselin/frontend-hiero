import actionTypes from '../../constants/actionTypes';


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
