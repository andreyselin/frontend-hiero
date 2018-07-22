function getGlyphsArray(glyphNames, glyphsStore) {
    let result = glyphNames.map((glyphLink) => {
        return glyphsStore[glyphLink];
    });

    return result;
}

function findChildrenLinks(targetGlyph, context) {
    let movedGlyphLink = targetGlyph.props.glyph.link;
    // console.log("movedGlyphLink", movedGlyphLink);
    let allConnections = context.connections;
    let allMovingChildren = [];

    searchForChildren(movedGlyphLink, allConnections);

    return allMovingChildren;

    function searchForChildren(movedGlyphLink, connectionsArray) {

        let stepChildren = connectionsArray.filter((connection) => {
            return (connection.fromLink === movedGlyphLink);
        });
        
        allMovingChildren.push(movedGlyphLink);

        if (stepChildren.length > 0) {                
            stepChildren.forEach((child) => {
                searchForChildren(child.toLink, connectionsArray);
            });
        }
    }
}

function findGlyphsConections(glyph, context) {
    let allConnections = context.props.connections;
    let removeConnections = allConnections.filter((connection) => {
        return (connection.fromLink === glyph) || (connection.toLink === glyph);
    });
    
    return removeConnections;
}

export {
    getGlyphsArray,
    findChildrenLinks,
    findGlyphsConections
}
