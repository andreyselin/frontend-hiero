import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {editGlyph} from '../../../store/actions/glyphActions';


const formatGlyphToOpen = inputGlyph => ({
  link:   inputGlyph.link || "",
  header: inputGlyph.header || "",
  label:  inputGlyph.label  || "",
  imgSrc: inputGlyph.img ? inputGlyph.img.src : "",
});

const formatGlyphToSave = outputGlyph => ({
  header: outputGlyph.header || null,
  label:  outputGlyph.label  || null,
  img:    outputGlyph.imgSrc ? {src: outputGlyph.imgSrc} : null,
});

class MenuBlockEditGlyph extends Component {
    constructor(props) {
        super(props);
        this.editGlyph = this.editGlyph.bind(this);
    }

    handleChange (target) {
        return event=>this.setState({[target]:event.target.value});
    }

    editGlyph () {
      this.props.editGlyph(this.state.link, formatGlyphToSave(this.state));
    }

    componentWillMount () {
      this.setState(this.props.glyphToEdit);
    }

    componentWillReceiveProps (nextProps) {
      this.setState(formatGlyphToOpen(nextProps.glyphToEdit));
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
