import {createSelector} from "@reduxjs/toolkit";
import {Genre} from "../../const";

export const filterFilmsByGenre = createSelector(
    [(state) => state.DATA.films, (state) => state.LIST.selectedGenre],
    (films, genre) => genre !== Genre.ALL_GENRE ? films.filter((film) => film.genre === genre) : films,
);

export const getFilmData = (state) => state.DATA;
