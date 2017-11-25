import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Glyph.css';
import {addConnectionChooseFrom, addConnectionChooseTo} from '../../store/actions/connectionActions'

class Glyph extends Component {
    constructor (props) {
        super(props);
        this.state = this.props.glyph;
        this.onMouseDown = this.onMouseDown.bind(this);
        this.chooseConnector = this.chooseConnector.bind(this);
    }

    onMouseDown(event) {
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
                <div onClick={this.chooseConnector('from')} className='ConnectorFrom'>Choose connection source</div>
                <div onClick={this.chooseConnector('to')} className='ConnectorTo'>Choose connection target</div>

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
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Glyph);