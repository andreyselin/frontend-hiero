export const menuBlocks = {
    addGlyph:      "addGlyph",
    addConnection: "addConnection",
    editGlyph:     "addGlyph",
    openContext:   "openContext"
};



export const addConnectionModes = {
    connectionModeOff: "ConnectionModeOff",
    connectionModeOn: "ConnectionModeOn",
    fromGlyphChosen: "FromGlyphChosen"
};



export const actionTypes = {
    menuBlocks: {
        show:   "MENU_BLOCK_SHOW",
        hide:   "MENU_BLOCK_HIDE",
        toggle: "MENU_BLOCK_TOGGLE",

        showContextsToOpen: "MENU_BLOCK_SHOW_CONTEXTS_TO_OPEN"
    },
    navigator: {
        assignContext: "NAVIGATORS_ASSIGN_A_CONTEXT"
    },
    contextInfo: {
        update: "CONTEXT_INFO_UPDATE",
        setSavedContextId: "CONTEXT_INFO_SET_SAVED_CONTEXT_ID",
        clear:  "CONTEXT_INFO_CLEAR" // Used in starting new context
    },
    glyph: {
        add:       "GLYPH_ADD",
        remove:    "GLYPH_REMOVE",
        clearAll:  "GLYPH_CLEAR_ALL",
        setBounds: "GLYPH_SET_BOUNDS",
        move:      "GLYPH_MOVE",
        moveTree:  "GLYPH_MOVE_TREE",
        updateAll: "GLYPH_UPDATE_ALL",
        setActive: "GLYPH_SET_ACTIVE",
        editStyle: "GLYPH_EDIT_STYLE"
    },
    connection: {
        add:{
            toggle: "CONNECTION_ADD_TOGGLE",
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
        clearAll:  "CONNECTION_CLEAR_ALL",
        remove:    "REMOVE_CONNECTION"
    }
};