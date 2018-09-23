import {actionTypes} from '../../const';
import {showEditGlyphMenuBlock} from '../actions/menuBlocksActions';
import store from '../store';
import Glyph from '../../classes/glyph';

/*-glyphReducer-*/
export default function glyphs(state = {}, action) {

    if (action.type === actionTypes.glyph.add) {
      let newGlyph = new Glyph({
          w: 250,
          h: 50,
          l: action.payload.l - store.getState().activeContext.info.l,
          t: action.payload.t - store.getState().activeContext.info.t,
          header: "Заголовок",
          label:  "",
          img:    null
      });
      setTimeout (()=>store.dispatch(showEditGlyphMenuBlock(newGlyph)), 1);
      return {
          ...state,
          [newGlyph.link]: newGlyph
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


    else if  (action.type === actionTypes.glyph.editStyle) {
        return {
            ...state,
            [action.payload.glyph]:{
                ...state[action.payload.glyph],
                style: action.payload.style
            }
        }
    }


    // This SAVES the glyph when user pushed save button
    else if  (action.type === actionTypes.glyph.edit) {

      // console.log(action.payload.link, action.payload.glyph, state[action.payload.link])
      console.log(action.payload, "\n\n\n", state[action.payload.link]);

        return {
            ...state,
            [action.payload.link]:{
                ...state[action.payload.link],
                ...action.payload.glyph
                // style: action.payload.style
            }
        }
    }


    return state;
}
/*-/glyphReducer-*/
