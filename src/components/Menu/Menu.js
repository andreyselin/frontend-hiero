import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Store from '../../store/store.js';
import {addConnectionTurnOn} from '../../store/actions/connectionActions';
import {removeGlyph} from '../../store/actions/glyphActions';
import {findGlyphsConections} from '../Context/contextFuncs';
import {removeConnection} from '../../store/actions/connectionActions';
import MenuBlockAddGlyph from './blocks/AddGlyph';
import MenuBlockOpenContext from './blocks/OpenContext';
import contextService from '../../services/context';

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
    return bindActionCreators({
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
        this.addConnection = this.addConnection.bind(this);
        this.removeGlyph = this.removeGlyph.bind(this);
    }

    addConnection() {
        this.props.addConnectionTurnOn();
    }

    showStore() {
        var a = Store.getState();
        console.log("a", a);
    }

    saveContext() {
        contextService.save(Store.getState().activeContext);
    }

    removeGlyph(glyph) {

        // Po logike active glyph ne doljen hranitsya v contexte -
        // seichas on uhodit pri sohranenii na backend.
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

                {/* <MenuBlockAddGlyph /> */}
                <MenuBlockOpenContext />

                <div className="Menu_block">
                    <div className="Menu_block_header">Save context</div>
                    <div className="Menu_block_row">
                        <button onClick={this.showStore}>Show store</button>
                        <button onClick={this.saveContext}>Save context</button>
                    </div>
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