const actionTypes = {
    interface: {
        showMenuBlock: "SHOW_MENU_BLOCK",
        hideMenuBlock: "HIDE_MENU_BLOCK"
    },
    navigator: {
        assignContext: "NAVIGATORS_ASSIGN_A_CONTEXT"
    },
    contextInfo: {
        update: "CONTEXT_INFO_UPDATE"
    },
    glyph: {
        add:       "GLYPH_ADD",
        remove:    "GLYPH_REMOVE",
        setBounds: "GLYPH_SET_BOUNDS",
        move:      "GLYPH_MOVE",
        moveTree:  "GLYPH_MOVE_TREE",
        updateAll: "GLYPH_UPDATE_ALL",
        setActive: "GLYPH_SET_ACTIVE"
    },
    connection: {
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
        updateAll: "CONNECTION_UPDATE_ALL",
        remove: "REMOVE_CONNECTION"
    }
};

export default actionTypes;