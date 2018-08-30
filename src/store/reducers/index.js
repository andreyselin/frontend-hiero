import {combineReducers} from 'redux';
import navigatorsReducer from './navigatorsReducer';
import contextInfoReducer from './contextInfoReducer';
import glyphsReducer from './glyphsReducer';
import connectionsReducer from './connectionsReducer';
import addConnectionReducer    from './addConnectionReducer';
import activeGlyph from './activeGlyphReducer';
import menuBlocksReducer from './menuBlocksReducer';


const allReducers = combineReducers({

    navigators: navigatorsReducer,
    activeContext: combineReducers({
        info:        contextInfoReducer,
        glyphs:      glyphsReducer,
        connections: connectionsReducer       
    }),
    menuBlocks: menuBlocksReducer,
    app: combineReducers({
        addConnection: addConnectionReducer,
        activeGlyph: activeGlyph,
    })
});

export default allReducers;
