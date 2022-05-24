import React from "react";
import {render} from "@testing-library/react";
import GenreList from "./genre-list";

const genre = [`drama`, `fantasy`, `crime`];

it(`GenreList should render correctly`, () => {
  const {getByText} = render(
      <GenreList genreList={genre} activeGenre={`drama`} onGenreClick={jest.fn()}/>
  );
  const genreDramaElement = getByText(`Drama`);
  const genreFantasyElement = getByText(`Fantasy`);
  const genreCrimeElement = getByText(`Crime`);

  expect(genreDramaElement).toBeInTheDocument();
  expect(genreFantasyElement).toBeInTheDocument();
  expect(genreCrimeElement).toBeInTheDocument();
});
