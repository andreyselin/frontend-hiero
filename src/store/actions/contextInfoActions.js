import {actionTypes} from '../../constants/const';

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