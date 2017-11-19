import {combineReducers} from 'redux';
import glyphs from './glyphsReducer';
import connections from './connectionsReducer';


const allReducers = combineReducers({
    context: combineReducers({
        glyphs: glyphs,
        connections: connections
    }),
});

export default allReducers;
