import React from 'react';
import Glyph from '../Glyph';
import Connection from '../Connection';
import "./Context.css";
import {connect} from 'react-redux';


function mapStateToProps(state) {
    return {
        glyphs: state.glyphs,
        connections: state.connections,

    }
}

class Context extends React.Component {
    constructor (props) {
        super(props);
        this.state = this.props;
       // this.state.onMouseMove = null;
       // this.state.onMouseDown = null;
        this.moveBlock = this.moveBlock.bind(this);

    }

    moveBlock(block) {
        var that = this;
        block.setState({onMouseUp: function() {
                                 that.setState({onMouseMove: null});
                                 block.setState({onMouseUp: null});
                        }});
        that.setState({onMouseMove: function(e) {
                                        block.setState({t: e.clientY, l: e.clientX });
                                        }});

    }

    render () {
        return (
            <div className="Context" onMouseMove={this.state.onMouseMove}>
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

export default connect(mapStateToProps)(Context);