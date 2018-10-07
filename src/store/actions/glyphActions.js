import {actionTypes} from '../../const';

export const addGlyph = params=> {
  return {
      type: actionTypes.glyph.add,
      payload: params
  };
};


export const setGlyphBounds = (glyph) => {
    return {
        type: actionTypes.glyph.setBounds,
        payload: {
            link: glyph.link,
            w:    glyph.w,
            h:    glyph.h
        }
    };
};


export const moveGlyph = glyph => {
    return {
        type: actionTypes.glyph.move,
        navigatorIndex: 0,
        payload: glyph
    }
};


export const updateAllGlyphs = (newGlyphs) => {
    return {
        type: actionTypes.glyph.updateAll,
        payload: newGlyphs
    }
};

export const removeGlyph = (glyph) => {
    return {
        type: actionTypes.glyph.remove,
        payload: glyph
    }
};


export const clearAllGlyphs = () => {
    return {
        type: actionTypes.glyph.clearAll
    }
};

export const editGlyph = (link, glyph) => {
    console.log("edit action", glyph);
    return {
        type: actionTypes.glyph.edit,
        payload: {link, glyph}
    }
};


export const setActiveGlyph = (glyph) => {
    return {
        type: actionTypes.glyph.setActive,
        payload: glyph
    }
};
