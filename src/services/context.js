import axios from 'axios';
import store from '../store/store';
import {assignNavigatorAContext} from '../store/actions/navigatorActions';
import {openContextActionWrapper} from "../store/actions/contextActionWrappers";
import {setSavedContextId} from "../store/actions/contextInfoActions";

var contexts = [];

const contextService = {
    /*
    listRecent: () => new Promise (resolve => {
        axios.get('http://localhost:5000/contexts/list-recent')
        //axios.get('http://5.101.127.18:5000/contexts/list-recent')
        .then (response => {
            console.log("listRecent response", response);
        });
    }),
    */
    open: openParams => new Promise (resolve => {
        axios.get('http://localhost:5000/contexts/open', {params: {id:openParams.contextId}})
        // axios.get('http://5.101.127.18:5000/contexts/open', {params: {id:openParams.contextId}})
            .then (response => {

                response.data.content.info = {
                    id: response.data.id,
                    title: response.data.title
                };

                contexts.push(response.data.content);

                // Handling navigation stuff here - first use only one navigator [0] to simplify
                store.dispatch (assignNavigatorAContext ({
                    contextIndex: contexts.length - 1,
                    navigatorIndex: 0
                }));

                openContextActionWrapper(response.data.content);

                resolve ();
            });
    }),

    save: context => new Promise (resolve => {
        axios.post('http://5.101.127.18:5000/contexts/save', {
            id: context.info.id,
            title: context.info.title,
            content: JSON.stringify({
                glyphs: context.glyphs,
                connections: context.connections
            })
        }).then (response => {
            store.dispatch (setSavedContextId (response.data.id));
            resolve();
        });
    })
};

export default contextService;