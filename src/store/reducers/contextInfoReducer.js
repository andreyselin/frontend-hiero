import {actionTypes} from '../../constants/const';

export default function contextInfoReducer(state = {}, action) {

    if (action.type === actionTypes.contextInfo.update) {
        return {...action.payload}
    }

    return state;
}

