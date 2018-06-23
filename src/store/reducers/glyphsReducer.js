import {initialContext} from '../api/dataFromServer';
import actionTypes from '../../constants/actionTypes';


/*-glyphReducer-*/
export default function glyphs(state = initialContext.glyphs, action) {

    if (action.type === actionTypes.glyph.add) {

        return {
            ...state,
            [action.payload['link']]:action.payload
        }
    }

    if  (action.type === actionTypes.glyph.setBounds) {
        //console.log("!");
        return {
            ...state,
            [action.payload.link]:{...state[action.payload.link], ...action.payload}
        }
    }

    if (action.type === actionTypes.glyph.move) {

        return {
            ...state,
            [action.payload.link]:{
                ...state[action.payload.link],
                t: action.payload.t,
                l: action.payload.l
            }
        }
    }

    return state;
}
/*-/glyphReducer-*/
