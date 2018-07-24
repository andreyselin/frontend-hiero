import axios from 'axios';
import store from '../store/store';
import {assignNavigatorAContext} from '../store/actions/navigatorActions';
import {updateAllGlyphs} from '../store/actions/glyphActions';
import {updateAllConnections} from '../store/actions/connectionActions';

var contexts = [];

const contextService = {
    open: openParams => new Promise (resolve => {
        axios.get('http://5.101.127.18:5000/contexts/open', {params: {id:openParams.contextId}})
            .then (response => {

                contexts.push(response.data.content);
                // Handling navigation stuff here - one navigator [0] to start
                store.dispatch (assignNavigatorAContext ({
                    contextIndex: contexts.length - 1,
                    navigatorIndex: 0
                }));

                // Handling navigation stuff here - one navigator [0] to start
                store.dispatch (updateAllGlyphs      ({ ...response.data.content.glyphs }));
                store.dispatch (updateAllConnections ([ ...response.data.content.connections ]));

                resolve ();
            });
    })
};

export default contextService;