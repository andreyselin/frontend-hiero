import {actionTypes} from '../../const';


// Used to remember panning start offset
let contextPanner = {};
let defaultState = {
    t: 0,
    l: 0
};


export default function contextInfoReducer(state = defaultState, action) {

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
            ...state,
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

    // Payload is event
    // Not changes state
    else if (action.type === actionTypes.contextInfo.startPanning) {
        contextPanner.shiftX = action.payload.clientX - state.l;
        contextPanner.shiftY = action.payload.clientY - state.t;
    }

    // Payload is event
    else if (action.type === actionTypes.contextInfo.panContext) {
        return {
            ...state,
            t: action.payload.clientY - contextPanner.shiftY,
            l: action.payload.clientX - contextPanner.shiftX
        }
    }

    return state;
}

