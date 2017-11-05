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
        glyphs: state.glyphs,
        connections: state.connections,
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

    moveBlock(block) {
        let that = this;

        block.setState({onMouseUp: function() {
                                    that.setState({onMouseMove: null});
                                    block.setState({onMouseUp: null});
                                    that.props.moveBlocks(block);
                                    }});
        that.setState({onMouseMove: function(e) {
                                        block.setState({t: e.clientY, l: e.clientX });
                                        }});

    }

    render () {
        return (
            <div className="Context" onMouseMove={this.state.onMouseMove}>
                <button onClick={this.props.createBlock}> Create </button>
                {Object.keys(this.props.glyphs).map((glyphKey, index)=>
                    <Glyph key={index} info={this.props.glyphs[glyphKey]} moveBlock={this.moveBlock} />
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