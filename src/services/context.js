import axios from 'axios';
import store from '../store/store';
import {assignNavigatorAContext} from '../store/actions/navigatorActions';
import {updateContextInfo} from '../store/actions/contextInfoActions';
import {updateAllGlyphs} from '../store/actions/glyphActions';
import {updateAllConnections} from '../store/actions/connectionActions';

var contexts = [];

const contextService = {
    open: openParams => new Promise (resolve => {
        axios.get('http://5.101.127.18:5000/contexts/open', {params: {id:openParams.contextId}})
            .then (response => {

                // Must include id to resave existing or new
                // Tmp: following should be saved on backed in content as well as it is saved in separated db columns
                response.data.content.info = {
                    id: openParams.contextId,
                    title: response.data.title
                };
                // End of tmp


                contexts.push(response.data.content);

                // Handling navigation stuff here - one navigator [0] to start
                store.dispatch (assignNavigatorAContext ({
                    contextIndex: contexts.length - 1,
                    navigatorIndex: 0
                }));

                // Clearing connections to avoid redrawing old connections with new glyphs and linkng errors
                store.dispatch (updateAllConnections ([]));

                // Handling navigation stuff here - one navigator [0] to start
                store.dispatch (updateContextInfo    ({ ...response.data.content.info }));
                store.dispatch (updateAllGlyphs      ({ ...response.data.content.glyphs }));
                store.dispatch (updateAllConnections ([ ...response.data.content.connections ]));

                resolve ();
            });
    }),
    save: context => new Promise (resolve => {
        axios.post('http://5.101.127.18:5000/contexts/save', {
            id: context.info.id,
            title: context.info.title,
            content: JSON.stringify(context)
        }).then (response => resolve ());
    })
};

export default contextService;