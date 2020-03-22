import React from "react";
import percolateyes from "../img/percolatesyes.jpg";
import percolateno from "../img/percolatesno.jpg";

class Results extends React.Component {
	render() {
		return (
			<React.Fragment>
				<div className="desc">
					<p>
						We model a percolation system using an n-by-n grid of
						sites. Each site is either open or blocked. A full site
						is an open site that can be connected to an open site in
						the top row via a chain of neighboring (left, right, up,
						down) open sites. We say the system percolates if there
						is a full site in the bottom row. In other words, a
						system percolates if we fill all open sites connected to
						the top row and that process fills some open site on the
						bottom row. (For the insulating/metallic materials
						example, the open sites correspond to metallic
						materials, so that a system that percolates has a
						metallic path from top to bottom, with full sites
						conducting. For the porous substance example, the open
						sites correspond to empty space through which water
						might flow, so that a system that percolates lets water
						fill open sites, flowing from top to bottom.)
					</p>
					<img
						src={percolateyes}
						alt="System percolates"
						height="250"
					/>
					<img
						src={percolateno}
						alt="System percolates"
						height="250"
					/>
					<p>
						To estimate the percolation threshold, consider the
						following computational experiment:
					</p>
					<p>&bull; Initialize all sites to be blocked.</p>
					<p>
						&bull; Repeat the following until the system percolates:
						Choose a site uniformly at random among all blocked
						sites.
					</p>
					<p>&bull; Open the site. </p>
					<p>
						The fraction of sites that are opened when the system
						percolates provides an estimate of the percolation
						threshold.
					</p>

					<p>
						Source:{" "}
						<a href="https://coursera.cs.princeton.edu/algs4/assignments/percolation/specification.php">
							https://coursera.cs.princeton.edu/algs4/assignments/percolation/specification.php
						</a>
					</p>
				</div>
				<div className="threshold">
					<h2>{this.props.result}</h2>
				</div>
			</React.Fragment>
		);
	}
}
export default Results;
