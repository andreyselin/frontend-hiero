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
        this.toggleClasses = this.toggleClasses.bind(this);
    }

    moveTree(e) {
        e.preventDefault();
        this.props.moveTree(this.params.targetGlyph);
    }

    editGlyph(e) {
        e.preventDefault();
        this.toggleClasses();
    }

    removeGlyph(e) {
        e.preventDefault();
        this.props.removeGlyph(this.params.targetGlyph);
    }

    changeGlyphDirection(direction, e) {
        e.preventDefault();
        let targetGlyphClassList = this.params.targetGlyph.refs.root.classList;
        
        targetGlyphClassList.remove('GlyphHorizontal--column', 'GlyphHorizontal',
                                     'GlyphHorizontal--reverse', 'GlyphHorizontal--column-reverse');
        if (direction === 'top') {
            targetGlyphClassList.add('GlyphHorizontal--column');
        } else if (direction === 'left') {
            targetGlyphClassList.add('GlyphHorizontal');
        } else if (direction === 'right') {
            targetGlyphClassList.add('GlyphHorizontal--reverse');
        } else if (direction === 'bottom') {
            targetGlyphClassList.add('GlyphHorizontal--column-reverse');
        }
        this.toggleClasses();
    }

    toggleClasses() {
        let mainGlyphMenu = this.refs.mainGlyphMenu;
        let directionGlyphMenu = this.refs.directionGlyphMenu;

        mainGlyphMenu.classList.toggle('glyph-menu__list--hidden');
        directionGlyphMenu.classList.toggle('glyph-menu__list--hidden');
    }

    render () {
        return (
            <div className = "glyph-menu"
                style = {{
                    top: this.params.top,
                    left: this.params.left,
                    display: this.params.display
                }}>
                <ul ref="mainGlyphMenu" className = "glyph-menu__list">
                    <li className = "glyph-menu__item">
                        <a className = "glyph-menu__link"
                           onClick = { this.moveTree }
                           href="Move">
                            Move tree
                        </a>
                    </li>
                    <li className = "glyph-menu__item">
                        <a className = "glyph-menu__link glyph-menu__link--edit"
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
                <ul ref="directionGlyphMenu" className = "glyph-menu__list glyph-menu__list--hidden">
                    <li className = "glyph-menu__item">
                        <a className = "glyph-menu__link"
                           onClick = { this.changeGlyphDirection.bind(this, 'top') }
                           href="Move">
                            image top
                        </a>
                    </li>
                    <li className = "glyph-menu__item">
                        <a className = "glyph-menu__link"
                           onClick = { this.changeGlyphDirection.bind(this, 'left') }
                           href="Edit">
                            imege left
                        </a>
                    </li>
                    <li className = "glyph-menu__item">
                        <a className = "glyph-menu__link"
                           onClick = { this.changeGlyphDirection.bind(this, 'right') }
                           href="Delete">
                            image right
                        </a>
                    </li>
                    <li className = "glyph-menu__item">
                        <a className = "glyph-menu__link"
                           onClick = { this.changeGlyphDirection.bind(this, 'bottom') }
                           href="Delete">
                            image bottom
                        </a>
                    </li>
                </ul>
            </div>
        )
    }
}

export default GlyphMenu;