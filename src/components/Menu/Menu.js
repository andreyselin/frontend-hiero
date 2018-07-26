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
        this.handleChange  = this.handleChange.bind(this);
        this.state = {
            newGlyphImgSrc: "",
            newGlyphHeader: "Заголовок",
            newGlyphLabel:  "Подзаголовок"
        };
    }

    handleChange (target) {

        return event=>this.setState({[target]:event.target.value});

    }

    addGlyph() {
        this.props.addGlyph({
            imgSrc: this.state.newGlyphImgSrc,
            header: this.state.newGlyphHeader,
            label:  this.state.newGlyphLabel
        });
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
                        Image source:<br />
                        <input
                            type="text"
                            value={this.state.newGlyphImgSrc}
                            onChange={ this.handleChange('newGlyphImgSrc') }
                            placeholder="Image source"
                            />
                    </div>
                    <div className="Menu_block_row">
                        Glyph header:<br />
                        <input
                            type="text"
                            value={this.state.newGlyphHeader}
                            onChange={ this.handleChange('newGlyphHeader') }
                            placeholder="Header for new glyph"
                            />
                    </div>
                    <div className="Menu_block_row">
                        Glyph label:<br />
                        <input
                            type="text"
                            value={this.state.newGlyphLabel}
                            onChange={ this.handleChange('newGlyphLabel') }
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
                    <ul className="Menu_contexts-list">
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