import contextService from '../../services/context';
import actionTypes from '../../constants/actionTypes';


/*-glyphReducer-*/
export default function glyphs(state = {}, action) {

    if (action.type === actionTypes.glyph.add) {

        return {
            ...state,
            [action.payload['link']]:action.payload
        }
    }

    if  (action.type === actionTypes.glyph.setBounds) {
        
        return {
            ...state,
            [action.payload.link]:{...state[action.payload.link], ...action.payload}
        }
    }

    if (action.type === actionTypes.glyph.move) {

        console.log("move reducer", action.payload, action.payload.link);

        return {
            ...state,
            [action.payload.link]:{
                ...state[action.payload.link],
                t: action.payload.t,
                l: action.payload.l
            }
        }
    }

    if (action.type === actionTypes.glyph.moveTree) {

        console.log("move tree reducer", action.payload, action.payload.link);//

        return {
            ...state,
            [action.payload.link]:{
                ...state[action.payload.link],
                t: action.payload.t,
                l: action.payload.l
            }
        }
    }

    if (action.type === actionTypes.glyph.updateAll) {
        return action.payload;
    }

    return state;
}
/*-/glyphReducer-*/
