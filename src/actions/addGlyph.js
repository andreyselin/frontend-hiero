/*-addGlyphAction-*/
export const addGlyph = ()=> {
    return {
        type: 'ADD_GLYPH',
        payload: {
            'name': "jopa",
            'data': {
                link:"jopa",
                w: 50,
                h: 50,
                l: 400,
                t: 300,
                label: 'Lovsky',
                img: 'http://avt-1.foto.mail.ru/mail/alex.belilovsky/_avatar180?1281727751'
            }
        }
    };
};
/*-/addGlyphAction-*/