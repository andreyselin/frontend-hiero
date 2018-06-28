const actionTypes = {
    glyph:{
        add:       "ADD_GLYPH",
        remove:    "REMOVE_GLYPH",
        setBounds: "SET_BOUNDS",
        move:      "MOVE_GLYPH",
        moveTree:  "MOVE_GLYPH_TREE"
    },
    connection:{
        add:{
            turn: {
                on:  "CONNECTION_ADD_TURN_ON",
                off: "CONNECTION_ADD_TURN_OFF"
            },
            choose:{
                from: "CONNECTION_ADD_CHOOSE_FROM",
                to:   "CONNECTION_ADD_CHOOSE_TO"
            }
        },
        remove: "REMOVE_CONNECTION",
    }
};

export default actionTypes;