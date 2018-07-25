import actionTypes from '../../constants/actionTypes';


export const addGlyph = (newGlyph)=> {

    let newLink = Math.random().toString(36).slice(2);

    return {
        type: actionTypes.glyph.add,
        payload: {
            link:newLink,
            w: 50,
            h: 50,
            l: 400,
            t: 300,
            label: newGlyph.label || 'default',
            img: null
        }
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


export const updateAllGlyphs = (newGlyphs) => { //
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