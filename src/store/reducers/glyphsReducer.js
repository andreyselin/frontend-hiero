import {getContextFromServer} from '../api/dataFromServer';


/*-glyphReducer-*/
export default function glyphs(state = getContextFromServer.glyphs, action) {

    if (action.type === 'ADD_GLYPH') {

        return {
            ...state,
            [action.payload['name']]:action.payload['data']
        }
    }

    if (action.type === 'MOVE_GLYPH') {

        return {
            ...state,
            ...{[action.payload.link]:(action.payload)}
        }
    }

    return state;
}
/*-/glyphReducer-*/
