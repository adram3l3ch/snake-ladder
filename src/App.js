import React, { useEffect, useState } from "react";
import { LADDERS, SNAKES } from "./snakeAndLadder";

let timeout;

function App() {
	const [position, setPosition] = useState({});
	const [noOfPlayers, setNoOfPlayers] = useState(0);
	const [isGameStarted, setIsGameStarted] = useState(false);
	const [currentPlayer, setCurrentPlayer] = useState(null);
	const [players, setPlayers] = useState({});

	const setScore = diceValue => {
		setPlayers({ ...players, [currentPlayer.id]: currentPlayer.score + diceValue });
	};

	const throwDice = () => {
		let diceValue = Math.floor(Math.random() * 6 + 1);
		if (isGameStarted) {
			setScore(diceValue);
		}
	};

	const updateCurrentPlayerScore = () => {
		setCurrentPlayer({ ...currentPlayer, score: players[currentPlayer.id] });
	};

	const checkForLadderAndSnake = () => {
		console.log("ladder");
		let a;
		setCurrentPlayer(b => {
			a = b;
			return b;
		});
		console.log(a);
		if (LADDERS.hasOwnProperty(currentPlayer.score)) {
			setScore(LADDERS[currentPlayer.score] - currentPlayer.score);
		} else if (SNAKES.hasOwnProperty(currentPlayer.score)) {
			setScore(currentPlayer.score - SNAKES[currentPlayer.score]);
		}
	};

	useEffect(() => {
		if (isGameStarted && currentPlayer) {
			for (let i in players) {
				updatePosition(i);
			}
		}
	}, [players, currentPlayer]);

	useEffect(() => {
		if (isGameStarted && currentPlayer) {
			updateCurrentPlayerScore();
		}
	}, [players]);

	useEffect(() => {
		if (isGameStarted && currentPlayer) {
			console.log("asd");
			setTimeout(checkForLadderAndSnake, 500);
		}
	}, [currentPlayer]);

	const updatePosition = player => {
		let { top, left } = document.querySelector(`#a_${players[player]}`).getBoundingClientRect();
		setPosition(position => ({
			...position,
			[player]: { top, left },
		}));
	};

	const generateCells = num => {
		let array = [];
		while (num > 0) {
			array.push(
				<div className="cell" id={`a_${num}`}>
					{num}
				</div>
			);
			num--;
		}
		return array;
	};

	const createPlayers = e => {
		e.preventDefault();
		if (!isGameStarted) {
			setNoOfPlayers(e.target[0].value);
			for (let i = 0; i < e.target[0].value; i++) {
				setPlayers(players => ({ ...players, [`player_${i}`]: 1 }));
			}
		}
		setIsGameStarted(true);
	};

	const changePlayer = () => {
		setCurrentPlayer(currentPlayer => {
			let id = +currentPlayer?.id.split("_")[1] + 1;
			let nextPlayer = players[`player_${id}`] ? `player_${id}` : `player_0`;
			let score = players[nextPlayer];
			return { id: nextPlayer, score };
		});
	};

	useEffect(() => {
		clearTimeout(timeout);
		if (Object.keys(players).length > 0) {
			timeout = setTimeout(changePlayer, 1000);
		}
	}, [players]);

	return (
		<>
			<div className="app">
				{generateCells(100)}
				{Object.keys(players).map(key => (
					<div className="coin" style={position[key]}></div>
				))}
			</div>
			<form onSubmit={createPlayers}>
				<input type="number" min="2" max="4" defaultValue="2" />
				<button type="submit">start</button>
			</form>
			<button onClick={throwDice}>CLick ME</button>
			{/* <h1>{score}</h1> */}
		</>
	);
}

export default App;
