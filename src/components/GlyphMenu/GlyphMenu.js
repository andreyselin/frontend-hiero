import React, {Component} from 'react';
import './GlyphMenu.css';

class GlyphMenu extends Component {
    constructor(props) {
        super(props);
        this.params = {
            top: '5%',
            left: '5%',
            display: 'none',
            targetGlyph: null
        }

        this.moveTree = this.moveTree.bind(this);
        this.editGlyph = this.editGlyph.bind(this);
        this.removeGlyph = this.removeGlyph.bind(this);
    }

    moveTree(e) {
        e.preventDefault();
        this.props.moveTree(this.params.targetGlyph);
    }

    editGlyph(e) {
        e.preventDefault();
        console.log('edit');
    }

    removeGlyph(e) {
        e.preventDefault();
        console.log('delete', this.props);
        this.props.removeGlyph(this.params.targetGlyph);
    }

    render () {
        return (
            <div className = "glyph-menu"
                style = {{
                    top: this.params.top,
                    left: this.params.left,
                    display: this.params.display
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
                           onClick = { this.removeGlyph }
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