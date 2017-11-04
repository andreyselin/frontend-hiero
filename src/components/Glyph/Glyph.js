import React from 'react';
import './Glyph.css';

class Glyph extends React.Component {
    constructor (props) {
        super(props);
        this.state = this.props.info;
        //this.state.onMouseUp = null;
        this.onMouseDown = this.onMouseDown.bind(this);
    }

    onMouseDown() {
        this.props.moveBlock(this);
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
                 onMouseDown = {this.onMouseDown}
                 onMouseUp = {this.state.onMouseUp}
                >
                <img src="http://www2.b2bcg.ru/upload/iblock/a73/a73753d3ab8de6e5f9a3291798cc08e8.jpg" alt="BELKA HERE" />
                <span>Alex Under</span>
            </div>
        )
    }
}

export default Glyph;