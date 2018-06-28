function getGlyphsArray(glyphNames, glyphsStore) {
    let result = glyphNames.map((glyphLink) => {
        return glyphsStore[glyphLink];
    });

    return result;
}

export {
    getGlyphsArray 
}