/*-addGlyphAction-*/
export const addGlyph = (newGlyph)=> {


    let newLink = Math.random().toString(36).slice(2);


    return {
        type: 'ADD_GLYPH',
        payload: {
            'name': newLink,
            'data': {
                link:newLink,
                w: 50,
                h: 50,
                l: 400,
                t: 300,
                label: newGlyph.label || 'default',
                img: 'http://avt-1.foto.mail.ru/mail/alex.belilovsky/_avatar180?1281727751'
            }
        }
    };
};
/*-/addGlyphAction-*/