import {actionTypes} from '../../const';

export default function activeGlyph(state = {}, action) {
    
    if (action.type === actionTypes.glyph.setActive) {
        return {
            glyph: action.payload
        }
    }

    return {
        glyph: null
    }
}