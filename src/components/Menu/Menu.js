import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Store from '../../store/store.js';
import {addGlyph} from '../../store/actions/glyphActions';
import {addConnectionTurnOn} from '../../store/actions/connectionActions';
import './Menu.css';


function mapStateToProps(state) {
    return {
        glyphs:      {}, //state.navigators[0].context.glyphs,
        connections: []  //state.navigators[0].context.connections
    }
}


function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            addGlyph: addGlyph,
            addConnectionTurnOn: addConnectionTurnOn,
        },
        dispatch
    );
}


class Menu extends Component {
    constructor(props) {
        super(props);
        this.addGlyph      = this.addGlyph.bind(this);
        this.addConnection = this.addConnection.bind(this);
        this.state = {
            newGlyphLabel: "привет"
        };
    }

    handleChange (event) {
        this.setState({newGlyphLabel:event.target.value});
    }

    addGlyph() {
        this.props.addGlyph({label:this.state.newGlyphLabel});
    }

    addConnection() {
        this.props.addConnectionTurnOn();
    }

    showStore() {
        var a = Store.getState();
        console.log("a", a);
    }

    render() {
        return (
            <div className="Menu">
                <div className="Menu_block">
                    <div className="Menu_block_header">Add new glyph</div>
                    <div className="Menu_block_row">
                        <input
                            type="text"
                            value={this.state.newGlyphLabel}
                            onChange={ this.handleChange.bind(this) }
                            placeholder="Label for new glyph"
                            />
                    </div>
                    <div className="Menu_block_row">
                        <button onClick={this.addGlyph}>Add glyph</button>
                    </div>
                    <div className="Menu_block_row">
                        <button onClick={this.addConnection}>Add connection</button>
                    </div>
                </div>


                <div className="Menu_block">
                    <div className="Menu_block_header">Save context</div>
                    <div className="Menu_block_row">
                        <button onClick={this.showStore}>Show store</button>
                    </div>
                </div>


                <div className="Menu_block">
                    <div className="Menu_block_header">Open contexts</div>
                    <ul class="Menu_contexts-list">
                        <li>111</li>
                        <li>222</li>
                    </ul>
                </div>
            </div>
        );
    }
}

//export default Menu;
export default connect(mapStateToProps, matchDispatchToProps)(Menu);