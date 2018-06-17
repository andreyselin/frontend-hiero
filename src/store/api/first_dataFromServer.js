import addConnectionModes from '../../constants/addConnectionModes';

export const initialContext = {
    info: {
    },
    glyphs: {
        "g1": {
            link: "g1",
            w: 200,
            h: 100,
            l: 200,
            t: 175,
            label: 'All ICOs',
            img: null
        },
        "g2": {
            link: "g2",
            w: 100,
            h: 100,
            l: 500,
            t: 100,
            label: 'Bancor Protocol',
            img: null
        },
        "g3": {
            link: "g3",
            w: 100,
            h: 100,
            l: 500,
            t: 375,
            label: 'This is what we were talking about',
            classList: ['GlyphHorizontal'],
            img: {
                src: 'https://files.coinmarketcap.com/static/img/coins/32x32/eos.png',
                w:100,
                h:150
            },
        }
    },
    connections: [
        {
            link: "c2",
            fromLink: "g1",
            toLink: "g3"
        }
    ]

};

export var initialAppState = {
    newConnection: {mode: addConnectionModes.connectionModeOff}
};
