export function drawConnection (from, to) {

    let heightOfTriangle = 0,
        offsetToLeft = 0;
    let catheterX = from.l - to.l;
    let catheterY = from.t - to.t;

    let fromX, fromY, toX, toY;

    if (Math.abs(catheterX/catheterY) > from.w/from.h){
        fromX = from.l + from.w/2 * (catheterX > 0 ? -1 : 1);
        fromY = from.t + catheterY / (catheterX / (from.w/2)) * (catheterX > 0 ? -1 : 1);
    } else {
        fromX = from.l + catheterX / (catheterY / (from.h/2)) * (catheterY > 0 ? -1 : 1);
        fromY = from.t + from.h/2 * (catheterY > 0 ? -1 : 1);
    }

    if (Math.abs(catheterX/catheterY) > to.w/to.h){
        toX = to.l + to.w/2 * (catheterX > 0 ? 1 : -1);
        toY = to.t + catheterY / (catheterX / (to.w/2)) * (catheterX > 0 ? 1 : -1);
    } else {
        toX = to.l + catheterX / (catheterY / (to.h/2)) * (catheterY > 0 ? 1 : -1);
        toY = to.t + to.h/2 * (catheterY > 0 ? 1 : -1);
    }

    catheterX = fromX - toX;
    catheterY = fromY - toY;

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
