import axios from 'axios';
import store from '../store/store';
import {assignNavigatorAContext} from '../store/actions/navigatorActions';
import {openContextActionWrapper} from "../store/actions/contextActionWrappers";
import {setSavedContextId} from "../store/actions/contextInfoActions";
import {showContextsToOpen} from "../store/actions/menuBlocksActions";

var contexts = [];

const contextService = {
    listRecent: () => new Promise (resolve => {
        //axios.get('http://localhost:5000/contexts/list')
        axios.get('http://5.101.127.18:5000/contexts/list')
        .then (response => {
            store.dispatch (showContextsToOpen (response.data.list));
            resolve ();
        });
    }),
    open: openParams => new Promise (resolve => {
        //axios.get('http://localhost:5000/contexts/open', {params: {id:openParams.contextId}})
         axios.get('http://5.101.127.18:5000/contexts/open', {params: {id:openParams.contextId}})
            .then (response => {

              let theContext = response.data.content;

                // Handling old version contexts
                if (!theContext.info) {
                  console.log("Check if it is used anywhere - 23 Sept. 2018");
                  theContext.info = {
                    id: response.data.id,
                    title: response.data.title,
                    t: 0,
                    l: 0
                  }
                } else {
                  theContext.info.t = theContext.info.t || 0;
                  theContext.info.l = theContext.info.l || 0;
                }

                // Not used yet
                contexts.push(theContext);

                // Handling navigation stuff here - first use only one navigator [0] to simplify
                store.dispatch (assignNavigatorAContext ({
                    contextIndex: contexts.length - 1,
                    navigatorIndex: 0
                }));

                openContextActionWrapper(theContext);

                resolve ();
            });
    }),

    save: context => new Promise (resolve => {
        //axios.post('http://localhost:5000/contexts/save', {
        axios.post('http://5.101.127.18:5000/contexts/save', {
            id: context.info.id,
            title: context.info.title,
            content: JSON.stringify(context)
        }).then (response => {
            store.dispatch (setSavedContextId (response.data.id));
            resolve();
        });
    })
};

export default contextService;
