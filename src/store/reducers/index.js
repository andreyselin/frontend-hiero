import {combineReducers} from 'redux';
import navigatorsReducer from './navigatorsReducer';
import glyphsReducer from './glyphsReducer';
import connectionsReducer from './connectionsReducer';
import addConnectionReducer    from './addConnectionReducer';
import activeGlyph from './activeGlyphReducer';


const allReducers = combineReducers({

    navigators: navigatorsReducer,
    activeContext: combineReducers({
        glyphs:      glyphsReducer,
        connections: connectionsReducer,
        activeGlyph: activeGlyph
    }),
    app: combineReducers({
        addConnection: addConnectionReducer
    })
});

export default allReducers;
