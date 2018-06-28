import React, {Component} from 'react';
import './GlyphMenu.css';

class GlyphMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            top: '5%',
            left: '5%',
            display: 'none',
            targetGlyph: null
        }

        this.moveTree = this.moveTree.bind(this);
        this.editGlyph = this.editGlyph.bind(this);
        this.deleteGlyph = this.deleteGlyph.bind(this);
    }

    moveTree(e) {
        e.preventDefault();
        this.props.moveTree(this.state.targetGlyph);
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

export default GlyphMenu;