import actionTypes from '../../constants/actionTypes';

/*-addGlyphAction-*/
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
/*-/addGlyphAction-*/


/*-setGlyphBounds-*/
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
/*-/setGlyphBounds-*/


/*-moveGlyphAction-*/
export const moveGlyph = (glyph) => {
    return {
        type: actionTypes.glyph.move,
        payload: glyph.state
    }
}
/*-/moveGlyphAction-*/
