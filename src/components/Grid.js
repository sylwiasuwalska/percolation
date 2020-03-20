import React from "react";
import PropTypes from "prop-types";

class Grid extends React.Component {
	drawSquare = (index, val) => {
		let color = "#6c5aa6";
		val == 1 ? (color = "#6c5aa6") : (color = "#f36e62");
		return (
			<div
				className="square"
				style={{ backgroundColor: color }}
				key={index}
			>
				{val}
			</div>
		);
	};

	render() {
		let squares = [...Array(100).keys()];
		return (
			<div className="container">
				{squares.map(n => {
					let val = Math.round(Math.random());
					return this.drawSquare(n, val);
				})}
			</div>
		);
	}
}

export default Grid;
