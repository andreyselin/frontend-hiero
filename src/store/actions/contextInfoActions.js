import {actionTypes} from '../../constants/const';

export const updateContextInfo = (payload)=> {
    return {
        type: actionTypes.contextInfo.update,
        payload:payload
    };
};