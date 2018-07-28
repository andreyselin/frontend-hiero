import actionTypes from '../../constants/actionTypes';
import Glyph from '../../classes/glyph';

export const addGlyph = (newGlyph)=> {

    console.log("img:    newGlyph.imgSrc",newGlyph.imgSrc);

    return {
        type: actionTypes.glyph.add,
        payload: new Glyph({
            w: 50,
            h: 50,
            l: 400,
            t: 300,
            header: newGlyph.header,
            label:  newGlyph.label,
            img:    newGlyph.imgSrc ? {src: newGlyph.imgSrc} : null
        })
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

export const setActiveGlyph = (glyph) => {
    return {
        type: actionTypes.glyph.setActive,
        payload: glyph
    }
};