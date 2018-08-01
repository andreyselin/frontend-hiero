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
        connections: connectionsReducer,

        // Po logike ne doljem byt zdes, tak kak eto nepostoyannaia informacia, a operativnaia
        // Zdes - tolko postoiannaia, nelzia peremeshivat
        activeGlyph: activeGlyph
    }),
    menuBlocks: menuBlocksReducer,
    app: combineReducers({
        addConnection: addConnectionReducer
    })
});

export default allReducers;
