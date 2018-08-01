import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addGlyph} from '../../../store/actions/glyphActions';

class MenuBlockAddGlyph extends Component {
    constructor(props) {
        super(props);
        this.addGlyph      = this.addGlyph.bind(this);
        this.state = {
            collapsed: true,
            newGlyphImgSrc: "",
            newGlyphHeader: "Заголовок",
            newGlyphLabel:  "Подзаголовок"
        };
    }

    handleChange (target) {
        return event=>this.setState({[target]:event.target.value});
    }

    addGlyph() {
        this.props.addGlyph({
            imgSrc: this.state.newGlyphImgSrc,
            header: this.state.newGlyphHeader,
            label:  this.state.newGlyphLabel
        });
    }

    // roll(){
    //     this.state.collapsed = this.state.collapsed ? false : true;
    // }

    render () {

        return (
            <div className={"Menu_block"+(this.state.collapsed ? ' collapsed' : '')}>
                <div className="Menu_block_header">Add new glyph</div>
                <div className="Menu_block_row">
                    Image source:<br />
                    <input
                        type="text"
                        value={this.state.newGlyphImgSrc}
                        onChange={ this.handleChange('newGlyphImgSrc') }
                        placeholder="Image source"
                        />
                </div>
                <div className="Menu_block_row">
                    Glyph header:<br />
                    <input
                        type="text"
                        value={this.state.newGlyphHeader}
                        onChange={ this.handleChange('newGlyphHeader') }
                        placeholder="Header for new glyph"
                        />
                </div>
                <div className="Menu_block_row">
                    Glyph label:<br />
                    <input
                        type="text"
                        value={this.state.newGlyphLabel}
                        onChange={ this.handleChange('newGlyphLabel') }
                        placeholder="Label for new glyph"
                        />
                </div>
                <div className="Menu_block_row">
                    <button onClick={this.addGlyph}>Add glyph</button>
                </div>
                <div className="Menu_block_row">
                    <button onClick={this.addConnection}>Add connection</button>
                </div>
            </div>
        );

    }
}

function mapStateToProps(state) {
    return {}
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            addGlyph: addGlyph
        },
        dispatch
    );
}

export default connect(mapStateToProps, matchDispatchToProps)(MenuBlockAddGlyph);