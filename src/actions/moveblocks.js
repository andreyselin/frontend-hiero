export const moveBlocks = (block) => {

    return {
        type: 'EDIT_BLOCK',
        payload: {
          'data': block.state
        }
    }
}
