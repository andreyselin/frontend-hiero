import {combineReducers} from 'redux';
import createGlyphsAndConnections from './glyphs';
import info from './info';


const allReducers = combineReducers({
    glyphs: createGlyphsAndConnections,
    info: info
});

export default allReducers;
