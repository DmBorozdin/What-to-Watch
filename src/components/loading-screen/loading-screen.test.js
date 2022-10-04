import React from "react";
import {render, screen} from "@testing-library/react";
import LoadingScreen from "./loading-screen";

it(`LoadingScreen should render correctly`, () => {
  render(<LoadingScreen/>);

  expect(screen.getByTestId(`preloader`)).toBeInTheDocument();
});
