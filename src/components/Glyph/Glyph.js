import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import './Glyph.css';
import {addConnectionChooseFrom, addConnectionChooseTo} from '../../store/actions/connectionActions';
import {setGlyphBounds} from '../../store/actions/glyphActions';

class Glyph extends Component {
    constructor (props) {
        super(props);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.chooseConnector = this.chooseConnector.bind(this);
        this.onDoubleClick = this.onDoubleClick.bind(this);
    }

    componentDidMount(){
        
        // Will be used after editing only
        this.props.setGlyphBounds({
            link: this.props.glyph.link,
            w: this.refs.root.offsetWidth,
            h: this.refs.root.offsetHeight
        });
    }

    onDoubleClick() {
        this.props.setActiveGlyphInContext(this);
    }

    onMouseDown (event) {
        this.props.glyphOnMouseDown(this.props.glyph, event);
    }

    chooseConnector(connectorType) {
        let $this = this;

        return function (){
            if (connectorType === "from") {
                $this.props.addConnectionChooseFrom($this.props.glyph.link);
            } else if (connectorType === "to") {
                $this.props.addConnectionChooseTo($this.props.glyph.link);
            }
        }
    }

    render () {
        return (
            <div
                ref='root'
                className={classNames(
                    "Glyph",
                    "noselect",
                    this.props.glyph.style
                )}

                 style={{
                    // width:      this.state.w,
                    // height:     this.state.h,
                    top:        this.props.glyph.t,
                    left:       this.props.glyph.l
                 }}
                 onMouseDown = {this.onMouseDown}
                 onMouseUp = {this.onMouseUp}
                 onDoubleClick = {this.onDoubleClick}
                >
                <div onClick={this.chooseConnector('from')} className='GlyphConnector GlyphConnectorFrom'>Choose<br />connection<br />source</div>
                <div onClick={this.chooseConnector('to')}   className='GlyphConnector GlyphConnectorTo'>Choose<br />connection<br />target</div>

                {this.props.glyph.img && (
                    <div className='GlyphImg'>
                        <img alt={this.props.glyph.header} className='Glyph__img' src={this.props.glyph.img.src} />
                    </div>
                )}
                <div className='GlyphContent'>
                    <div className='GlyphHeader'>{this.props.glyph.header}</div>
                    {this.props.glyph.label && (
                        <span className='GlyphSpan'>{this.props.glyph.label}</span>
                    )}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => {
    return {
        addConnectionChooseFrom: (link) => {
            dispatch(addConnectionChooseFrom(link))
        },
        addConnectionChooseTo: (link) => {
            dispatch(addConnectionChooseTo(link))
        },
        setGlyphBounds: (glyph) => {
            dispatch(setGlyphBounds(glyph))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Glyph);