import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main";

const App = (props) => {
  const {titleMovie} = props;

  return (
    <Main titleMovie={titleMovie} />
  );
};

App.propTypes = {
  titleMovie: PropTypes.object.isRequired,
};

export default App;
