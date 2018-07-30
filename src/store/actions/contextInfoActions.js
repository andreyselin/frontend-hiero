import actionTypes from '../../constants/actionTypes';

export const updateContextInfo = (payload)=> {
    return {
        type: actionTypes.contextInfo.update,
        payload:payload
    };
};