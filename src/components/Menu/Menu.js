import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Store from '../../store/store.js';

import {createContextActionWrapper} from "../../store/actions/contextActionWrappers";
import {addConnectionToggle,
        removeConnection}     from '../../store/actions/connectionActions';
import {toggleMenuBlock}  from '../../store/actions/menuBlocksActions';
import {removeGlyph, editGlyphStyle}      from '../../store/actions/glyphActions';

import {findGlyphsConections} from '../Context/contextFuncs';

import MenuBlockContextInfo   from './blocks/ContextInfo';
import MenuBlockAddGlyph      from './blocks/AddGlyph';
import MenuBlockOpenContext   from './blocks/OpenContext';
import MenuBlockAddConnection from './blocks/AddConnection';

import contextService from '../../services/context';
import {menuBlocks, addConnectionModes}
                      from "../../constants/const";
import GlyphMenu      from '../GlyphMenu/GlyphMenu';
import './Menu.css';

import iconCreate        from '../../img/iconCreate.png';
import iconOpen          from '../../img/iconOpen.png';
import iconSave          from '../../img/iconSave.png';
import iconAddGlyph      from '../../img/iconAddGlyph.png';
import iconAddConnection from '../../img/iconAddConnection.png';

function mapStateToProps(state) {
    return {
        activeGlyph:   state.app.activeGlyph,
        addConnection: state.app.addConnection,
        connections:   state.activeContext.connections,
        menuBlocks:    state.menuBlocks
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
            toggleMenuBlock:     toggleMenuBlock,
            addConnectionToggle: addConnectionToggle,
            removeGlyph:         removeGlyph,
            removeConnection:    removeConnection,
            editGlyphStyle:      editGlyphStyle
        },
        dispatch
    );
}

class Menu extends Component {
    constructor(props) {
        super(props);
        this.addConnection = this.addConnection.bind(this);
        this.removeGlyph = this.removeGlyph.bind(this);
        this.createContext = this.createContext.bind(this);
        this.editGlyphImgPosition = this.editGlyphImgPosition.bind(this);
    }

    addConnection() {
        this.props.addConnectionToggle();
    }

    showStore() {
        var a = Store.getState();
        console.log("a", a);
    }

    saveContext() {
        contextService.save(Store.getState().activeContext);
    }

    editGlyphImgPosition(activeGlyph, style) {
        /* console.log(activeGlyph);
        console.log(style); */
        this.props.editGlyphStyle(activeGlyph.props.glyph.link, style);
    }

    removeGlyph(activeGlyph) {
        let targetGlyph = activeGlyph.props.glyph.link;
        let removeConnections = findGlyphsConections(targetGlyph, this);
        
        removeConnections.forEach((connection) => {
            this.props.removeConnection(connection.link);
        });
        this.props.removeGlyph(targetGlyph);
    }

    createContext () {
        createContextActionWrapper();
    }
    
    render() {
        return (
            <div className="Menu">

                <div className="Menu_header">
                    <div className="Menu_block">
                        <img
                            className="Menu_icon"

                            title="Create context"
                            alt="Create context"
                            src={iconCreate}
                            onClick={this.createContext} />
                        <img
                            className="Menu_icon"

                            title="Open context"
                            alt="Open context"
                            src={iconOpen}
                            onClick={()=>this.props.toggleMenuBlock(menuBlocks.openContext)} />
                        <img
                            className="Menu_icon"
                            title="Save current context"
                            alt="Save current context"
                            src={iconSave}
                            onClick={this.saveContext} />
                    </div>
                    {this.props.menuBlocks.openContext.show && <MenuBlockOpenContext />}
                </div>

                <div className="Menu_content">

                    <MenuBlockContextInfo />

                    <div className="Menu_block">
                        <img
                            className="Menu_icon"
                            alt="Add glyph"
                            title="Add glyph"
                            src={iconAddGlyph}
                            onClick={()=>this.props.toggleMenuBlock(menuBlocks.addGlyph)} />
                        <img
                            className="Menu_icon"
                            alt="Add connection"
                            title="Add connection"
                            src={iconAddConnection}
                            onClick={this.addConnection} />
                    </div>

                    {this.props.menuBlocks.addGlyph.show && <MenuBlockAddGlyph />}
                    {this.props.addConnection.mode===addConnectionModes.connectionModeOn && <MenuBlockAddConnection />}

                    {
                    <div className="Menu_block">
                        <div className="Menu_block_header">Tmp</div>
                        <div className="Menu_block_row">
                            <button onClick={this.showStore}>Show store</button>
                        </div>
                    </div>
                    }

                    <div className="Menu_block">
                        <GlyphMenu activeGlyph={this.props.activeGlyph}
                                   removeGlyph={this.removeGlyph}
                                   editGlyphImgPosition={this.editGlyphImgPosition}
                                   />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(Menu);