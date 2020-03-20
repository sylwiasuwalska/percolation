import React from "react";
import PropTypes from "prop-types";
import Header from "./Header.js";
import Grid from "./Grid.js";

class App extends React.Component {
	render() {
		return (
			<div>
				<Header />
				<Grid />
			</div>
		);
	}
}

export default App;
