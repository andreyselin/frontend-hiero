import React, {Component} from 'react';
import './GlyphMenu.css';

class GlyphMenu extends Component {
    constructor(props) {
        super(props);
        this.editGlyph = this.editGlyph.bind(this);
        this.removeGlyph = this.removeGlyph.bind(this);
        this.toggleClasses = this.toggleClasses.bind(this);
    }

    editGlyph(e) {
        e.preventDefault();
        this.toggleClasses();
    }

    removeGlyph(e) {
        e.preventDefault();
        this.props.removeGlyph(this.props.activeGlyph.glyph);
    }

    changeGlyphDirection(direction, e) {
        e.preventDefault();
        let targetGlyphClassList = this.props.activeGlyph.glyph.refs.root.classList;
        
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
        // console.log('GlyphMenu ', this.props.activeGlyph.glyph);
        if (this.props.activeGlyph.glyph) {
            return (
                <div className = "glyph-menu">
                    <div className="Menu_block_header">
                        {this.props.activeGlyph.glyph.props.glyph.header}
                    </div>
                    <ul ref="mainGlyphMenu" className = "glyph-menu__list">
                        <li className = "glyph-menu__item">
                            <a className = "glyph-menu__link glyph-menu__link--edit"
                               onClick = { this.editGlyph }
                               href="Edit">
                                Edit glyph
                            </a>
                        </li>
                        <li className = "glyph-menu__item">
                            <a className = "glyph-menu__link glyph-menu__link--remove"
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
        } else {
            return (
                <div className="Menu_block_header">
                    No belka
                </div>
            )
        }
    }
}

export default GlyphMenu;