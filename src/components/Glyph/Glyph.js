import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import './Glyph.css';
import {bindActionCreators} from 'redux';
import {addConnectionChooseFrom, addConnectionChooseTo} from '../../store/actions/connectionActions';
import {setGlyphBounds} from '../../store/actions/glyphActions';
import {showEditGlyphMenuBlock} from '../../store/actions/menuBlocksActions';

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
        this.props.showEditGlyphMenuBlock(this.props.glyph);
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
                    [this.props.glyph.classNames]
                )}

                 style={{
                    width:  this.props.glyph.w,
                    height: this.props.glyph.h,
                    top:    this.props.glyph.t,
                    left:   this.props.glyph.l
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
                        <div className='GlyphLabel'>{this.props.glyph.label}</div>
                    )}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state;
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addConnectionChooseFrom: addConnectionChooseFrom,
    addConnectionChooseTo:   addConnectionChooseTo,
    setGlyphBounds:          setGlyphBounds,
    showEditGlyphMenuBlock:  showEditGlyphMenuBlock
  }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(Glyph);
