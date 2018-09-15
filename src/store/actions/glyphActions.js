import {actionTypes} from '../../const';

export const addGlyph = (newGlyph)=> {
    return {
        type: actionTypes.glyph.add,
        payload: newGlyph
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

// Todo:check
export const editGlyphStyle = (glyph, style) => {
    return {
        type: actionTypes.glyph.editStyle,
        payload: {
            glyph,
            style
        }
    }
};


export const setActiveGlyph = (glyph) => {
    return {
        type: actionTypes.glyph.setActive,
        payload: glyph
    }
};