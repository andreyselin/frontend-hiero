import axios from 'axios';
import store from '../store/store';
import {updateAllConnections} from '../store/actions/connectionActions';
import {updageAllGlyphs} from '../store/actions/glyphActions';

var currentContext = {
    glyphs: {},
    connections: []
};

const contextsService = {
    open: id => new Promise (resolve => {
        axios.get('http://5.101.127.18:5000/contexts/open', {params: {id:id}})
            .then(response => {
                currentContext = response.data.content;
                store.dispatch(updageAllGlyphs(currentContext.glyphs));
                store.dispatch(updateAllConnections(currentContext.connections));
                resolve (currentContext);
            });
    }),
    openDefault: () => contextsService.open(2),
    currentContext: currentContext
};

export default contextsService;