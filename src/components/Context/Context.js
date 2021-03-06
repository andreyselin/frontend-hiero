import React, {Component} from 'react';
import Glyph from '../Glyph';
import Connection from '../Connection';
import "./Context.css";
import {connect} from 'react-redux';
import classNames from 'classnames';
import {addGlyph, editGlyph, moveGlyph, removeGlyph, setActiveGlyph} from '../../store/actions/glyphActions';
import {startPanning, panContext} from '../../store/actions/contextInfoActions';
import {bindActionCreators} from 'redux';
import ConnectionMenu from '../ConnectionMenu';
import {getGlyphsArray, findChildrenLinks, findGlyphsConections} from './contextFuncs';
import {removeConnection} from '../../store/actions/connectionActions';

function mapStateToProps(state) {
    return {
        glyphs:        state.activeContext.glyphs,
        connections:   state.activeContext.connections,
        info:          state.activeContext.info,
        addConnection: state.app.addConnection
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
            addGlyph: addGlyph,
            editGlyph: editGlyph,
            moveGlyph: moveGlyph,
            removeGlyph: removeGlyph,
            removeConnection: removeConnection,
            setActiveGlyph: setActiveGlyph,
            startPanning: startPanning,
            panContext: panContext
        },
        dispatch
    );
}

class Context extends Component {
    constructor (props) {
        super(props);
        this.state = {
            justClickedCount: 0
        };
        this.glyphOnMouseDown = this.glyphOnMouseDown.bind(this);
        this.onConnectionClick = this.onConnectionClick.bind(this);
        this.onConnectionClick = this.onConnectionClick.bind(this);
        this.removeConnection = this.removeConnection.bind(this);
        this.setActiveGlyphInContext = this.setActiveGlyphInContext.bind(this);
        this.removeGlyph = this.removeGlyph.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
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

    onMouseDown(e) {
        let target = e.target;

        if (target.classList.contains('context__wrapper')) {
            let contextWrapper = this.refs.contextWrapper;
            this.props.startPanning(e);
            contextWrapper.classList.add('context__wrapper--grabbing');

            this.setState({
                onMouseMove: this.props.panContext,
                onMouseOut: () => {
                    contextWrapper.classList.remove('context__wrapper--grabbing');
                    this.setState({onMouseMove: null, onMouseUp: null, onMouseOut: null});
                },
                onMouseUp: e => {

                    // Handling double click
                    setTimeout(()=>this.setState({justClickedCount: 0}), 300);
                    if (++this.state.justClickedCount === 2) {
                        let createdGlyph = this.props.addGlyph({
                            l: e.clientX,
                            t: e.clientY
                        });
                        this.props.editGlyph(createdGlyph);
                    }

                    contextWrapper.classList.remove('context__wrapper--grabbing');
                    this.setState({onMouseMove: null, onMouseUp: null, onMouseOut: null});
                }
            });
        }
    }

    render () {
        return (
            <div className={ classNames("context__wrapper") }
                 onMouseMove={this.state.onMouseMove}
                 onClick={this.state.mouseClick}
                 onMouseDown={this.onMouseDown}
                 onMouseUp={this.state.onMouseUp}
                 onMouseOut={this.state.onMouseOut}
                 ref='contextWrapper'
                >
                <div ref='context'
                    className={ classNames("Context", this.props.addConnection.mode) }
                    style={{
                       top:  this.props.info.t,
                       left: this.props.info.l
                    }}>

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
            </div>
        )
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(Context);
