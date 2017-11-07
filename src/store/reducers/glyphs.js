import {whatServerWillReturn} from '../api/dataFromServer';

function createGlyphsAndConnections(state = whatServerWillReturn, action) {



    if (action.type === 'ADD_GLYPH') {

        return {
            ...state,
            glyphs: {...state.glyphs, [action.payload['name']]:action.payload['data'] }
        }
    }

    if (action.type === 'MOVE_GLYPH') {

        let data = action.payload;
        state.glyphs[data.link] = data;

        return state;
    }

    return state;
}


export default createGlyphsAndConnections;