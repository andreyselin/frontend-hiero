import {actionTypes} from '../../constants/const';

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