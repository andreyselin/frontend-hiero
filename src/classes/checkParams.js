export default function checkParams(expectedParams, paramsToCheck) { //
    var toReturn = true;

    Object.keys(expectedParams).forEach(key=>{

        if (
            expectedParams[key].required
            &&
            (
                [null, undefined].indexOf(paramsToCheck[key]) > -1
                ||
                expectedParams[key].type !== typeof paramsToCheck[key]
            )
        ) {
            console.error("Wrong param: "+key, expectedParams[key].required);
            toReturn = false;
        }
    });

    return toReturn;

}