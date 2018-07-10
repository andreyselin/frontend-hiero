import React, {Component} from 'react';
import Glyph from '../Glyph';
import Connection from '../Connection';
import "./Context.css";
import {connect} from 'react-redux';
import classNames from 'classnames';
import {moveGlyph, moveGlyphTree} from '../../store/actions/glyphActions';
import {bindActionCreators} from 'redux';
import GlyphMenu from '../GlyphMenu';
import ConnectionMenu from '../ConnectionMenu';
import {getGlyphsArray, findChildrenLinks} from './contextFuncs';
import { removeConnection } from '../../store/actions/connectionActions';

function mapStateToProps(state) {
    return {
        glyphs: state.context.glyphs,
        connections: state.context.connections,
        addConnection: state.app.addConnection
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            moveGlyph: moveGlyph,
            moveGlyphTree: moveGlyphTree,
            removeConnection: removeConnection
        },
        dispatch
    );
}

class Context extends Component {
    constructor (props) {
        super(props);
        this.state = {};
        this.isMoovingTree = false;
        this.moveGlyph = this.moveGlyph.bind(this);
        this.moveTree = this.moveTree.bind(this);
        this.onConnectionClick = this.onConnectionClick.bind(this);
        this.onConnectionClick = this.onConnectionClick.bind(this);
        this.removeConnection = this.removeConnection.bind(this);
    }

    moveGlyph(glyph, event) {
        if (!this.isMoovingTree) {
            let $this = this;
            let shiftX = event.clientX - glyph.props.glyph.l;
            let shiftY = event.clientY - glyph.props.glyph.t;
    
            $this.setState({
                onMouseUp: function() {
                    let checkMenuClickFinish = Date.now();
    
                    if (checkMenuClickFinish - glyph.checkMenuClickStart < 150) {
                        let glyphMenu = $this.refs.glyphMenu;
                        
                        glyphMenu.params.top = glyph.props.glyph.t;
                        glyphMenu.params.left = glyph.props.glyph.l;
                        glyphMenu.params.display = 'block';
                        glyphMenu.params.targetGlyph = glyph;
                       
                        $this.setState({
                            mouseClick: (e) => {
                                if (!e.target.classList.contains('GlyphSpan')) {
                                    glyphMenu.params.display = 'none';
                                    glyphMenu.params.targetGlyph = null;
                                    $this.setState({mouseClick: null});
                                }
                            }
                        });
                    }
    
                    $this.setState({onMouseMove: null});
                    glyph.onMouseUp = null;
                }
            });
    
            $this.setState({
                onMouseMove: function(e) {
                    let coordsLeft = e.clientX - shiftX;
                    let coordsTop = e.clientY - shiftY;
    
                    glyph.props.glyph.t = coordsTop;
                    glyph.props.glyph.l = coordsLeft;
                    $this.props.moveGlyph(glyph);
                }
            });
        }        
    }

    moveTree(targetGlyph) {
        let startCoords = {
            left: targetGlyph.props.glyph.l,
            top: targetGlyph.props.glyph.t 
        };
        let allMovingGlypsLink = findChildrenLinks(targetGlyph, this);
        let allMovingGlyps = getGlyphsArray(allMovingGlypsLink, this.props.glyphs);

        this.isMoovingTree = true;

        this.setState({onMouseMove: (e) => {
           let shiftX = startCoords.left - e.clientX;
           let shiftY = startCoords.top - e.clientY;
           
           allMovingGlyps.forEach((glyph) => {
               let fantomGlyph = Object.assign({}, glyph);

               fantomGlyph.t = glyph.t - shiftY;
               fantomGlyph.l = glyph.l - shiftX;
               this.props.moveGlyphTree(fantomGlyph);
           });
        }});

        this.setState({
            onMouseUp: (e) => {
                this.setState({onMouseDown: null});
                this.setState({onMouseMove: null});
                this.isMoovingTree = false;
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

    render () {
        return (
            <div className={ classNames("Context", this.props.addConnection.mode) }
                 onMouseMove={this.state.onMouseMove}
                 onClick={this.state.mouseClick}
                 onMouseDown={this.state.onMouseDown}
                 onMouseUp={this.state.onMouseUp}>                 
                <GlyphMenu ref="glyphMenu" moveTree={this.moveTree} />
                <ConnectionMenu ref="connectionMenu"
                                removeConnection={this.removeConnection} />
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
                        to={this.props.glyphs[connection.toLink]}
                        onClick={this.onConnectionClick}
                        connection={connection} />
                )}
            </div>
        )
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(Context);