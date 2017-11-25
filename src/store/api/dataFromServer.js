import addConnectionModes from '../../constants/addConnectionModes';

export const initialContext = {
    info: {
    },
    glyphs: {
        "g1": {
            link: "g1",
            w: 200,
            h: 200,
            l: 200,
            t: 175,
            label: 'All ICOs',
            img: 'https://www.shareicon.net/data/128x128/2015/08/25/90855_infinity_457x512.png'
        },
        "g2": {
            link: "g2",
            w: 100,
            h: 100,
            l: 500,
            t: 100,
            label: 'Bancor Protocol',
            img: 'https://files.coinmarketcap.com/static/img/coins/32x32/bancor.png'
        },
        "g3": {
            link: "g3",
            w: 100,
            h: 100,
            l: 500,
            t: 375,
            label: 'EOS',
            img: 'https://files.coinmarketcap.com/static/img/coins/32x32/eos.png'
        }
    },
    connections: [
        {
            link: "c1",
            fromLink: "g1",
            toLink: "g2"
        },
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
