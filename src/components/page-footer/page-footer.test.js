import React from "react";
import {render, screen} from "@testing-library/react";
import PageFooter from "./page-footer";

it(`PageFooter should render correctly`, () => {
  render(<PageFooter render={() => false}/>);

  expect(screen.getByText(`© 2022 What to watch Ltd.`)).toBeInTheDocument();
});
