export const moveGlyph = (glyph) => {
     return {
        type: 'MOVE_GLYPH',
        payload: glyph.state
     }
}
