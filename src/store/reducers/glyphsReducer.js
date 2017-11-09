import {serverReturnGlyphs} from '../api/dataFromServer';


export default function glyphs(state = serverReturnGlyphs, action) {

    if (action.type === 'ADD_GLYPH') {

        return {
            ...state,
            [action.payload['name']]:action.payload['data']
        }
    }

    if (action.type === 'MOVE_GLYPH') {

        let data = action.payload;
        state[data.link] = data;

        return state;
    }

    return state;
}
