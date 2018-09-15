import {actionTypes} from '../../const';

export const updateContextInfo = (payload)=> {
    return {
        type: actionTypes.contextInfo.update,
        payload:payload
    };
};

export const setSavedContextId = id => {
    return {
        type: actionTypes.contextInfo.setSavedContextId,
        id: id
    };
};

// To be deleted or changed due to
// context coordinates added to info
export const clearContextInfo = () => {
    return {
        type: actionTypes.contextInfo.clear
    };
};

export const setContextName = (newTitle)=> {
    return {
        type: actionTypes.contextInfo.setContextName,
        payload: newTitle
    };
};

// Accepts mouse event
export const startPanning = mouseEvent => {
    return {
        type: actionTypes.contextInfo.startPanning,
        payload:mouseEvent
    };
};

// Accepts mouse event
export const panContext = mouseEvent => {
    return {
        type: actionTypes.contextInfo.panContext,
        payload:mouseEvent
    };
};