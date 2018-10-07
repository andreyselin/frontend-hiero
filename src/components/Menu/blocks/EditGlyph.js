import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {editGlyph, removeGlyph} from '../../../store/actions/glyphActions';


const formatGlyphToOpen = inputGlyph => ({
  link:       inputGlyph.link || "",
  header:     inputGlyph.header || "",
  label:      inputGlyph.label  || "",
  imgSrc:     inputGlyph.img ? inputGlyph.img.src : "",
  w:          inputGlyph.w,
  h:          inputGlyph.h,
  classNames: inputGlyph.classNames || []
});

const formatGlyphToSave = glyphToSave => ({
  header: glyphToSave.header || null,
  label:  glyphToSave.label  || null,
  w:      parseInt(glyphToSave.w)  || 100,
  h:      parseInt(glyphToSave.h)  || 100,
  img:    glyphToSave.imgSrc ? {src: glyphToSave.imgSrc} : null,
  classNames: glyphToSave.classNames
});


class MenuBlockEditGlyph extends Component {
    constructor(props) {
        super(props);
        this.editGlyph = this.editGlyph.bind(this);
        this.removeGlyph = this.removeGlyph.bind(this);
        this.state = {};
        this.glyphAlignClasses = ['__horizontal', '__horizontal__reversed', '__vertical', '__vertical__reversed'];
    }

    handleChange (target) {
        return event => {
            console.log("1", target, event.target.value);
            this.setState({[target]:event.target.value});
        }
    }

    editGlyph () {
      this.props.editGlyph(this.state.link, formatGlyphToSave(this.state));
    }

    removeGlyph () {
      this.props.removeGlyph(this.state.link);
    }

    componentWillMount () {
        this.setState(formatGlyphToOpen(this.props.glyphToEdit));
    }

    componentWillReceiveProps (nextProps) {
        this.setState(formatGlyphToOpen(nextProps.glyphToEdit));
    }

    setAlignmentClass (classIndex) {
        this.setState({classNames: [this.glyphAlignClasses[classIndex]]});
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
                    Width:<br />
                    <input
                        type="number"
                        value={this.state.w}
                        onChange={ this.handleChange('w') }
                        placeholder="Content width"
                        />
                </div>

                <div className="Menu_block_row">
                    Height:<br />
                    <input
                        type="number"
                        value={this.state.h}
                        onChange={ this.handleChange('h') }
                        placeholder="Content height"
                        />
                </div>

                <div className="Menu_block_row">
                    Image position:<br />

                    <button onClick={() => this.setAlignmentClass (0)}>&larr;</button>
                    <button onClick={() => this.setAlignmentClass (1)}>&rarr;</button>
                    <button onClick={() => this.setAlignmentClass (2)}>&uarr;</button>
                    <button onClick={() => this.setAlignmentClass (3)}>&darr;</button>
                </div>

                <div className="Menu_block_row">
                    <button onClick={this.editGlyph}>Save glyph</button>
                    <button onClick={this.removeGlyph}>Remove glyph</button>
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
            editGlyph: editGlyph,
            removeGlyph: removeGlyph
        },
        dispatch
    );
}

export default connect(mapStateToProps, matchDispatchToProps)(MenuBlockEditGlyph);
