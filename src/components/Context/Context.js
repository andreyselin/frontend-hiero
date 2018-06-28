import React, {Component} from 'react';
import Glyph from '../Glyph';
import Connection from '../Connection';
import "./Context.css";
import {connect} from 'react-redux';
import classNames from 'classnames';
import {moveGlyph, moveGlyphTree} from '../../store/actions/glyphActions';
import {bindActionCreators} from 'redux';
import GlyphMenu from '../GlyphMenu';
import {getGlyphsArray, findChildrenLinks} from './contextFuncs';

function mapStateToProps(state) {
    return {
        glyphs: state.context.glyphs,
        state: state,
        connections: state.context.connections,
        addConnection: state.app.addConnection
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            moveGlyph: moveGlyph,
            moveGlyphTree: moveGlyphTree
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
        //this.findChildrenLinks = this.findChildrenLinks.bind(this);
    }

    moveGlyph(glyph, event) {
        if (!this.isMoovingTree) {
            let $this = this;
            let shiftX = event.clientX - glyph.props.glyph.l;
            let shiftY = event.clientY - glyph.props.glyph.t;
    
            $this.setState({
                onMouseUp: function() {
                    //console.log('up');
                    let checkMenuClickFinish = Date.now();
    
                    if (checkMenuClickFinish - glyph.checkMenuClickStart < 150) {
                        let glyphMenu = $this.refs.glyphMenu;
                        //console.log('create menu');
                        
                        glyphMenu.params.top = glyph.props.glyph.t;
                        glyphMenu.params.left = glyph.props.glyph.l;
                        glyphMenu.params.display = 'block';
                        glyphMenu.params.targetGlyph = glyph;
                       
                        $this.setState({
                            mouseClick: (e) => {
                                //console.log('moveGlyph');
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
           
           //console.log(shiftX);
           //console.log(shiftY);
           allMovingGlyps.forEach((glyph) => {
               let fantomGlyph = Object.assign({}, glyph);

               fantomGlyph.t = glyph.t - shiftY;
               fantomGlyph.l = glyph.l - shiftX;
               this.props.moveGlyphTree(fantomGlyph);
           });
        }});

        this.setState({
            onMouseUp: (e) => {
                //console.log('moveTree');
                this.setState({onMouseDown: null});
                this.setState({onMouseMove: null});
                this.isMoovingTree = false;
            }
        });
    }

    render () {
        return (
            <div className={ classNames("Context", this.props.addConnection.mode) }
                 onMouseMove={this.state.onMouseMove}
                 onClick={this.state.mouseClick}
                 onMouseDown={this.state.onMouseDown}
                 onMouseUp={this.state.onMouseUp}>                 
                <GlyphMenu ref="glyphMenu" moveTree={this.moveTree} />
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