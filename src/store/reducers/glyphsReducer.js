import {actionTypes} from '../../const';


/*-glyphReducer-*/
export default function glyphs(state = {}, action) {


    if (action.type === actionTypes.glyph.add) {
        return {
            ...state,
            [action.payload['link']]:action.payload
        }
    }




    else if  (action.type === actionTypes.glyph.setBounds) {
        return {
            ...state,
            [action.payload.link]:{...state[action.payload.link], ...action.payload}
        }
    }




    else if (action.type === actionTypes.glyph.move) {

        return {
            ...state,
            [action.payload.link]:{
                ...state[action.payload.link],
                t: action.payload.t,
                l: action.payload.l
            }
        }
    }




    else if (action.type === actionTypes.glyph.updateAll) {
        return action.payload;
    }




    else if (action.type === actionTypes.glyph.clearAll) {
        return {};
    }




    else if (action.type === actionTypes.glyph.remove) {
        let newState = {...state};
        delete newState[action.payload];
        return {
            ...newState
        }
    }


    if  (action.type === actionTypes.glyph.editStyle) {
        return {
            ...state,
            [action.payload.glyph]:{
                ...state[action.payload.glyph],
                style: action.payload.style
            }
        }
    }


    return state;
}
/*-/glyphReducer-*/
