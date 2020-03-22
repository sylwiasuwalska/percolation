import React from "react";
import Results from "./Results.js";
import { getRandomFromRange, shuffleArray } from "./helpers.js";

class Grid extends React.Component {
	constructor() {
		super();
		this.state = {
			values: {},
			message: "To estimate percolation threshold click 'Start':",
			result: "Percolation threshold will be shown here.",
			percolated: false,
			isInProgres: "active",
			countToRefresh: false
		};
		this.parent = {
			// {row.column}
			"-1.-1": "-1.-1", // Virtual top
			"-2.-2": "-2.-2" // Virtual bottom
		};
		this.size = {
			"-1.-1": 1, // Virtual top
			"-2.-2": 1 // Virtual bottom
		};
		this.finished = false;
	}

	initializeArrays = () => {
		let newValues = this.state.values;
		for (let i = 0; i < 10; i++) {
			newValues[i] = {};
			for (let j = 0; j < 10; j++) {
				this.parent[`${i}.${j}`] = `${i}.${j}`;
				this.size[`${i}.${j}`] = 1;
				newValues[i][j] = 0;
			}
		}
		this.setState({
			values: newValues
		});
	};

	findRoot = (row, column) => {
		let rootElement = `${row}.${column}`;
		while (rootElement != this.parent[rootElement])
			rootElement = this.parent[rootElement];
		return rootElement;
	};
	union = (rowP, columnP, rowQ, columnQ) => {
		let rootP = this.findRoot(rowP, columnP);
		let rootQ = this.findRoot(rowQ, columnQ);
		if (rootP === rootQ) {
			return;
		}
		if (this.size[rootP] < this.size[rootQ]) {
			this.parent[rootP] = rootQ;
			this.size[rootQ] += this.size[rootP];
		} else {
			this.parent[rootQ] = rootP;
			this.size[rootP] += this.size[rootQ];
		}
	};
	unionNeighbours = (row, column) => {
		if (column > 0) {
			if (this.state.values[row][column - 1] == 1) {
				this.union(row, column, row, column - 1);
			}
		}

		if (column < 9) {
			if (this.state.values[row][column + 1] == 1) {
				this.union(row, column, row, column + 1);
			}
		}

		if (row > 0) {
			if (this.state.values[row - 1][column] == 1) {
				this.union(row, column, row - 1, column);
			}
		}

		if (row < 9) {
			if (this.state.values[row + 1][column] == 1) {
				this.union(row, column, row + 1, column);
			}
		}
		if (row == 0) {
			this.union(row, column, -1, -1);
		}
		if (row == 9) {
			this.union(row, column, -2, -2);
		}
	};

	changeValueOfRandomCell = () => {
		var rowsKeys = shuffleArray(Object.keys(this.state.values));
		for (let i = 0; i < rowsKeys.length; i++) {
			var rowKey = rowsKeys[i];
			let cellsOfRow = this.state.values[rowKey];
			let keysOfClosedCells = Object.keys(cellsOfRow).filter(
				key => cellsOfRow[key] === 0
			);
			if (keysOfClosedCells.length === 0 && i === rowsKeys.length - 1) {
				this.finished = true;
				break;
			}
			if (keysOfClosedCells.length === 0) continue;

			var randomClosedCell =
				keysOfClosedCells[
					getRandomFromRange(0, keysOfClosedCells.length - 1)
				];

			rowKey = parseInt(rowKey);
			randomClosedCell = parseInt(randomClosedCell);

			this.unionNeighbours(rowKey, randomClosedCell);

			let newStateValues = this.state.values;
			newStateValues[rowKey][randomClosedCell] = 1;

			this.setState({ values: newStateValues });

			return;
		}
	};

	percolates = () => {
		return this.findRoot(-1, -1) == this.findRoot(-2, -2);
	};

	checkIfDone = () => {
		if (this.percolates() || this.finished) {
			this.setState({ message: "It percolates!" });
			this.calculateResults();
			this.setState({ percolated: true });
			this.setState({ isInProgres: "active" });

			this.setState({ countToRefresh: true });
		} else {
			setTimeout(
				function() {
					this.changeValueOfRandomCell();
					this.checkIfDone();
				}.bind(this),
				80
			);
		}
	};
	calculateResults = () => {
		let totalClosed = 0;
		let rowsKeys = Object.keys(this.state.values);
		for (let i = 0; i < rowsKeys.length; i++) {
			let rowKey = rowsKeys[i];
			let cellsOfRow = this.state.values[rowKey];
			totalClosed += Object.keys(cellsOfRow).filter(
				key => cellsOfRow[key] === 0
			).length;
		}
		let percent = (100 - parseFloat(totalClosed)) / 100;
		this.setState({ result: `Percolation threshold is ${percent}` });
	};
	checkIfMemberOfPercolation = (row, column) => {
		if (this.state.percolated == false) return false;
		let winningParent = this.findRoot(-1, -1);
		console.log(winningParent);

		let test = Object.keys(this.parent).filter(
			key => this.parent[key] === winningParent
		);
		console.log(test);
	};

	drawSquare = (row, column, counter, val) => {
		this.checkIfMemberOfPercolation(row, column);
		let color = "#000";
		val === 1 ? (color = "#fff") : (color = "#000");
		if (this.findRoot(row, column) == this.findRoot(-1, -1)) {
			color = "#008fe6";
		}
		return (
			<div
				className="square"
				style={{ backgroundColor: color }}
				key={counter}
				isopen={val}
			>
				<p>{counter}</p>
			</div>
		);
	};
	start = () => {
		this.setState({ message: "In progress..." });
		this.setState({ isInProgres: "disabled" });

		if (!this.state.countToRefresh) {
			this.checkIfDone();
		} else {
			this.initializeArrays();
			this.checkIfDone();
		}
	};
	componentDidMount() {
		this.initializeArrays();
	}
	componentDidUpdate() {}
	render() {
		var x = -1;
		return (
			<div>
				<div className="container-results">
					<Results result={this.state.result} />
				</div>
				<div className="container-grid">
					{Object.keys(this.state.values).map(rowKey => {
						return Object.keys(this.state.values[rowKey]).map(
							columnKey => {
								x++;
								return this.drawSquare(
									rowKey,
									columnKey,
									x,
									this.state.values[rowKey][columnKey]
								);
							}
						);
					})}
					<h2>{this.state.message}</h2>
					<button
						className={`button btn btn-primary btn-block ${this.state.isInProgres}`}
						onClick={this.start}
					>
						Start
					</button>
				</div>
			</div>
		);
	}
}

export default Grid;
