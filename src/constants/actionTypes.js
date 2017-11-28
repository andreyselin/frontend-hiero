const actionTypes = {
    glyph:{
        add:       "ADD_GLYPH",
        setBounds: "SET_BOUNDS",
        move:      "MOVE_GLYPH"
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
        }
    }
};

export default actionTypes;