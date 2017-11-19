import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Store from '../../store/store.js';
import {addGlyph} from '../../actions/addGlyph';
import './Menu.css';


function mapStateToProps(state) {
    return {
        glyphs: state.context.glyphs,
        connections: state.context.connections
    }
}


function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            addGlyph: addGlyph
        },
        dispatch
    );
}


class Menu extends Component {
    constructor(props) {
        super(props);
        this.addGlyph  = this.addGlyph.bind(this);
        this.state = {
            newGlyphLabel: "привет"
        };
    }

    handleChange (event) {
        this.setState({newGlyphLabel:event.target.value});
    }

    addGlyph() {
        this.props.addGlyph({label:this.state.newGlyphLabel});
    }

    showStore() {
        var a = Store.getState();
        console.log("a", a);
    }

    render() {
        return (
            <div className="Menu">
                {/*
                <button onClick={this.showStore}>Show store</button>
                <button onClick={this.showStore}>Add connection</button>
                */}
                <input
                    type="text"
                    value={this.state.newGlyphLabel}
                    onChange={ this.handleChange.bind(this) }
                    placeholder="Label for new glyph"
                    />
                <button onClick={this.addGlyph}>Add glyph</button>
            </div>
        );
    }
}

//export default Menu;
export default connect(mapStateToProps, matchDispatchToProps)(Menu);