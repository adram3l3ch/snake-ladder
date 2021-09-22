import React from "react";
import boardImage from "../../assets/board.jpg";

const Board = ({ position }) => {
	const generateCells = (start, end) => {
		let array = [];
		while (end >= start) {
			array.push(
				<div className="cell" id={`a_${start}`}>
					{start}
				</div>
			);
			start++;
		}
		return array;
	};
	return (
		<div className="board">
			<div className="row">{generateCells(1, 10)}</div>
			<div className="row">{generateCells(11, 20)}</div>
			<div className="row">{generateCells(21, 30)}</div>
			<div className="row">{generateCells(31, 40)}</div>
			<div className="row">{generateCells(41, 50)}</div>
			<div className="row">{generateCells(51, 60)}</div>
			<div className="row">{generateCells(61, 70)}</div>
			<div className="row">{generateCells(71, 80)}</div>
			<div className="row">{generateCells(81, 90)}</div>
			<div className="row">{generateCells(91, 100)}</div>
			{position.map(value => (
				<div className="coin" style={value}></div>
			))}
			<img src={boardImage} alt="" />
		</div>
	);
};

export default Board;
