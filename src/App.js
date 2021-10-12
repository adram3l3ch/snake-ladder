import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Board from "./components/board/Board";
import { setGame, setPosition } from "./features/gameSlice";
import { LADDERS, SNAKES } from "./snakeAndLadder";

let timeout;

function App() {
	const { position, isGameStarted, currentPlayer, diceValue, score, winner } = useSelector(
		state => state.game
	);

	const dispatch = useDispatch();

	const createPlayers = e => {
		e.preventDefault();
		let _score = [];
		if (!isGameStarted) {
			for (let i = 0; i < e.target[0].value; i++) {
				_score.push(0);
			}
		}
		dispatch(setGame({ type: "score", value: _score }));
		dispatch(setGame({ type: "isGameStarted", value: true }));
		dispatch(setGame({ type: "currentPlayer", value: 0 }));
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
			dispatch(setGame({ type: "winner", value: [...winner, currentPlayer] }));
			dispatch(
				setGame({
					type: "score",
					value: [...score.slice(0, currentPlayer), ...score.slice(currentPlayer + 1)],
				})
			);
		}
	};

	useEffect(() => {
		if (winner.length + 1 === position.length) {
			dispatch(setGame({ type: "isGameStarted", value: false }));
			document.write("game over", winner);
		}
	}, [winner]);

	const throwDice = () => {
		let diceValue = Math.floor(Math.random() * 6 + 1);
		dispatch(setGame({ type: "diceValue", value: diceValue }));

		// let diceValue = 3;
		if (isGameStarted) {
			updateScore(diceValue);
		}
	};

	useEffect(() => {
		let player;
		if (checkForLadderAndSnake() || diceValue === 6) {
			player = currentPlayer;
		} else {
			console.log(score[currentPlayer + 1]);
			player = score[currentPlayer + 1] !== undefined ? currentPlayer + 1 : 0;
			console.log(player);
		}

		dispatch(setGame({ type: "currentPlayer", value: player }));
		// score.map((item, index) => updatePosition(item, index));
		updatePosition();
		checkForWin();
	}, [score]);

	const updateScore = _score => {
		if (score[currentPlayer] + _score < 101)
			dispatch(
				setGame({
					type: "score",
					value: [
						...score.slice(0, currentPlayer),
						score[currentPlayer] + _score,
						...score.slice(currentPlayer + 1),
					],
				})
			);
		else
			dispatch(
				setGame({
					type: "score",
					value: [...score],
				})
			);
	};

	const updatePosition = () => {
		let item = score[currentPlayer];
		if (item) {
			const { top, left } = document.querySelector(`#a_${item}`).getBoundingClientRect();
			let _position = [...position];
			_position[currentPlayer] = { top, left };

			dispatch(setPosition(_position));
		}
	};

	return (
		<>
			<div className="app">
				<Board position={position} />
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
