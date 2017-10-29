import React from 'react';
import './Glyph.css';

class Glyph extends React.Component {
    constructor (props) {
        super(props);
        this.state = this.props.info;
    }
    render () {
        return (
            <div className="Glyph"
                 style={{
                    width:      this.state.w,
                    height:     this.state.h,
                    top:        this.state.t,
                    left:       this.state.l,
                    marginTop:  this.state.mt,
                    marginLeft: this.state.ml
                 }}
                >
            </div>
        )
    }
}

export default Glyph;