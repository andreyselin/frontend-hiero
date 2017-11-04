import React from 'react';
import "./Connection.css";

class Connection extends React.Component {

    constructor (props) {
        super(props);
        this.state = this.props.info;
    }


    componentDidMount () {
        //this.setState(this.drawConnection(this.state));
    }


    // Calculates position, angle
    // and length of connection line
    drawConnection (state) {

        let fromX = state.from.l,
            fromY = state.from.t,
            toX   = state.to.l,
            toY   = state.to.t;

        let catheterX, catheterY = 0,
            sideA, sideB, sideC = 0,
            heightOfTriangle,
            offsetToLeft;

        catheterX = fromX - toX;
        catheterY = fromY - toY;

        state.hypotenuse = Math.sqrt(catheterX*catheterX + catheterY*catheterY);

        state.angle = catheterX >= 0 ?
            Math.atan(1/(catheterX/catheterY)) * (180/Math.PI) + 180 :
            Math.atan(1/(catheterX/catheterY)) * (180/Math.PI);

        sideA = sideB = state.hypotenuse/2;
        sideC = 2 * sideA * Math.sin(this.state.angle/2 * Math.PI / 180);

        heightOfTriangle = sideB * Math.sin(this.state.angle * Math.PI / 180);
        offsetToLeft = Math.sqrt(sideC*sideC - heightOfTriangle*heightOfTriangle);

        state.top  = fromY + heightOfTriangle;
        state.left = fromX - offsetToLeft;

        return {
            top:   state.top,
            left:  state.left,
            angle: state.angle,
            hypotenuse: state.hypotenuse,
        };
    }


    render () {

        this.drawConnection (this.state);

        //console.log("this.state", this.state);
        //console.log("this.props", this.props.info);

        return (
            <div
                className="Connection"
                style={{
                        top:   this.state.top,
                        left:  this.state.left,
                        width: this.state.hypotenuse,
                        transform: `rotateZ(${this.state.angle}deg)`
                    }}
                ></div>
        );
    }


}

export default Connection;