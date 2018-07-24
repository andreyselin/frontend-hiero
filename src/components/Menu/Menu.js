import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Store from '../../store/store.js';
import {addGlyph} from '../../store/actions/glyphActions';
import {addConnectionTurnOn} from '../../store/actions/connectionActions';
import './Menu.css';


function mapStateToProps(state) {
    return {
        glyphs:      {}, //state.navigators[0].context.glyphs,
        connections: []  //state.navigators[0].context.connections
    }
}


function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            addGlyph: addGlyph,
            addConnectionTurnOn: addConnectionTurnOn,
        },
        dispatch
    );
}


class Menu extends Component {
    constructor(props) {
        super(props);
        this.addGlyph      = this.addGlyph.bind(this);
        this.addConnection = this.addConnection.bind(this);
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

    addConnection() {
        this.props.addConnectionTurnOn();
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
                <span> - - - </span>
                <button onClick={this.addConnection}>Add connection</button>
                <span> - - - </span>
                <button onClick={this.showStore}>Show store</button>
            </div>
        );
    }
}

//export default Menu;
export default connect(mapStateToProps, matchDispatchToProps)(Menu);