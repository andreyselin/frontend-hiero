import store from '../store';
import {updateContextInfo, clearContextInfo} from './contextInfoActions';
import {updateAllConnections, clearAllConnections} from './connectionActions';
import {updateAllGlyphs, clearAllGlyphs} from './glyphActions';


    // These are not actions,
    // just centralised functions
    // to call actions


// Action wrapper co be called to create new context
export const createContextActionWrapper = () => {
    store.dispatch (clearAllGlyphs());
    store.dispatch (clearAllConnections());
    store.dispatch (clearContextInfo());
};


// Open context wrapper has to be placed here
export const openContextActionWrapper = context => {

    // Clearing connections to avoid redrawing old connections with new glyphs and linking errors
    store.dispatch (clearAllConnections());

    // Handling navigation stuff here - one navigator [0] to start
    store.dispatch (updateContextInfo    ({ ...context.info }));
    store.dispatch (updateAllGlyphs      ({ ...context.glyphs }));
    store.dispatch (updateAllConnections ([ ...context.connections ]));

};