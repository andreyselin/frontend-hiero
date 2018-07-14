import addConnectionModes from '../../constants/addConnectionModes'; //

export const initialContext = {
    "glyphs": {
        "zfe9yuya43b": {
            "link": "zfe9yuya43b",
            "w": 200,
            "h": 221,
            "l": 270,
            "t": 455,
            "label": "Владимир Путин",
            "img": {"src": "https://static.thenounproject.com/png/55173-200.png"}
        },
        "7gxckz4l115": {"link": "7gxckz4l115", "w": 74, "h": 18, "l": 506, "t": 570, "label": "кошельки"},
        "qk338cxebc": {"link": "qk338cxebc", "w": 58, "h": 18, "l": 627, "t": 693, "label": "хостинг", "img": null},
        "8xz14ufzcqw": {"link": "8xz14ufzcqw", "w": 77, "h": 18, "l": 735, "t": 393, "label": "Платежка", "img": null},
        "iqmtuki6nnp": {"link": "iqmtuki6nnp", "w": 70, "h": 18, "l": 896, "t": 299, "label": "Adv Cash", "img": null},
        "8stpqjcq0yr": {"link": "8stpqjcq0yr", "w": 73, "h": 18, "l": 1047, "t": 278, "label": "Позвонил", "img": null},
        "v784j7l5e8": {
            "link": "v784j7l5e8",
            "w": 103,
            "h": 18,
            "l": 914,
            "t": 345,
            "label": "Perfect Money",
            "img": null
        },
        "rtaztywuwl": {"link": "rtaztywuwl", "w": 31, "h": 18, "l": 882, "t": 439, "label": "Qiwi", "img": null},
        "tzwi4xqktl": {"link": "tzwi4xqktl", "w": 84, "h": 18, "l": 575, "t": 195, "label": "смс-сервис", "img": null},
        "evzw57xwpoc": {
            "link": "evzw57xwpoc",
            "w": 116,
            "h": 18,
            "l": 780,
            "t": 163,
            "label": "закинуть денег",
            "img": null
        },
        "z0q1xzts1ud": {
            "link": "z0q1xzts1ud",
            "w": 93,
            "h": 18,
            "l": 912,
            "t": 396,
            "label": "Advance Pay",
            "img": null
        },
        "undefined": {"w": 0, "h": 0}
    },
    "connections": [{"link": "67pyt1o8cmf", "fromLink": "zfe9yuya43b", "toLink": "7gxckz4l115"}, {
        "link": "ha3egpycpb5",
        "fromLink": "7gxckz4l115",
        "toLink": "qk338cxebc"
    }, {"link": "b8qhpe0ouzo", "fromLink": "zfe9yuya43b", "toLink": "8xz14ufzcqw"}, {
        "link": "4zcr8vckxpe",
        "fromLink": "8xz14ufzcqw",
        "toLink": "iqmtuki6nnp"
    }, {"link": "gjbxfshd40c", "fromLink": "iqmtuki6nnp", "toLink": "8stpqjcq0yr"}, {
        "link": "mg36uy8j4ce",
        "fromLink": "8xz14ufzcqw",
        "toLink": "v784j7l5e8"
    }, {"link": "viee84v21up", "fromLink": "8xz14ufzcqw", "toLink": "rtaztywuwl"}, {
        "link": "gae1cez7uot",
        "fromLink": "zfe9yuya43b",
        "toLink": "tzwi4xqktl"
    }, {"link": "tcrxdxqmoj", "fromLink": "tzwi4xqktl", "toLink": "evzw57xwpoc"}, {
        "link": "hshja5gn83g",
        "fromLink": "8xz14ufzcqw",
        "toLink": "z0q1xzts1ud"
    }]
};

export var initialAppState = {
    newConnection: {mode: addConnectionModes.connectionModeOff}
};