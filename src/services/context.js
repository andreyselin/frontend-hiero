import axios from 'axios';
import store from '../store/store';
import {assignNavigatorAContext} from '../store/actions/navigatorActions';
import {updateAllConnections} from '../store/actions/connectionActions';
import {updageAllGlyphs} from '../store/actions/glyphActions';

var contexts = [];

const contextService = {
    open: openParams => new Promise (resolve => {
        console.log('openParams', openParams);
        axios.get('http://5.101.127.18:5000/contexts/open', {params: {id:openParams.contextId}})
            .then (response => {

                // Handling navigation stuff here - one navigator [0] to start
                store.dispatch (assignNavigatorAContext ({
                    context: response.data.content,
                    navigatorIndex: 0
                }));

                /*
                // This must be changed to reducers composition
                store.dispatch (updageAllGlyphs      (contextService.currentContext.glyphs));
                store.dispatch (updateAllConnections (contextService.currentContext.connections));
                */

                resolve (contextService.currentContext);
            });
    }),
    currentContextIndex: null,
    currentContext: null
};

export default contextService;