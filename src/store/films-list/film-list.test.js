import {filmsList} from "./films-list";
import {ActionType, changeGenre} from "../action";

describe(`Reducer 'film-list' should work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(filmsList(undefined, {})).toEqual({selectedGenre: `all genres`});
  });

  it(`Reducer should change current genre by a given value`, () => {
    expect(filmsList({selectedGenre: `all genres`}, changeGenre(`Drama`))).toEqual({selectedGenre: `Drama`});

    expect(filmsList({selectedGenre: `Adventure`}, changeGenre(`Crime`))).toEqual({selectedGenre: `Crime`});

    expect(filmsList({selectedGenre: `Crime`}, changeGenre(`all genres`))).toEqual({selectedGenre: `all genres`});

    expect(filmsList({selectedGenre: `all genres`}, changeGenre(`all genres`))).toEqual({selectedGenre: `all genres`});
  });

  it(`Reducer should change current genre by a default value`, () => {
    const state = {selectedGenre: `all genres`};

    const resetFilmListAction = {
      type: ActionType.RESET_FILMS_LIST
    };

    expect(filmsList({selectedGenre: `Adventure`}, resetFilmListAction)).toEqual(state);

    expect(filmsList({selectedGenre: `all genres`}, resetFilmListAction)).toEqual(state);
  });
});
