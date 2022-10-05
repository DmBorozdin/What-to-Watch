import React from "react";
import {render, screen} from "@testing-library/react";
import MovieReview from "./movie-review";

it(`MovieReview should render correctly`, () => {
  const mockReview = [
    {
      comment: `This movie really touched my heart, it really is the best movie of the year and everyone should see this masterpiece.`,
      date: `2022-06-01T15:42:38.381Z`,
      id: 1,
      rating: 5.1,
      user: {
        id: 13,
        name: `Zak`
      }
    },
    {
      comment: `A movie that will take you to another world full of emotions.`,
      date: `2022-05-13T15:42:38.381Z`,
      id: 2,
      rating: 4.2,
      user: {
        id: 14,
        name: `Isac`
      }
    }
  ];

  render(<MovieReview reviews={mockReview} isReviewLoaded={true}/>);

  expect(screen.getByText(`This movie really touched my heart, it really is the best movie of the year and everyone should see this masterpiece.`)).toBeInTheDocument();
  expect(screen.getByText(`5.1`)).toBeInTheDocument();
  expect(screen.getByText(`Zak`)).toBeInTheDocument();
  expect(screen.getByText(`June 1, 2022`)).toBeInTheDocument();
  expect(screen.getByText(`A movie that will take you to another world full of emotions.`)).toBeInTheDocument();
  expect(screen.getByText(`4.2`)).toBeInTheDocument();
  expect(screen.getByText(`Isac`)).toBeInTheDocument();
  expect(screen.getByText(`May 13, 2022`)).toBeInTheDocument();
});
