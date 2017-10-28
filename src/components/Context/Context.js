import React from 'react';
import Glyph from '../Glyph';



var whatServerWillReturn = {
    glyphs: {
        "a402fe": {     w: 50,     h: 50,     l: 300,     t: 200     },
        "01b3c9": {     w: 40,     h: 40,     l: 400,     t: 300     },
        "04a2c9": {     w: 30,     h: 30,     l: 500,     t: 400     }
    },
    connections: [
        {
            link: "a9f23",
            from: "a402fe",
            to:   "01b3c9"
        },{
            link: "1a372",
            from: "a402fe",
            to:   "04a2c9"
        }
    ]
};

    //

function prepareContext(theContext) {
    var theGlyph;
    Object.keys(theContext.glyphs).forEach(glyphKey=>{
        theGlyph = theContext.glyphs[glyphKey];
        theGlyph.mt = -1 * (theGlyph.h/2);
        theGlyph.ml = -1 * (theGlyph.w/2);
    });
    return theContext;
}

    //


class Context extends React.Component {
    constructor (props) {
        super(props);
        this.state = prepareContext(whatServerWillReturn);
    }

    render () {
        return (
            <div className="Context">
                {Object.keys(this.state.glyphs).map((glyphKey, index)=>
                    <Glyph key={index} info={this.state.glyphs[glyphKey]} />
                )}
            </div>
        )
    }
}

export default Context;