export function drawConnection (from, to) {

    let fromX = from.l + from.w/2,
        fromY = from.t + from.h/2,
        toX   = to.l + to.w/2,
        toY   = to.t + to.h/2;

    let heightOfTriangle = 0,
        offsetToLeft = 0;
    let catheterX = fromX - toX;
    let catheterY = fromY - toY;
    let hypotenuse = Math.sqrt(catheterX*catheterX + catheterY*catheterY);
    let angle = catheterX >= 0 ?
        Math.atan(1/(catheterX/catheterY)) * (180/Math.PI) + 180 :
        Math.atan(1/(catheterX/catheterY)) * (180/Math.PI);
    let sideAB = hypotenuse/2;
    let sideC = 2 * sideAB * Math.sin(angle/2 * Math.PI / 180);

    heightOfTriangle = sideAB * Math.sin(angle * Math.PI / 180);
    offsetToLeft = Math.sqrt(sideC*sideC - heightOfTriangle*heightOfTriangle);

    let top  = fromY + heightOfTriangle;
    let left = fromX - offsetToLeft;


    return {
        top:   top,
        left:  left,
        transform: `rotateZ(${angle}deg)`,
        width: hypotenuse
    }
}
