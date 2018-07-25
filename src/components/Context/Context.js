import React, {Component} from 'react';
import Glyph from '../Glyph';
import Connection from '../Connection';
import "./Context.css";
import {connect} from 'react-redux';
import classNames from 'classnames';
import {moveGlyph, removeGlyph} from '../../store/actions/glyphActions';
import {bindActionCreators} from 'redux';
import GlyphMenu from '../GlyphMenu';
import ConnectionMenu from '../ConnectionMenu';
import {getGlyphsArray, findChildrenLinks, findGlyphsConections} from './contextFuncs';
import { removeConnection } from '../../store/actions/connectionActions';

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
            removeConnection: removeConnection
        },
        dispatch
    );
}

class Context extends Component {
    constructor (props) {
        super(props);
        this.state = {};
        this.isMovingTree = true;
        //this.isMovingTree = false;
        this.glyphOnMouseDown = this.glyphOnMouseDown.bind(this);
        this.onConnectionClick = this.onConnectionClick.bind(this);
        this.onConnectionClick = this.onConnectionClick.bind(this);
        this.removeConnection = this.removeConnection.bind(this);
        this.removeGlyph = this.removeGlyph.bind(this);
    }


    showMenu(event){}



    glyphOnMouseDown(glyph, event) {


        let shiftX = event.clientX - glyph.l;
        let shiftY = event.clientY - glyph.t;


        if (!this.isMovingTree) {

            // Showing menu on
            // immediate mouse up
            let $this = this;
            let mouseDownTime = event.timeStamp;
            $this.setState({
                onMouseUp: function(eventUp) {

                    if (eventUp.timeStamp - 150 < mouseDownTime) {

                        let glyphMenu = $this.refs.glyphMenu;

                        glyphMenu.params.top  = glyph.t;
                        glyphMenu.params.left = glyph.l;
                        glyphMenu.params.display = 'block';
                        glyphMenu.params.targetGlyph = glyph;

                        $this.setState({
                            mouseClick: (e) => {
                                let targetClassList = e.target.classList;

                                if ((!targetClassList.contains('GlyphSpan')) && (!targetClassList.contains('glyph-menu__link--edit'))) {
                                    glyphMenu.params.display = 'none';
                                    glyphMenu.params.targetGlyph = null;
                                    $this.setState({mouseClick: null});
                                    if (glyphMenu.refs.mainGlyphMenu.classList.contains('glyph-menu__list--hidden')) {
                                        glyphMenu.toggleClasses();
                                    }
                                }
                            }
                        });
                    }

                    $this.setState({onMouseMove: null});
                    glyph.onMouseUp = null;
                }
            });


            // Move single glyph
            $this.setState({
                onMouseMove: function(e) {
                    glyph.t = e.clientY - shiftY;
                    glyph.l = e.clientX - shiftX;
                    $this.props.moveGlyph(glyph);
                }
            });


        } else {


            let startCoords = {
                left: glyph.l,
                top:  glyph.t
            };

            let allMovingGlyphsLink = findChildrenLinks(glyph, this.props.connections);
            let allMovingGlyphs = JSON.parse(JSON.stringify(getGlyphsArray(allMovingGlyphsLink, this.props.glyphs)));

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
    }




    /*moveTree*/tmp(targetGlyph) {


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




    render () {
        return (
            <div className={ classNames("Context", this.props.addConnection.mode) }
                 onMouseMove={this.state.onMouseMove}
                 onClick={this.state.mouseClick}
                 onMouseDown={this.state.onMouseDown}
                 onMouseUp={this.state.onMouseUp}>                 


                <GlyphMenu
                    ref="glyphMenu"
                    removeGlyph={this.removeGlyph} />


                <ConnectionMenu
                    ref="connectionMenu"
                    removeConnection={this.removeConnection} />


                {Object.keys(this.props.glyphs).map((glyphKey, index)=>
                    <Glyph
                        key={index}
                        glyph={this.props.glyphs[glyphKey]}
                        glyphOnMouseDown={this.glyphOnMouseDown} />
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