import {createSelector} from "@reduxjs/toolkit";
import {Genre, MAX_GENRE_LIST_COUNT} from "../../const";

export const chooseGenre = createSelector(
    (state) => state.DATA.films,
    (films) => Array.from(new Set([Genre.ALL_GENRE, ...films.map((film) => film.genre)])).slice(0, MAX_GENRE_LIST_COUNT),
);
