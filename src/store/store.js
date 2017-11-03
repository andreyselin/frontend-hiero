
import {createStore} from 'redux';

/*
*/
//var context = prepareContext(whatServerWillReturn);
//

function prepareContext(theContext) {
    var theGlyph;
    Object.keys(theContext.glyphs).forEach(glyphKey=>{
        theGlyph = theContext.glyphs[glyphKey];
        theGlyph.mt = -1 * (theGlyph.h/2);
        theGlyph.ml = -1 * (theGlyph.w/2);
    });


    theContext.connections.forEach(connection=>{
        connection.from = theContext.glyphs[connection.fromLink];
        connection.to   = theContext.glyphs[connection.toLink];
    });

    //console.log(theContext);



    return theContext;
}

function blocks() {

    let whatServerWillReturn = {
        glyphs: {
            "a402fe": {     link:"a402fe",     w: 50,     h: 50,     l: 64,     t: 64      },
            "04a2c9": {     link:"04a2c9",     w: 30,     h: 30,     l: 128,    t: 128     }
        },
        connections: [
            {
                link: "1a372",
                fromLink: "a402fe",
                toLink:   "04a2c9"
            }
        ]
    };

    return prepareContext(whatServerWillReturn);
}

const store = createStore(blocks);

store.subscribe(()=>{
    console.log(store.getState());
});

export default store;