import contextsService from '../../services/contexts';
import actionTypes from '../../constants/actionTypes';


/*-glyphReducer-*/
export default function glyphs(state = contextsService.currentContext.glyphs, action) {

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

    if (action.type === actionTypes.glyph.remove) {
        //console.log('reducer ', action.payload)
        let newState = {...state};

        delete newState[action.payload];

        return {
            ...newState
        }
    }

    return state;
}
/*-/glyphReducer-*/
