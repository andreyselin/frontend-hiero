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

    if (action.type === actionTypes.glyph.move) {

        return {
            ...state,
            ...{[action.payload.link]:(action.payload)}
        }
    }

    return state;
}
/*-/glyphReducer-*/
