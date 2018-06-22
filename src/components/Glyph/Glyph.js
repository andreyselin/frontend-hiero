import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import './Glyph.css';
import {addConnectionChooseFrom, addConnectionChooseTo} from '../../store/actions/connectionActions';
import {setGlyphBounds} from '../../store/actions/glyphActions';

class Glyph extends Component {
    constructor (props) {
        super(props);
        this.state = this.props.glyph;
        this.onMouseDown = this.onMouseDown.bind(this);
        this.chooseConnector = this.chooseConnector.bind(this);
        this.checkMenuClickStart = 0;
    }

    componentDidMount(){
        
        // Will be used after editing only
        this.props.setGlyphBounds({
            link: this.state.link,
            w: this.refs.root.offsetWidth,
            h: this.refs.root.offsetHeight
        });
    }

    onMouseDown(event) {
        this.checkMenuClickStart = Date.now();
        console.log(this.checkMenuClickStart);
        this.props.moveGlyph(this, event);
    }

    chooseConnector(connectorType) {
        let $this = this;
        return function (){
            if (connectorType === "from") {
                $this.props.addConnectionChooseFrom($this.state.link);
            } else if (connectorType === "to") {
                $this.props.addConnectionChooseTo($this.state.link);
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
                    this.props.glyph.classList
                )}

                 style={{
                    // width:      this.state.w,
                    // height:     this.state.h,
                    top:        this.state.t,
                    left:       this.state.l
                 }}
                 onMouseDown = {this.onMouseDown}
                 onMouseUp = {this.state.onMouseUp}
                >
                <div onClick={this.chooseConnector('from')} className='GlyphConnector GlyphConnectorFrom'>Choose<br />connection<br />source</div>
                <div onClick={this.chooseConnector('to')}   className='GlyphConnector GlyphConnectorTo'>Choose<br />connection<br />target</div>

                {this.props.glyph.img && (
                    <div className='GlyphImg'>
                        <img src={this.props.glyph.img.src} alt="Glyph" />
                    </div>
                )}
                <div className='GlyphContent'>
                    <span>{this.props.glyph.label}</span>
                </div>
            </div>
        )
    }
}


// export default Glyph;


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