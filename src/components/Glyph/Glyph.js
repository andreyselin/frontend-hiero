import React from 'react';
import './Glyph.css';

class Glyph extends React.Component {
    constructor (props) {
        super(props);
        this.state = this.props.data;
        this.onMouseDown = this.onMouseDown.bind(this);
    }

    onMouseDown(event) {
        this.props.func(this, event);
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
                <img src={this.props.info.img} alt={this.props.info.alt} />
                <span>{this.props.info.title}</span>
            </div>
        )
    }
}


export default Glyph;