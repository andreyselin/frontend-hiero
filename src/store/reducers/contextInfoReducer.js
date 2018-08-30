import {actionTypes} from '../../constants/const';

export default function contextInfoReducer(state = {}, action) {

    if (action.type === actionTypes.contextInfo.update) {
        return {...action.payload}
    }

    else if (action.type === actionTypes.contextInfo.setSavedContextId) {
        return {
            ...state,
            id: action.id
        }
    }

    else if (action.type === actionTypes.contextInfo.clear) {
        return {
            id: null,
            title: "Untitled"
        }
    }

    else if (action.type === actionTypes.contextInfo.setContextName) {
        return {
            ...state,
            title: action.payload
        }
    }

    return state;
}

