import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Store from '../../store/store.js';
import {addGlyph} from '../../store/actions/glyphActions';
import {addConnectionTurnOn} from '../../store/actions/connectionActions';
import {removeGlyph} from '../../store/actions/glyphActions';
import {findGlyphsConections} from '../Context/contextFuncs';
import {removeConnection} from '../../store/actions/connectionActions';
import GlyphMenu from '../GlyphMenu/GlyphMenu';
import './Menu.css';

function mapStateToProps(state) {
    return {
        glyphs:      {}, //state.navigators[0].context.glyphs,
        connections: state.activeContext.connections,
        activeGlyph: state.activeContext.activeGlyph
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            addGlyph: addGlyph,
            addConnectionTurnOn: addConnectionTurnOn,
            removeGlyph: removeGlyph,
            removeConnection: removeConnection
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
        this.removeGlyph = this.removeGlyph.bind(this);
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

    removeGlyph(glyph) {
        let targetGlyph = this.props.activeGlyph.glyph.props.glyph.link;
        let removeConnections = findGlyphsConections(targetGlyph, this);
        
        removeConnections.forEach((connection) => {
            this.props.removeConnection(connection.link);
        });
        this.props.removeGlyph(targetGlyph);
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


                <div className="Menu_block">
                    <GlyphMenu activeGlyph={this.props.activeGlyph}
                               removeGlyph={this.removeGlyph}
                               />
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(Menu);