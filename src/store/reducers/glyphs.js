
/*Hardcore*/
let whatServerWillReturn = {
    glyphs: {
        "a402fe": {     link:"a402fe",     w: 50,     h: 50,     l: 64,     t: 64      },
        "04a2c9": {     link:"04a2c9",     w: 30,     h: 30,     l: 200,    t: 210     }
    },
    connections: [
        {
            link: "1a372",
            fromLink: "a402fe",
            toLink: "04a2c9"
        }
    ]
};

/*Hardcore end*/


function createGlyphsAndConnections(state = whatServerWillReturn, action) {



    if (action.type === 'ADD_BLOCK') {

        return {
            ...state,
            glyphs: {...state.glyphs, [action.payload['name']]:action.payload['data'] }
        }
    }

    if (action.type === 'EDIT_BLOCK') {
        let data = action.payload.data;
        state.glyphs[data.link] = data;

        return state;
    }

    return state;
}


export default createGlyphsAndConnections;