import React from "react";
import Rectangle from "./Rectangle.js";
class Grid extends React.Component {
	constructor() {
		super();
		this.state = { values: {}, parents: {} };
		this.connections = [];
		this.finished = false;
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

	initializeParentsArray = () => {
		let newValues = {};
		for (let i = 0; i < 10; i++) {
			newValues[i] = {};
			for (let j = 0; j < 10; j++) {
				newValues[i][j] = `${i}.${j}`;
			}
		}
		this.setState({ parents: newValues });
	};

	getRandomFromRange = (min, max) => {
		return Math.round(Math.random() * (max - min) + min);
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

	changeValueOfRandomCell = () => {
		let rowsKeys = this.shuffleArray(Object.keys(this.state.values));
		for (let i = 0; i < rowsKeys.length; i++) {
			let rowKey = rowsKeys[i];
			let cellsOfRow = this.state.values[rowKey];
			let keysOfClosedCells = Object.keys(cellsOfRow).filter(
				key => cellsOfRow[key] === 0
			);
			if (keysOfClosedCells.length === 0 && i === rowsKeys.length - 1) {
				this.finished = true;
				break;
			}
			if (keysOfClosedCells.length === 0) continue;

			let randomClosedCell =
				keysOfClosedCells[
					this.getRandomFromRange(0, keysOfClosedCells.length - 1)
				];

			let newStateValues = this.state.values;

			newStateValues[rowKey][randomClosedCell] = 1;
			//1. Check if neighbours are open

			//2. Change cell's parent if neighbour is opened

			this.setState({ values: newStateValues });
			return;
		}
	};

	checkIfOpen = () => {
		return false;
	};

	checkIfDone = () => {
		if (this.checkIfOpen() || this.finished) {
			console.log("Sukces!");
		} else {
			setTimeout(
				function() {
					this.changeValueOfRandomCell();
					this.checkIfDone();
				}.bind(this),
				200
			);
		}
	};

	iterateAndOpenNext = () => {
		this.checkIfDone();
	};

	drawSquare = (index, val) => {
		let color = "#6c5aa6";
		val === 1 ? (color = "#f36e62") : (color = "#6c5aa6");
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
		this.initializeParentsArray();

		let rect = new Rectangle();
		rect.height = 10;
		rect.width = 15;
		this.connections.push(rect);
		console.log(JSON.stringify(this.connections));
	}
	render() {
		console.log(JSON.stringify(this.state.parents));
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
					className="button btn btn-success btn-block"
					onClick={this.iterateAndOpenNext}
				>
					Start
				</button>
			</div>
		);
	}
}

export default Grid;
