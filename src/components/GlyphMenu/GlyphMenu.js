import React, {Component} from 'react';
import './GlyphMenu.css';

class GlyphMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            top: '5%',
            left: '5%',
            display: 'none'
        }
    }

    moveTree(e) {
        e.preventDefault();
        console.log('move');
    }

    editGlyph(e) {
        e.preventDefault();
        console.log('edit');
    }

    deleteGlyph(e) {
        e.preventDefault();
        console.log('delete');
    }

    render () {
        return (
            <div className = "glyph-menu"
                style = {{
                    top: this.state.top,
                    left: this.state.left,
                    display: this.state.display
                }}>
                <ul className = "glyph-menu__list">
                    <li className = "glyph-menu__item">
                        <a className = "glyph-menu__link"
                           onClick = { this.moveTree }
                           href="Move">
                            Move tree
                        </a>
                    </li>
                    <li className = "glyph-menu__item">
                        <a className = "glyph-menu__link"
                           onClick = { this.editGlyph }
                           href="Edit">
                            Edit glyph
                        </a>
                    </li>
                    <li className = "glyph-menu__item">
                        <a className = "glyph-menu__link"
                           onClick = { this.deleteGlyph }
                           href="Delete">
                            Delete glyph
                        </a>
                    </li>
                </ul>
            </div>
        )
    }
}

/* const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => {
    return {
       
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(GlyphMenu); */

export default GlyphMenu;