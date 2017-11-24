import React, {Component} from 'react';
import Glyph from '../Glyph';
import Connection from '../Connection';
import "./Context.css";
import {connect} from 'react-redux';
import classNames from 'classnames';
import {moveGlyph} from '../../store/actions/glyphActions';
import {bindActionCreators} from 'redux';


function mapStateToProps(state) {
    return {
        glyphs: state.context.glyphs,
        connections: state.context.connections
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            moveGlyph: moveGlyph
        },
        dispatch
    );
}

class Context extends Component {
    constructor (props) {
        super(props);
        this.state = {};
        this.moveGlyph = this.moveGlyph.bind(this);

    }

    moveGlyph(glyph, event) {
        let $this = this;
        let shiftX = event.clientX - glyph.state.l;
        let shiftY = event.clientY - glyph.state.t;

        glyph.setState({
            onMouseUp: function() {
                $this.setState({onMouseMove: null});
                glyph.setState({onMouseUp: null});
            }
        });

        $this.setState({
            onMouseMove: function(e) {
                let coordsLeft = e.clientX - shiftX;
                let coordsTop = e.clientY - shiftY;
                glyph.setState({t: coordsTop, l: coordsLeft});
                $this.props.moveGlyph(glyph);
            }
        });
    }

    render () {
        return (
            <div
                className={classNames(
                    "Context",
                    "ConnectionMode2"
                )}
                onMouseMove={this.state.onMouseMove}
                >
                {Object.keys(this.props.glyphs).map((glyphKey, index)=>
                    <Glyph
                        key={index}
                        glyph={this.props.glyphs[glyphKey]}
                        moveGlyph={this.moveGlyph} />
                )}
                {this.props.connections.map((connection, index)=>
                    <Connection
                        key={index}
                        from={this.props.glyphs[connection.fromLink]}
                        to={this.props.glyphs[connection.toLink]}/>
                )}
            </div>
        )
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(Context);