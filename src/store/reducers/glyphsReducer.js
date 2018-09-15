import {actionTypes} from '../../const';
import store from '../../store/store';
import Glyph from '../../classes/glyph';


/*-glyphReducer-*/
export default function glyphs(state = {}, action) {


    if (action.type === actionTypes.glyph.add) {

        let newGlyph = new Glyph({
            w: 50,
            h: 50,
            l: action.payload.l - store.getState().activeContext.info.l,
            t: action.payload.t - store.getState().activeContext.info.t,
            header: "Заголовок",   // newGlyph.header,
            label:  "",   // newGlyph.label,
            img:    null  // newGlyph.imgSrc ? {src: newGlyph.imgSrc} : null
        });

        return {
            ...state,
            [newGlyph.link]:newGlyph
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
