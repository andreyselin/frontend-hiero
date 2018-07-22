import contextService from './context';

const appService = {
    init: ()=>{
        contextService.open({
            contextId: 2,
            navigatorIndex: null
        });
    }
};

export default appService;