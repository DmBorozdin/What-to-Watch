import {useState} from "react";

export const useShownsCards = (FILM_CARD_PER_STEP) => {
  const [shownsCardsCount, setShownsCardsCount] = useState(FILM_CARD_PER_STEP);

  const handleResetShownsCardsCount = () => {
    if (shownsCardsCount !== FILM_CARD_PER_STEP) {
      setShownsCardsCount(FILM_CARD_PER_STEP);
    }
  };

  const handleSetShownsCardsCount = () => setShownsCardsCount(shownsCardsCount + FILM_CARD_PER_STEP);

  return [shownsCardsCount, handleResetShownsCardsCount, handleSetShownsCardsCount];
};
