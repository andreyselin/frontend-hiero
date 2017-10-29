import React from 'react';
import "./Connection.css";

class Connection extends React.Component {





    constructor (props) {
        super(props);
        this.state = {
            hypotenuse: 0,
            angle: 0,
            top: 0,
            left:0,
            ...this.props.info
        };
        this.drawConnection = this.drawConnection.bind(this);
    }





    componentDidMount () {
        this.setState(this.drawConnection(this.state));
    }





    // Calculates position, angle
    // and length of connection line
    drawConnection (state) {

        var fromX = state.from.l;
        var fromY = state.from.t;
        var toX   = state.to.l;
        var toY   = state.to.t;

        var catheterX, catheterY = 0;
        var sideA, sideB, sideC = 0;
        var heightOfTriangle;
        var offsetToLeft;
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
        console.log("this.state", this.state);
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
        )
    }





}

export default Connection;