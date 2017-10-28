import React from 'react';
import './Glyph.css';

class Glyph extends React.Component {
    constructor (props) {
        super(props);
    }
    render () {
        return (
            <div className="Glyph"
                 style={{
                    width:      this.props.info.w,
                    height:     this.props.info.h,
                    top:        this.props.info.t,
                    left:       this.props.info.l,
                    marginTop:  this.props.info.mt,
                    marginLeft: this.props.info.ml
                 }}
                >
            </div>
        )
    }
}

export default Glyph;