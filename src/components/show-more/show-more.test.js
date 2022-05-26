import React from "react";
import {render} from "@testing-library/react";
import ShowMore from "./show-more";

it(`ShowMore should render correctly`, () => {
  const {getByText} = render(
      <ShowMore onShowMore={jest.fn()}/>
  );
  const buttonElement = getByText(`Show more`);

  expect(buttonElement).toBeInTheDocument();
});
