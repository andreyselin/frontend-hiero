import React from 'react';
import './Glyph.css';
import {connect} from 'react-redux';

class Glyph extends React.Component {
    constructor (props) {
        super(props);
        this.state = this.props.data;
        this.onMouseDown = this.onMouseDown.bind(this);
    }

    onMouseDown(event) {
        return this.props.moveBlock(this, event);
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
                <img src={this.props.info.img} alt={this.props.info.alt} />
                <span>{this.props.info.name}</span>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        info: state.info
    }
}

export default connect(mapStateToProps)(Glyph);