import React from 'react';
import "./Connection.css";

class Connection extends React.Component {

    constructor (props) {
        super(props);
        this.state = {};
    }

    // Calculates position, angle
    // and length of connection line
    drawConnection (from, to) {

        let fromX = from.l,
            fromY = from.t,
            toX   = to.l,
            toY   = to.t;

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


    render () {

        return (
            <div
                className="Connection"
                style={ this.drawConnection(this.props.from, this.props.to)}
                >
            </div>
        );
    }


}

export default Connection;