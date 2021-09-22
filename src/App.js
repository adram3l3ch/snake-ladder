import React, { useEffect, useState } from "react";
import { LADDERS, SNAKES } from "./snakeAndLadder";
import boardImage from "./assets/board.jpg";

let timeout;

function App() {
	const [position, setPosition] = useState([]);
	const [isGameStarted, setIsGameStarted] = useState(false);
	const [currentPlayer, setCurrentPlayer] = useState(null);
	const [diceValue, setDiceValue] = useState(null);
	const [score, setScore] = useState([]);
	const [winner, setWinner] = useState([]);

	const createPlayers = e => {
		e.preventDefault();
		if (!isGameStarted) {
			for (let i = 0; i < e.target[0].value; i++) {
				setScore(score => [...score, 1]);
			}
		}
		setIsGameStarted(true);
		setCurrentPlayer(0);
	};

	const checkForLadderAndSnake = () => {
		clearTimeout(timeout);
		let ladderOrSnake;
		if (LADDERS.hasOwnProperty(score[currentPlayer])) {
			ladderOrSnake = LADDERS[score[currentPlayer]] - score[currentPlayer];
			timeout = setTimeout(() => updateScore(ladderOrSnake), 500);
			return true;
		} else if (SNAKES.hasOwnProperty(score[currentPlayer])) {
			ladderOrSnake = SNAKES[score[currentPlayer]] - score[currentPlayer];
			timeout = setTimeout(() => updateScore(ladderOrSnake), 500);
			return true;
		}
		return false;
	};

	const checkForWin = () => {
		if (score[currentPlayer] === 100 && !winner.includes(currentPlayer)) {
			setWinner([...winner, currentPlayer]);
			setScore([...score.slice(0, currentPlayer), ...score.slice(currentPlayer + 1)]);
		}
	};

	useEffect(() => {
		if (winner.length + 1 === position.length) {
			setIsGameStarted(false);
			document.write("game over", winner);
		}
	}, [winner]);

	const throwDice = () => {
		let diceValue = Math.floor(Math.random() * 6 + 1);
		setDiceValue(diceValue);
		// let diceValue = 3;
		if (isGameStarted) {
			updateScore(diceValue);
		}
	};

	useEffect(() => {
		setCurrentPlayer(currentPlayer => {
			if (checkForLadderAndSnake() || diceValue === 6) return currentPlayer;
			else return score[currentPlayer + 1] ? currentPlayer + 1 : 0;
		});
		score.map((item, index) => updatePosition(item, index));
		checkForWin();
	}, [score]);

	const updateScore = _score => {
		if (score[currentPlayer] + _score < 101) {
			setScore([
				...score.slice(0, currentPlayer),
				score[currentPlayer] + _score,
				...score.slice(currentPlayer + 1),
			]);
		} else setScore([...score]);
	};

	const updatePosition = (item, index) => {
		let { top, left } = document.querySelector(`#a_${item}`).getBoundingClientRect();
		setPosition(position => [
			...position.slice(0, index),
			{ top, left },
			...position.slice(index + 1),
		]);
	};

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
		<>
			<div className="app">
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
			<form onSubmit={createPlayers}>
				<input type="number" min="2" max="4" defaultValue="2" />
				<button type="submit">start</button>
			</form>
			<button onClick={throwDice}>CLick ME</button>
			<h3>{diceValue}</h3>
			{/* <h1>{score}</h1> */}
		</>
	);
}

export default App;
