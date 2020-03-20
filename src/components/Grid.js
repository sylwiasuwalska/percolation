import React from "react";
import PropTypes from "prop-types";

class Grid extends React.Component {
	drawSquare = index => {
		return <canvas className="square" key={index}></canvas>;
	};

	drawGrid = () => {
		//console.log(squares);

		{
		}
	};
	render() {
		let squares = [...Array(100).keys()];
		return (
			<div className="container">
				{squares.map(n => {
					return this.drawSquare(n);
				})}
			</div>
		);
	}
}

export default Grid;
