import actionTypes from '../../constants/actionTypes';

export default function contextInfoReducer(state = {}, action) {

    if (action.type === actionTypes.contextInfo.update) {
        return {...action.payload}
    }

    return state;
}

