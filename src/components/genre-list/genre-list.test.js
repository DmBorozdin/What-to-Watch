import React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GenreList from "./genre-list";

const genre = [`drama`, `fantasy`, `crime`];

describe(`GenreList test`, () => {
  it(`GenreList should render correctly. Genre "drama" is active`, () => {
    render(
        <GenreList genreList={genre} activeGenre={`drama`} onGenreClick={jest.fn()}/>
    );

    expect(screen.getByText(`Drama`)).toBeInTheDocument();
    expect(screen.getByText(`Drama`).parentElement).toHaveClass(`catalog__genres-item--active`);
    expect(screen.getByText(`Fantasy`)).toBeInTheDocument();
    expect(screen.getByText(`Fantasy`).parentElement).not.toHaveClass(`catalog__genres-item--active`);
    expect(screen.getByText(`Crime`)).toBeInTheDocument();
    expect(screen.getByText(`Crime`).parentElement).not.toHaveClass(`catalog__genres-item--active`);
  });

  it(`GenreList should render correctly. Genre "fantasy" is active`, () => {
    render(
        <GenreList genreList={genre} activeGenre={`fantasy`} onGenreClick={jest.fn()}/>
    );

    expect(screen.getByText(`Drama`)).toBeInTheDocument();
    expect(screen.getByText(`Drama`).parentElement).not.toHaveClass(`catalog__genres-item--active`);
    expect(screen.getByText(`Fantasy`)).toBeInTheDocument();
    expect(screen.getByText(`Fantasy`).parentElement).toHaveClass(`catalog__genres-item--active`);
    expect(screen.getByText(`Crime`)).toBeInTheDocument();
    expect(screen.getByText(`Crime`).parentElement).not.toHaveClass(`catalog__genres-item--active`);
  });

  it(`When click on another genre, onGenreClick funtion should be called`, () => {
    const handleGenreClick = jest.fn();
    render(
        <GenreList genreList={genre} activeGenre={`drama`} onGenreClick={handleGenreClick}/>
    );

    userEvent.click(screen.getByText(`Fantasy`));
    expect(handleGenreClick).toHaveBeenCalledWith(`fantasy`);
  });
});
