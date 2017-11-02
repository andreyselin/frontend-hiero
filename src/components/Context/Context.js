import React from 'react';
import Glyph from '../Glyph';
import Connection from '../Connection';
import "./Context.css";



var whatServerWillReturn = {
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


    return theContext;
}

    //


class Context extends React.Component {
    constructor (props) {
        super(props);
        this.state = prepareContext(whatServerWillReturn);
        this.state.onMouseMove = null;
        this.state.onMouseDown = null;
        this.moveBlock = this.moveBlock.bind(this);

    }

    moveBlock(block) {
        var that = this;
        block.setState({onMouseUp: function() {
                                 that.setState({onMouseMove: null});
                                 block.setState({onMouseUp: null});
                        }});
        that.setState({onMouseMove:  function(e) {
                                        block.setState({t: e.clientY, l: e.clientX });
                                        }});

    }

    render () {
        return (
            <div className="Context" onMouseMove={this.state.onMouseMove} onMouseDown={this.state.onMouseDown} >
                {Object.keys(this.state.glyphs).map((glyphKey, index)=>
                    <Glyph key={index} info={this.state.glyphs[glyphKey]} moveBlock={this.moveBlock} />
                )}
                {this.state.connections.map((connection, index)=>
                    <Connection key={index} info={connection} />
                )}
            </div>
        )
    }
}

export default Context;