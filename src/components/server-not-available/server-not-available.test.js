import React from "react";
import {render} from "@testing-library/react";
import {Router} from "react-router-dom";
import {createMemoryHistory} from "history";
import ServerNotAvailable from "./server-not-available";

it(`ServerNotAvailable should render correctly`, () => {
  const history = createMemoryHistory();
  const {getByText} = render(
      <Router history={history}>
        <ServerNotAvailable/>
      </Router>
  );
  const headerElement = getByText(`Server not available`);
  const textElement = getByText(`Please try to load the page later`);
  const linkElement = getByText(`Go to the home page`);

  expect(headerElement).toBeInTheDocument();
  expect(textElement).toBeInTheDocument();
  expect(linkElement).toBeInTheDocument();
});
