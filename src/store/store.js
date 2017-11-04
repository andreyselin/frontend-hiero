
import {createStore} from 'redux';

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
            toLink:   "04a2c9"
        }
    ]
};

let fromAPI = prepareContext(whatServerWillReturn);

function prepareContext(theContext) {
    let theGlyph;
    Object.keys(theContext.glyphs).forEach(glyphKey=>{
        theGlyph = theContext.glyphs[glyphKey];
        theGlyph.mt = -1 * (theGlyph.h/2);
        theGlyph.ml = -1 * (theGlyph.w/2);
    });


    theContext.connections.forEach(connection=>{
        connection.from = theContext.glyphs[connection.fromLink];
        connection.to   = theContext.glyphs[connection.toLink];
    });

    return theContext;
}

/*Hardcore end*/


function createGlyphsAndConnections(state = fromAPI, action) {



    if (action.type === 'ADD_BLOCK') {
        action.payload.data.mt = -1 * action.payload.data.h/2;
        action.payload.data.ml = -1 * action.payload.data.w/2;

        //console.log(state);

        return {
            ...state,
            glyphs: {...state.glyphs, [action.payload['name']]:action.payload['data'] }
        }
    }

    if (action.type === 'EDIT_BLOCK') {
        let data = action.payload.data;
        state.glyphs[data.link] = data;

        //console.log(state);

        state.connections.forEach(connection=>{
            connection.from = state.glyphs[connection.fromLink];
            connection.to   = state.glyphs[connection.toLink];
        });

        //console.log(state);

        return state;
    }


    return state;
}

const store = createStore(createGlyphsAndConnections);


export default store;