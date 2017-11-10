import React, {Component} from 'react';
import './Glyph.css';

class Glyph extends Component {
    constructor (props) {
        super(props);
        this.state = this.props.glyph;
        this.onMouseDown = this.onMouseDown.bind(this);
    }

    onMouseDown(event) {
        this.props.glyphMover(this, event);
    }

    render () {
        return (
            <div className="Glyph"
                 style={{
                    width:      this.state.w,
                    height:     this.state.h,
                    top:        this.state.t,
                    left:       this.state.l
                 }}
                 onMouseDown = {this.onMouseDown}
                 onMouseUp = {this.state.onMouseUp}
                >
                <div className='GlyphImg'>
                    <img src={this.props.glyph.img} alt={this.props.glyph.label}/>
                </div>
                <div className='GlyphContent'>
                    <span>{this.props.glyph.label}</span>
                </div>
            </div>
        )
    }
}


export default Glyph;