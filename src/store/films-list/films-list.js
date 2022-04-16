import {createReducer} from "@reduxjs/toolkit";
import {changeGenre, resetFilmsList} from "../action";
import {Genre} from "../../const";

const initialState = {
  selectedGenre: Genre.ALL_GENRE,
};

const filmsList = createReducer(initialState, (builder) => {
  builder.addCase(changeGenre, (state, action) => {
    state.selectedGenre = action.payload;
  });
  builder.addCase(resetFilmsList, (state) => {
    state.selectedGenre = Genre.ALL_GENRE;
  });
});

export {filmsList};
