import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	position: [],
	isGameStarted: false,
	currentPlayer: null,
	diceValue: null,
	score: [],
	winner: [],
};

export const gameSlice = createSlice({
	name: "game",
	initialState,
	reducers: {
		setGame: (state, { payload }) => {
			state[payload.type] = payload.value;
		},
		setPosition: (state, action) => {
			state.position = action.payload;
		},
	},
});

export const { setGame, setPosition } = gameSlice.actions;

export default gameSlice.reducer;
