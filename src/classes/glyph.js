import checkParams from './checkParams';

export default function Glyph (params){

    // Checking required params were passed
    let glyphParamsOk = checkParams({
            w:      {type: "number", required: false  },
            h:      {type: "number", required: false  },
            l:      {type: "number", required: true   },
            t:      {type: "number", required: true   },
            header: {type: "string", required: true   },
            label:  {type: "string", required: false  },
            img:    {type: "object", required: false  },
            action: {type: "object", required: false  }
        }, params),

        imgParamsOk =
            ['undefined', 'null'].indexOf(typeof params.img) === -1
            ||
            (typeof params.img === 'object' && checkParams({
                src: {type: "string", required: true  },
                w:   {type: "number", required: false },
                h:   {type: "number", required: false },
                alt: {type: "string", required: false }
            }, params));

    if (!(glyphParamsOk && imgParamsOk)){
        console.error("Can not find required param");
    }
    params.link = Math.random().toString(36).slice(2);
    return params;

}
