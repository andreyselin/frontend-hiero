import React, {Component} from 'react';
import Glyph from '../Glyph';
import Connection from '../Connection';
import "./Context.css";
import {connect} from 'react-redux';
import classNames from 'classnames';
import {moveGlyph, moveGlyphTree} from '../../store/actions/glyphActions';
import {bindActionCreators} from 'redux';
import GlyphMenu from '../GlyphMenu';
import {getGlyphsArray} from './contextFuncs';

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
        this.moveGlyph = this.moveGlyph.bind(this);
        this.moveTree = this.moveTree.bind(this);
        this.findChildrenLinks = this.findChildrenLinks.bind(this);
    }

    moveGlyph(glyph, event) {
        let $this = this;
        let shiftX = event.clientX - glyph.state.l;
        let shiftY = event.clientY - glyph.state.t;

        console.log(glyph);

        glyph.setState({
            onMouseUp: function() {
                let checkMenuClickFinish = Date.now();

                if (checkMenuClickFinish - glyph.checkMenuClickStart < 150) {
                    let glyphMenu = $this.refs.glyphMenu;
                    
                    glyphMenu.state.top = glyph.state.t;
                    glyphMenu.state.left = glyph.state.l;
                    glyphMenu.state.display = 'block';
                    glyphMenu.state.targetGlyph = glyph;
                   
                    $this.setState({
                        mouseClick: (e) => {
                            console.log('moveGlyph');
                            if (!e.target.classList.contains('GlyphSpan')) {
                                glyphMenu.state.display = 'none';
                                glyphMenu.state.targetGlyph = null;
                                $this.setState({mouseClick: null});
                            }                            
                            
                            //$this.setState({onMouseMove: null});
                        }
                    });
                }

                $this.setState({onMouseMove: null});
                glyph.setState({onMouseUp: null});
            }
        });

        $this.setState({
            onMouseMove: function(e) {
                let coordsLeft = e.clientX - shiftX;
                let coordsTop = e.clientY - shiftY;

                glyph.setState({t: coordsTop, l: coordsLeft});
                $this.props.moveGlyph(glyph);
            }
        });
    }

    moveTree(targetGlyph) {
        let startCoords = {
            left: targetGlyph.state.l,
            top: targetGlyph.state.t 
        };
        let allMovingGlypsLink = this.findChildrenLinks(targetGlyph);
        let allMovingGlyps = getGlyphsArray(allMovingGlypsLink, this.props.glyphs);

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
            mouseClick: (e) => {
                console.log('moveTree');
                this.setState({mouseClick: null});
                this.setState({onMouseMove: null});
            }
        });
    }

    findChildrenLinks(targetGlyph) {
        let movedGlyphLink = targetGlyph.state.link;
        let allConnections = this.props.connections;
        let allMovingChildren = [];

        searchForChildren(movedGlyphLink, allConnections);

        return allMovingChildren;

        function searchForChildren(movedGlyphLink, connectionsArray) {

            let stepChildren = connectionsArray.filter((connection) => {
                return (connection.fromLink === movedGlyphLink);
            });
            
            allMovingChildren.push(movedGlyphLink);

            if (stepChildren.length > 0) {                
                stepChildren.forEach((child) => {
                    searchForChildren(child.toLink, connectionsArray);
                });
            }
        }
    }       

    render () {
        return (
            <div className={ classNames("Context", this.props.addConnection.mode) }
                 onMouseMove={this.state.onMouseMove}
                 onClick={this.state.mouseClick}>
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