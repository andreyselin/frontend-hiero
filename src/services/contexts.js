import axios from 'axios';

var currentContext = {
    glyphs: {},
    connections: []
};

const contextsService = {
    open: id => new Promise (resolve => {
        axios.get('http://5.101.127.18:5000/contexts/open', {params: {id:id}})
            .then(response => {
                currentContext = response.data.content;
                console.log("currentContext", currentContext);
                resolve (currentContext);
            });
    }),
    openDefault: () => contextsService.open(1),
    currentContext: currentContext
};

export default contextsService;