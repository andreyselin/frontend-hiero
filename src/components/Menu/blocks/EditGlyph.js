import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {editGlyph} from '../../../store/actions/glyphActions';

class MenuBlockEditGlyph extends Component {
    constructor(props) {
        super(props);
        this.editGlyph = this.editGlyph.bind(this);
    }

    handleChange (target) {
        return event=>this.setState({[target]:event.target.value});
    }

    editGlyph () {
      let glyphToSave = {
        w: 100,
        header: this.state.header,
        label: this.state.label,
        img: this.state.imgSrc ? {src: this.state.imgSrc} : null, // Handle img size later
      };
      this.props.editGlyph(this.state.link, glyphToSave);
    }

    componentWillMount () {
      this.setState(this.props.glyphToEdit);
      console.log("this.state.1", this.state);
    }

    render () {

        return (
            <div className={"Menu_block"}>
                <div className="Menu_block_header">Edit glyph</div>
                <div className="Menu_block_row">
                    Image source:<br />
                    <input
                        type="text"
                        value={this.state.imgSrc}
                        onChange={ this.handleChange('imgSrc') }
                        placeholder="Image source"
                        />
                </div>
                <div className="Menu_block_row">
                    Header:<br />
                    <input
                        type="text"
                        value={this.state.header}
                        onChange={ this.handleChange('header') }
                        placeholder="Header for new glyph"
                        />
                </div>
                <div className="Menu_block_row">
                    Label:<br />
                    <input
                        type="text"
                        value={this.state.label}
                        onChange={ this.handleChange('label') }
                        placeholder="Label for new glyph"
                        />
                </div>
                <div className="Menu_block_row">
                    <button onClick={this.editGlyph}>Save glyph</button>
                </div>
            </div>
        );

    }
}

function mapStateToProps(state) {
    return {
        glyphToEdit: state.menuBlocks.editGlyph
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            editGlyph: editGlyph
        },
        dispatch
    );
}

export default connect(mapStateToProps, matchDispatchToProps)(MenuBlockEditGlyph);
