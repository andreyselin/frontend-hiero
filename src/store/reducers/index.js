import {combineReducers} from 'redux';
import glyphs from './glyphsReducer';
import connections from './connectionsReducer';
import addConnection from './addConnectionReducer';


const allReducers = combineReducers({
    context: combineReducers({
        glyphs: glyphs,
        connections: connections
    }),
    app: combineReducers({
        addConnection: addConnection
    })
});

export default allReducers;
