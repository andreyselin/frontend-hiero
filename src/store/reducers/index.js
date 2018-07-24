import {combineReducers} from 'redux';
import navigatorsReducer from './navigatorsReducer';
import glyphsReducer from './glyphsReducer';
import connectionsReducer from './connectionsReducer';
import addConnectionReducer    from './addConnectionReducer';


const allReducers = combineReducers({

    navigators: navigatorsReducer,
    activeContext: combineReducers({
        glyphs:      glyphsReducer,
        connections: connectionsReducer
    }),
    app: combineReducers({
        addConnection: addConnectionReducer
    })
});

export default allReducers;
