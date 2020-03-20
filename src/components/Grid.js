import React from "react";
import PropTypes from "prop-types";

class Grid extends React.Component {
	constructor() {
		super();
		this.state = { values: {} };
	}

	initializeValueArray = () => {
		let newValues = {};
		for (let i = 0; i < 10; i++) {
			newValues[i] = {};
			for (let j = 0; j < 10; j++) {
				newValues[i][j] = 0;
			}
		}
		this.setState({ values: newValues });
	};
	getRandomFromRange = (min, max) => {
		return Math.round(Math.random() * (max - min) + min);
	};
	changeValueOfRandomCell = () => {
		let rowsKeys = this.shuffleArray(Object.keys(this.state.values));
		for (let i = 0; i < rowsKeys.length; i++) {
			let rowKey = rowsKeys[i];
			let cellsOfRow = this.state.values[rowKey];
			let keysOfClosedCells = Object.keys(cellsOfRow).filter(
				key => cellsOfRow[key] === 0
			);
			if (keysOfClosedCells.length < 0) continue;
			let randomClosedCell =
				keysOfClosedCells[
					this.getRandomFromRange(0, keysOfClosedCells.length - 1)
				];

			let newStateValues = this.state.values;
			newStateValues[rowKey][randomClosedCell] = 1;
			this.setState({ values: newStateValues });
			return;
		}
	};
	shuffleArray = array => {
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		return array;
	};
	iterateAndOpenNext = () => {
		this.changeValueOfRandomCell();
		// checkIfOpen...
	};

	drawSquare = (index, val) => {
		let color = "#6c5aa6";
		val == 1 ? (color = "#f36e62") : (color = "#6c5aa6");
		return (
			<div
				className="square"
				style={{ backgroundColor: color }}
				key={index}
				isopen={val}
			>
				{index}
			</div>
		);
	};
	componentDidMount() {
		this.initializeValueArray();
	}
	render() {
		var x = -1;
		return (
			<div className="container">
				{Object.keys(this.state.values).map(key => {
					return Object.keys(this.state.values[key]).map(rowKey => {
						x++;
						return this.drawSquare(
							x,
							this.state.values[key][rowKey]
						);
					});
				})}
				<button
					className="button"
					onClick={this.changeValueOfRandomCell}
				>
					Start
				</button>
			</div>
		);
	}
}

export default Grid;
