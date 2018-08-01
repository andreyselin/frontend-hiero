import React, {Component} from 'react';
import Glyph from '../Glyph';
import Connection from '../Connection';
import "./Context.css";
import {connect} from 'react-redux';
import classNames from 'classnames';
import {moveGlyph, removeGlyph, setActiveGlyph} from '../../store/actions/glyphActions';
import {bindActionCreators} from 'redux';
import ConnectionMenu from '../ConnectionMenu';
import {getGlyphsArray, findChildrenLinks, findGlyphsConections} from './contextFuncs';
import {removeConnection} from '../../store/actions/connectionActions';

function mapStateToProps(state) {
    return {
        glyphs:        state.activeContext.glyphs,
        connections:   state.activeContext.connections,
        addConnection: state.app.addConnection
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
            moveGlyph: moveGlyph,
            removeGlyph: removeGlyph,
            removeConnection: removeConnection,
            setActiveGlyph: setActiveGlyph
        },
        dispatch
    );
}

class Context extends Component {
    constructor (props) {
        super(props);
        this.state = {};
        this.glyphOnMouseDown = this.glyphOnMouseDown.bind(this);
        this.onConnectionClick = this.onConnectionClick.bind(this);
        this.onConnectionClick = this.onConnectionClick.bind(this);
        this.removeConnection = this.removeConnection.bind(this);
        this.setActiveGlyphInContext = this.setActiveGlyphInContext.bind(this);
        this.removeGlyph = this.removeGlyph.bind(this);
    }

    showMenu(event){}

    glyphOnMouseDown(glyph, event) {
        let shiftX = event.clientX - glyph.l;
        let shiftY = event.clientY - glyph.t;
        let allMovingGlyphsLink = findChildrenLinks(glyph, this.props.connections);
        let allMovingGlyphs = JSON.parse(JSON.stringify(getGlyphsArray(allMovingGlyphsLink, this.props.glyphs)));
        let startCoords = {
            left: glyph.l,
            top:  glyph.t
        };        

        this.setState({onMouseMove: (e) => {
            let treeShiftX = startCoords.left - e.clientX;
            let treeShiftY = startCoords.top - e.clientY;
            allMovingGlyphs.forEach((treeGlyph) => {
                let phantomGlyph = Object.assign({}, treeGlyph);
                phantomGlyph.t = treeGlyph.t - treeShiftY - shiftY;
                phantomGlyph.l = treeGlyph.l - treeShiftX - shiftX;
                this.props.moveGlyph (phantomGlyph);
            });
        }});

        this.setState({
            onMouseUp: (e) => {
                this.setState({onMouseDown: null});
                this.setState({onMouseMove: null});
            }
        });
    }

    onConnectionClick(targetConnection, e) {
        let ConnectionMenu = this.refs.connectionMenu;
        let $this = this;
        
        ConnectionMenu.setState({
            top: e.clientY,
            left: e.clientX,
            display: 'block',
            targetConnection: targetConnection
        });
        
        $this.setState({
            mouseClick: (e) => {
                if (!e.target.classList.contains('connection-menu__link')) {
                    ConnectionMenu.setState({
                        display: 'none',
                        targetConnection: null
                    });
                    $this.setState({mouseClick: null});
                }
            }
        });
    }

    removeConnection(e, targetConnection) {
        let ConnectionMenu = this.refs.connectionMenu;

        e.preventDefault();
        this.props.removeConnection(targetConnection);
        ConnectionMenu.setState({
            display: 'none',
            targetConnection: null
        });
        this.setState({mouseClick: null});
    }

    removeGlyph(glyph) {
        let targetGlyph = glyph.props.glyph.link;
        let removeConnections = findGlyphsConections(targetGlyph, this);
        
        removeConnections.forEach((connection) => {
            this.props.removeConnection(connection.link);
        });
        this.props.removeGlyph(targetGlyph);
    }

    setActiveGlyphInContext(glyph) {
        this.props.setActiveGlyph(glyph);
    }

    render () {
        return (
            <div className={ classNames("Context", this.props.addConnection.mode) }
                 onMouseMove={this.state.onMouseMove}
                 onClick={this.state.mouseClick}
                 onMouseDown={this.state.onMouseDown}
                 onMouseUp={this.state.onMouseUp}
                 >

                <ConnectionMenu
                    ref="connectionMenu"
                    removeConnection={this.removeConnection} />

                {Object.keys(this.props.glyphs).map((glyphKey, index)=>
                    <Glyph
                        key={index}
                        glyph={this.props.glyphs[glyphKey]}
                        glyphOnMouseDown={this.glyphOnMouseDown}
                        setActiveGlyphInContext={this.setActiveGlyphInContext} />
                )}

                {this.props.connections.map((connection, index)=>
                    <Connection
                        key={index}
                        from={this.props.glyphs[connection.fromLink]}
                        to={this.props.glyphs[connection.toLink]}
                        onClick={this.onConnectionClick}
                        connection={connection} />
                )}
            </div>
        )
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(Context);