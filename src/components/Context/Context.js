import React, {Component} from 'react';
import Glyph from '../Glyph';
import Connection from '../Connection';
import "./Context.css";
import {connect} from 'react-redux';
import {moveBlocks} from '../../actions/moveblocks';
import {createBlock} from '../../actions/createblock';
import {bindActionCreators} from 'redux';


function mapStateToProps(state) {
    return {
        glyphs: state.glyphs.glyphs,
        connections: state.glyphs.connections
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({moveBlocks: moveBlocks, createBlock: createBlock}, dispatch);
}

class Context extends Component {
    constructor (props) {
        super(props);
        this.state = {};
        this.moveBlock = this.moveBlock.bind(this);

    }

    moveBlock(block, event) {
        let that = this;
        let shiftX = event.clientX - block.state.l;
        let shiftY = event.clientY - block.state.t;

        block.setState({onMouseUp: function() {
                                    that.setState({onMouseMove: null});
                                    block.setState({onMouseUp: null});
                                    }});
        that.setState({onMouseMove: function(e) {
                                        let coordsLeft = e.clientX - shiftX;
                                        let coordsTop = e.clientY - shiftY;
                                        block.setState({t: coordsTop, l: coordsLeft });
                                        that.setState({});                                    // cheat
                                        that.props.moveBlocks(block);
                                        }});

    }

    render () {

        return (
            <div className="Context" onMouseMove={this.state.onMouseMove}>
                <button onClick={this.props.createBlock}> Create </button>
                {Object.keys(this.props.glyphs).map((glyphKey, index)=>
                    <Glyph key={index} data={this.props.glyphs[glyphKey]} moveBlock={this.moveBlock} />
                )}
                {this.props.connections.map((connection, index)=>
                    <Connection key={index} from={this.props.glyphs[connection.fromLink]}
                                            to={this.props.glyphs[connection.toLink]}/>

                )}
            </div>
        )
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(Context);