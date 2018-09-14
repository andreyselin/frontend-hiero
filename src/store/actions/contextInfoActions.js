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

export const clearContextInfo = ()=> {
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