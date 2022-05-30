import {renderHook, act} from "@testing-library/react-hooks";
import {useShownsCards} from "./use-showns-cards";
import {FILM_CARD_PER_STEP} from "../const";

describe(`useShownsCards tests`, () => {
  it(`useShownsCards should return array with  3 elements`, () => {
    const {result} = renderHook(() => useShownsCards(FILM_CARD_PER_STEP));
    const {current} = result;
    const [shownsCardsCount, handleResetShownsCardsCount, handleSetShownsCardsCount] = current;

    expect(current).toHaveLength(3);
    expect(typeof shownsCardsCount).toBe(`number`);
    expect(handleResetShownsCardsCount).toBeInstanceOf(Function);
    expect(handleSetShownsCardsCount).toBeInstanceOf(Function);
  });

  it(`useShownsCards should be correctly change state`, () => {
    const {result} = renderHook(() => useShownsCards(FILM_CARD_PER_STEP));
    const expectedInitialState = 8;
    const [initialShownsCardsCount] = result.current;
    let [,, handleSetShownsCardsCount] = result.current;

    act(() => handleSetShownsCardsCount());
    const [firstTimeCount] = result.current;

    [,, handleSetShownsCardsCount] = result.current;
    act(() => handleSetShownsCardsCount());
    const [secondTimeCount] = result.current;

    expect(initialShownsCardsCount).toStrictEqual(expectedInitialState);
    expect(firstTimeCount).toBe(16);
    expect(secondTimeCount).toBe(24);
  });

  it(`useShownsCards should be correctly reset state`, () => {
    const {result} = renderHook(() => useShownsCards(FILM_CARD_PER_STEP));
    const [initialShownsCardsCount] = result.current;
    let [, handleResetShownsCardsCount, handleSetShownsCardsCount] = result.current;

    act(() => handleSetShownsCardsCount());
    const [firstTimeCount] = result.current;

    [, handleResetShownsCardsCount, handleSetShownsCardsCount] = result.current;
    act(() => handleResetShownsCardsCount());
    const [secondTimeCount] = result.current;

    expect(initialShownsCardsCount).toBe(8);
    expect(firstTimeCount).toBe(16);
    expect(secondTimeCount).toBe(8);
  });
});
