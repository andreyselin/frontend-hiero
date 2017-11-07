import React, {Component} from 'react';
import Glyph from '../Glyph';
import Connection from '../Connection';
import "./Context.css";
import {connect} from 'react-redux';
import {moveGlyph} from '../../actions/moveglyph';
import {createGlyph} from '../../actions/createglyph';
import {bindActionCreators} from 'redux';


function mapStateToProps(state) {
    return {
        glyphs: state.glyphs.glyphs,
        connections: state.glyphs.connections,
        info: state.info
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({moveGlyph: moveGlyph, createGlyph: createGlyph}, dispatch);
}

class Context extends Component {
    constructor (props) {
        super(props);
        this.state = {};
        this.moveBlock = this.moveBlock.bind(this);

    }

    moveBlock(glyph, event) {
        let that = this;
        let shiftX = event.clientX - glyph.state.l;
        let shiftY = event.clientY - glyph.state.t;

        glyph.setState({onMouseUp: function() {
                                    that.setState({onMouseMove: null});
                                    glyph.setState({onMouseUp: null});
                                    }});
        that.setState({onMouseMove: function(e) {
                                        let coordsLeft = e.clientX - shiftX;
                                        let coordsTop = e.clientY - shiftY;
                                        glyph.setState({t: coordsTop, l: coordsLeft});
                                        that.props.moveGlyph(glyph);
                                        }});
    }

    render () {

        return (
            <div className="Context" onMouseMove={this.state.onMouseMove}>
                <button onClick={this.props.createGlyph}> Create </button>
                {Object.keys(this.props.glyphs).map((glyphKey, index)=>
                    <Glyph key={index} data={this.props.glyphs[glyphKey]} func={this.moveBlock} info={this.props.info}/>
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